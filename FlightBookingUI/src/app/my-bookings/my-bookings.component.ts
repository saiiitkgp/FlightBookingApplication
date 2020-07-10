import { Component, OnInit } from '@angular/core';
import { FlightLoginService } from '../flight-login.service';
import {FlightBookSelectService} from '../flight-book-select.service';
import {MyBookingsService} from '../my-bookings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  userName;
  mybookings =[]
  updatedBookings = []
  FinalBookedData =[]
  flightCancelled = false;
  constructor(private loginService : FlightLoginService,
    private flightbookSelectService: FlightBookSelectService,
    private mybookingService: MyBookingsService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginService.userNameSaved.subscribe(data =>{
      this.userName = data})

    this.mybookingService.fetchMyBookings(this.userName).subscribe(data=>{
      this.mybookings = data 
      console.log(this.mybookings);
    })
  }

  CancelFlight(i,ticketNumber:string)
  {
    this.mybookings.splice(i,1);
    this.mybookingService.cancelFlight(ticketNumber).subscribe(data => {
      this.updatedBookings = data;
      if(data.IsFlightCancelled)
      {
        this.flightCancelled = data.IsFlightCancelled;
        this.router.navigate(['/mybookings']);
      }
      else
      {
        
      }
    })
  }

}
