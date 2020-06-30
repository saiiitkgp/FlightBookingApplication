import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {FlightRegisterService} from '../flight-register.service';

@Component({
  selector: 'app-flight-register',
  templateUrl: './flight-register.component.html',
  styleUrls: ['./flight-register.component.css']
})
export class FlightRegisterComponent implements OnInit {

  flightBookRegisterForm:FormGroup
  submitMessage=-1
  public registerData = []
  isAuthenticated = false;
  responseMessage = '';

  constructor(private fb:FormBuilder,private router:Router,private registerService:FlightRegisterService) { }

  ngOnInit(): void {
    this.flightBookRegisterForm=this.fb.group({
      userName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      mobileNo:['',Validators.required]
    })
  }

  registerUser(form: NgForm){
      this.registerService.RegisterData(this.flightBookRegisterForm.value.userName,
        this.flightBookRegisterForm.value.email,this.flightBookRegisterForm.value.password,
        this.flightBookRegisterForm.value.mobileNo).
    subscribe((data) => {this.registerData = data
      if(data.IsUserRegistered)
      { 
        this.isAuthenticated = data.IsUserRegistered;
        console.log(this.isAuthenticated);
        this.responseMessage = data.ResponseMessage;
        console.log(this.responseMessage);
        this.router.navigate(['/home']);
      }
      else
      {
        this.isAuthenticated = data.IsUserRegistered;
        console.log(this.isAuthenticated);
        this.responseMessage = data.ResponseMessage;
        console.log(this.responseMessage);
        this.router.navigate(['/login']);
        form.reset();
      }
  });
  }

}
