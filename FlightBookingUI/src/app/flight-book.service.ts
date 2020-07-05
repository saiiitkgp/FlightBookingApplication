import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightBookService {

  constructor(private http:HttpClient) { }

  getCitiesList(searchChars):any{
    return this.http.get("")
  }

}
