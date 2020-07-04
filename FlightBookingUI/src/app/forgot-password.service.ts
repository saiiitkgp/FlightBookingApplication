import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private httpClient : HttpClient) { }

  getForgotPasswordData(userName:string,dateOfBirth:Date):any
  {
    let forgotPassword = 
    {
      UserName:userName,
      DateOfBirth:dateOfBirth.toString()
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.httpClient.post("https://localhost:44344/api/flight/GenerateTemporaryPassword",forgotPassword,options);
  }
}
