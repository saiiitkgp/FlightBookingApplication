import { Component, OnInit } from '@angular/core';
import { FetchFlightService } from '../fetch-flight.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  constructor(private s:FetchFlightService) { }

fetchFlights = []
flightSelected = false;

  ngOnInit(): void {

    this.s.flightdetails.subscribe(data=>{
      this.fetchFlights=data
      console.log(data)
    })

  }

  flightDetails(i)
  {
    
    console.log(this.fetchFlights[i]);
   this.s.getSelectedFlightDetails([this.fetchFlights[i]]);
  }
  

}
