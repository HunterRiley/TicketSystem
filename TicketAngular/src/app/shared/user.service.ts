import { Injectable } from '@angular/core';
import { UserService } from './user.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  formData:UserService = new UserService();
  list: UserService[];

  readonly baseURL = 'http://localhost:20424/api/AuthenticationDetail'

  postUserDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putUserDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.userId}`, this.formData);
  }

  deleteUserDetail(id:number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as UserService[]);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }

  
}