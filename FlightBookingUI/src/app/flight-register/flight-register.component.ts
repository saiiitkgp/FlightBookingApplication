import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-register',
  templateUrl: './flight-register.component.html',
  styleUrls: ['./flight-register.component.css']
})
export class FlightRegisterComponent implements OnInit {

  flightBookRegisterForm:FormGroup
  submitMessage=-1

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.flightBookRegisterForm=this.fb.group({
      userName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      mobileNo:['',Validators.required]
    })
  }

  registerUser(){
    this.submitMessage=this.flightBookRegisterForm.valid?0:1
  }

}
