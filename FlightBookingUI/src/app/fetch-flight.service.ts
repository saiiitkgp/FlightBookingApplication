import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchFlightService {

  constructor(private http: HttpClient) { }

  private flightDetails=new BehaviorSubject([])
  flightdetails=this.flightDetails.asObservable()

  getFlightDetails(details){
    this.flightDetails.next(details)
  }

  private selectedFlights=new BehaviorSubject([])
  selectedFlightDetails=this.selectedFlights.asObservable()

  getSelectedFlightDetails(details){
    this.selectedFlights.next(details)
  }





  getFlights(source:string, destination:string, travelDate:Date):any
  {
    console.log("hi");
    let FetchFlightModel = 
    {
      Source: source,
      Destination: destination,
      TravelDate: travelDate.toString()
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
   return  this.http.post("https://localhost:44344/api/flight/FetchFlights",FetchFlightModel,options);
  }
}
