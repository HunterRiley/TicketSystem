import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../shared/ticket-service.model';
import { TicketServiceService } from '../shared/ticket-service.service';
import { UserServiceService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styles: [
  ]
})
export class TicketDetailsComponent implements OnInit {

  constructor(public service: TicketServiceService,
    public userService: UserServiceService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
    console.log(this.userService);
  }

  populateForm(selectedRecord:TicketService) {
    if(this.userService.formData.type === 'Admin')
      this.service.formData = Object.assign({}, selectedRecord);
    
  }

  

  onDelete(id:number) {
    if(this.userService.formData.type === 'Admin' && confirm('Are you sure?')) {
      this.service.deleteTicketDetail(id)
      .subscribe(
        res=>{
          this.service.refreshList();
          this.toastr.error("Deleted Successfully", "Ticket Submission");
        },
        err =>{console.log(err)}
      )
    }
  }

  updateRecord(form:TicketServiceService) {
    this.service.putTicketDetail().subscribe(
      res => {
        this.service.refreshList();
        this.toastr.info('Updated Successfully', 'Ticket Submission')
      },
      err =>{console.log(err);}
    );

  }

  statusResolved(selectedRecord:TicketService) {
    //console.log(selectedRecord);
    this.service.formData = selectedRecord;
    if(selectedRecord.status === 'Active') {
      console.log(this.service);
      selectedRecord.status = "Resolved";
      this.updateRecord(this.service);
    }
  }

  statusActivated(selectedRecord:TicketService) {
    //console.log(selectedRecord);
    this.service.formData = selectedRecord;
    if(selectedRecord.status === 'Resolved') {
      console.log(this.service);
      selectedRecord.status = "Active";
      this.updateRecord(this.service);
    }
  }

}
