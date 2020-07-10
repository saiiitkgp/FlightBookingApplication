import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ILogin} from './login';
import {Observable} from 'rxjs';
import { HttpParams } from "@angular/common/http";
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightLoginService  implements CanActivate{
  
  IsAuthenticated = false;

  canActivate() {
    this.IsUserValid.subscribe(data => {
      if(data)
    {
    console.log("logged in" ,this.IsUserValid)
    this.IsAuthenticated =  true;
    }
    else
    {
      console.log("logged out")
      this.IsAuthenticated=  false;
      this.router.navigate(['/']);
    }
    })
    return this.IsAuthenticated;
    
  }
  private IsValidUser = new BehaviorSubject<boolean>(false);
  IsUserValid = this.IsValidUser.asObservable();

  validUser(details)
  {
    this.IsValidUser.next(details);
  }

  private userNameGlobal = new BehaviorSubject('');
  userNameSaved =this.userNameGlobal.asObservable();

  getUserName(details)
  {
    this.userNameGlobal.next(details);
    console.log(details,"printing");
  }

  constructor(private httpClient : HttpClient,private router : Router) { }

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
