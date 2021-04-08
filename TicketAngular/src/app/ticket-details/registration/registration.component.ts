import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.model';
import { UserServiceService } from 'src/app/shared/user.service';
import { TicketDetailsComponent } from '../ticket-details.component';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserServiceService,
    private toastr:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  redirect() {
    this.router.navigate(['ticket-details']);
  }

  onSubmit(form:NgForm) {
    if(this.service.formData.userId == 0)
      this.insertRecord(form);
      
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm) {
    this.service.postUserDetail().subscribe(
      res => {
        this.service.refreshList();
        this.toastr.success('Submitted Successfully', 'User Submission')
        
        this.redirect();
        
      },
      err =>{console.log(err);}
    );
  }

  updateRecord(form:NgForm) {
    this.service.putUserDetail().subscribe(
      res => {
        this.service.refreshList();
        this.toastr.info('Updated Successfully', 'User Submission')
        
        this.redirect();
      },
      err =>{console.log(err);}
    );

  }

  resetForm(form:NgForm) {
    form.form.reset();
    this.service.formData = new UserService;
  }

}
