import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private httpClient : HttpClient) { }

  changePasswordData(userName:string,newPassword:string):any
  {
    let changePassword = 
    {
      UserName:userName,
      Password:newPassword
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.httpClient.post("https://localhost:44344/api/flight/ChangePassword",changePassword,options);
  }
}
