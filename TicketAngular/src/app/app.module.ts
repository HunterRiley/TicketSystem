import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketFormComponent } from './ticket-details/ticket-form/ticket-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from "./ticket-details/login/login.component";
import { RegistrationComponent } from './ticket-details/registration/registration.component';

const routes: Routes = [
  { path: 'ticket-details', component: TicketDetailsComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'}, 
  
];

@NgModule({
  declarations: [
    AppComponent,
    TicketDetailsComponent,
    TicketFormComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true}),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
