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
  responseMessage = '';
  public userData = [];
  
  constructor(private router:Router,private loginService : FlightLoginService) { }

  ngOnInit() {
    
}

  loginFormSubmit(form: NgForm)
  {
    console.log(this.userName, this.passWord);
      this.loginService.getUserLoginData(this.userName,this.passWord).
    subscribe((data) => {this.userData = data
      if(data.IsValidUser)
      { 
        this.isAuthenticated = data.IsValidUser;
        console.log(this.isAuthenticated);
        this.responseMessage = data.ResponseMessage;
        console.log(this.responseMessage);
        this.router.navigate(['/home']);
      }
      else
      {
        this.isAuthenticated = data.IsValidUser;
        console.log(this.isAuthenticated);
        this.responseMessage = data.ResponseMessage;
        console.log(this.responseMessage);
        this.router.navigate(['/login']);
        form.reset();
      }
  });
    // console.log(this.isAuthenticated, this.responseMessage);
    }
  }
