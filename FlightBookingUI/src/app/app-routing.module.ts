import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightHomeComponent } from './flight-home/flight-home.component';
import { FlightLoginComponent } from './flight-login/flight-login.component';


const routes: Routes = [
  {path:'home',component:FlightHomeComponent},
  {path:'login', component:FlightLoginComponent},
  {path: '',component:FlightHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FlightHomeComponent, FlightLoginComponent]
