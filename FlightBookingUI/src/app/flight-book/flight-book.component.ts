import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router } from '@angular/router';

@Component({
  selector: 'app-flight-book',
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.css']
})
export class FlightBookComponent implements OnInit {

  flightBookForm:FormGroup
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.flightBookForm=this.fb.group({
      source:['',Validators.required],
      destination:['',Validators.required],
      cost:['',Validators.required],
      ticketDetails:['',Validators.required]
    })
  }

  bookFlight(myForm: NgForm)
  {
    this.router.navigate["/home"];
  }
}
