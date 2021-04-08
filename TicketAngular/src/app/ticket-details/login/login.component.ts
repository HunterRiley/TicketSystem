import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.model';
import { UserServiceService } from 'src/app/shared/user.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
    ] })
export class LoginComponent implements OnInit {
    form: FormGroup;
    list: UserService[];

    constructor(
        private route: Router,
        public service: UserServiceService,
        private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.service.formData = new UserService();
    }


    onSubmit(form: NgForm) {
        this.service.getUserList().subscribe(
            res => {
              this.list = res as UserService[];
              console.log(this.list);
              const found = this.list.some(el => el.username === this.service.formData.username && el.password === this.service.formData.password);
      
              if (found) {
                var result = this.list.filter(obj => {
                  return obj.username === this.service.formData.username && obj.password === this.service.formData.password
                });
                this.service.formData = result[0]
                this.toastr.success('Login Successful!', 'Ticket System');
                this.route.navigate(['/ticket-details']);
              } else {
                this.toastr.error('Login Failure!', 'Ticket System');
                this.resetForm(form);
              }
            },
            err => { console.log(err); }
        );
    }

    resetForm(form: NgForm) {
        form.form.reset();
        this.service.formData = new UserService();
    }

    redirectToRegister() {
        this.route.navigate(['registration']);
      }
}