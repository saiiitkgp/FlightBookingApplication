import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ILogin} from './login';
import {Observable} from 'rxjs';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlightRegisterService {

  constructor(private httpClient : HttpClient) { }

  RegisterData(userName:string,email:string,passWord:string,phoneNumber:string,
    dateOfBirth:Date):any
  {
    let register = 
    {
      Username:userName,
      Password:passWord,
      Email: email,
      PhoneNumber : phoneNumber,
      DateOfBirth :dateOfBirth
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.httpClient.post("https://localhost:44344/api/flight/RegisterUser",register,options);
  }

}
