import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ILogin} from './login';
import {Observable} from 'rxjs';
import { HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlightLoginService {
  
  constructor(private httpClient : HttpClient) { }

  getUserLoginData(userName:string,passWord:string):any
  {
    let login = 
    {
      userName:userName,
      passWord:passWord
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.httpClient.post("https://localhost:44344/api/flight/ValidateUser",login,options);
  }
}
