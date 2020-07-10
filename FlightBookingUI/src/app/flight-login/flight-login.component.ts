import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FlightLoginService } from '../flight-login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-flight-login',
  templateUrl: './flight-login.component.html',
  styleUrls: ['./flight-login.component.css']
})
export class FlightLoginComponent implements OnInit {

  userName = ''
  passWord=''
  isAuthenticated = false;
  InvalidCredentials = '';
  responseMessage = '';
  public userData = [];
  
  constructor(private router:Router,private loginService : FlightLoginService) { }

  ngOnInit() {
    
}

  loginFormSubmit(form: NgForm)
  {
    this.loginService.getUserLoginData(this.userName,this.passWord).
    subscribe((data) => {this.userData = data
      if(data.IsValidUser)
      { 
        this.isAuthenticated = true;
        this.loginService.getUserName(this.userName);
        this.loginService.validUser(data.IsValidUser);
        this.router.navigate(['/bookflight']);
      }
      else
      { 
        this.isAuthenticated = false;
        this.InvalidCredentials = 'Given credentials are not valid . Please re-enter your credentials';
        this.loginService.getUserName('');

      }
  });
    }
  }
