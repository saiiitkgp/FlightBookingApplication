import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-flight-login',
  templateUrl: './flight-login.component.html',
  styleUrls: ['./flight-login.component.css']
})
export class FlightLoginComponent implements OnInit {

  userName = ''
  passWord=''
  isAuthenticated = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  loginFormSubmit()
  {
    console.log(this.userName, this.passWord);
    if(this.userName =='Manoj' && this.passWord == 'Manu')
    {
      this.router.navigate(['/home']);
    }
    else
    {
      this.isAuthenticated = false;
    }
  }
}
