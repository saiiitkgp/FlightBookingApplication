import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightHomeComponent } from './flight-home/flight-home.component';
import { FlightLoginComponent } from './flight-login/flight-login.component';
import { FlightRegisterComponent } from './flight-register/flight-register.component';
import { FlightBookComponent } from './flight-book/flight-book.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MyBookingsComponent} from './my-bookings/my-bookings.component';
import { FlightLoginService } from './flight-login.service';


const routes: Routes = [
  {path: 'mybookings',canActivate: [FlightLoginService],component:MyBookingsComponent},
  {path:'forgotpassword',component: ForgotPasswordComponent},
  {path:'bookflight',canActivate: [FlightLoginService], component: FlightBookComponent},
  {path:'home',component:FlightHomeComponent},
  {path:'login', component:FlightLoginComponent},
  {path:'register',canActivate: [FlightLoginService], component:FlightRegisterComponent},
  {path: '',component:FlightHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FlightHomeComponent, FlightLoginComponent, FlightRegisterComponent,
   FlightBookComponent,ForgotPasswordComponent,MyBookingsComponent]
