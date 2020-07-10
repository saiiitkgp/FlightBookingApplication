import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyBookingsService {

  constructor(private http : HttpClient) { }

  fetchMyBookings (userName: string) : any
  {
    return this.http.get("https://localhost:44344/api/flight/MyBookings?userName="+userName);
  }

  cancelFlight(ticketNumber:string) : any
  {
    return this.http.delete("https://localhost:44344/api/flight/CancelFlight?FlightTicketNumber="+ticketNumber);
  }

}
