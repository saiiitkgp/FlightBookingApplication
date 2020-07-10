import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightBookSelectService {

  constructor() { }

  private myBookings = new BehaviorSubject([]);
  myBookingsDisplay = this.myBookings.asObservable();

  fetchedBookings(details)
  {
    this.myBookings.next(details);
  }

}
