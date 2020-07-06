import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlightLoginService} from './flight-login.service';
import {FlightRegisterService} from './flight-register.service';
import {HttpClientModule} from '@angular/common/http';
import {FlightBookService} from './flight-book.service';
import { FlightDetailsComponent } from './flight-details/flight-details.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FlightDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FlightLoginService,FlightRegisterService,FlightBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
