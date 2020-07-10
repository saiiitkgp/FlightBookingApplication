import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightBookSaveService {

  constructor(private httpClient : HttpClient) { }

  SaveFlightDetails(userName:string,source:string,destination:string,flightNumber:string,
    travelDate:Date, passengerName:string,classType:string ):any
  {
    let SaveFlightDetails = 
    {
      Username:userName,
	    PassengerName:passengerName,
	    ClassType:classType,
	    FlightNumber : flightNumber,
	    FlightSource:source,
	    FlightDestination:destination,
	    TravelDate:travelDate.toString()
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.httpClient.post("https://localhost:44344/api/flight/SaveBookFlightDetails",SaveFlightDetails,options);
  }

}
