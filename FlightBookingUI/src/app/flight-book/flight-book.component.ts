import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router } from '@angular/router';
import { FlightBookService } from '../flight-book.service';

@Component({
  selector: 'app-flight-book',
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.css']
})
export class FlightBookComponent implements OnInit {

  flightBookForm:FormGroup
  viewMode = 'tab1';
  fromCitiesList=[]
  toCitiesList=[]
  constructor(private fb:FormBuilder,private router:Router,private fbss:FlightBookService) { }

  ngOnInit(): void {
    this.flightBookForm=this.fb.group({
      source:['',Validators.required],
      destination:['',Validators.required],
      travelDate:['',Validators.required]
    })
  }

  bookFlight(myForm: NgForm)
  {
    this.router.navigate['/home'];
    console.log(this.flightBookForm.value);    
  }

  getFormCities(val){
    this.fbss.getCitiesList(val).subscribe(data=>{
      this.fromCitiesList=data
    })
  }

  getToCities(val){
    this.fbss.getCitiesList(val).subscribe(data=>{
      this.toCitiesList=data
    })
  }

}
