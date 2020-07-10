import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlightLoginService} from './flight-login.service';
import {FlightRegisterService} from './flight-register.service';
import {HttpClientModule} from '@angular/common/http';
import {FlightBookService} from './flight-book.service';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightBookSelectComponent } from './flight-book-select/flight-book-select.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { LayoutComponent } from './layout/layout.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FlightDetailsComponent,
    FlightBookSelectComponent,
    MyBookingsComponent,
    LayoutComponent
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
