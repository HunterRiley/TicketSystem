import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/shared/ticket-service.model';
import { TicketServiceService } from 'src/app/shared/ticket-service.service';
import { TicketDetailsComponent } from '../ticket-details.component';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styles: [
  ]
})
export class TicketFormComponent implements OnInit {

  constructor(public service:TicketServiceService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm) {
    if(this.service.formData.ticketDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm) {
    this.service.postTicketDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted Successfully', 'Ticket Submission')
      },
      err =>{console.log(err);}
    );
  }

  updateRecord(form:NgForm) {
    this.service.putTicketDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated Successfully', 'Ticket Submission')
      },
      err =>{console.log(err);}
    );

  }

  resetForm(form:NgForm) {
    form.form.reset();
    this.service.formData = new TicketService;
  }

}
