import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlightLoginService} from './flight-login.service';
import {HttpClientModule} from '@angular/common/http'
import { FlightHomeComponent } from './flight-home/flight-home.component';
import { FlightLoginComponent } from './flight-login/flight-login.component';
import { FlightRegisterComponent } from './flight-register/flight-register.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FlightRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
    HttpClientModule
=======
    ReactiveFormsModule
>>>>>>> 4ad7bd0594916fb9fbe4095bedb1f9bcd7f33553
  ],
  providers: [FlightLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
