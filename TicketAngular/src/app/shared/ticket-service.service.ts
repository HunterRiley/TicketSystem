import { Injectable } from '@angular/core';
import { TicketService } from './ticket-service.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(private http:HttpClient) { }

  formData:TicketService = new TicketService();
  list: TicketService[];

  readonly baseURL = 'http://localhost:20424/api/TicketDetail'

  postTicketDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putTicketDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.ticketDetailId}`, this.formData);
  }

  deleteTicketDetail(id:number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as TicketService[]);
  }

  
}
