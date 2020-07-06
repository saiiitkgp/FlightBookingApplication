import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router } from '@angular/router';
import { FlightBookService } from '../flight-book.service';
import {FetchFlightService} from '../fetch-flight.service';

@Component({
  selector: 'app-flight-book',
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.css']
})
export class FlightBookComponent implements OnInit {

  flightBookForm:FormGroup
  bookedFlightForm: FormGroup
  viewMode = 'tab1';
  fromCitiesList=[]
  toCitiesList=[]
  fetchFlights = []
  selectedFlight = []
  fetchedData = false;
  classType = ''
  flightFare;
  formShow = false;
  constructor(private fb:FormBuilder,private router:Router,private fbss:FlightBookService,
    private fetchFlight : FetchFlightService) { }

  ngOnInit() : void {
    this.flightBookForm=this.fb.group({
      source:['',Validators.required],
      destination:['',Validators.required],
      travelDate:['',Validators.required]
    })

    this.bookedFlightForm=this.fb.group({
      flightNumber:['',Validators.required],
      classType:['',Validators.required],
      noOfSeats:['',Validators.required]
    })

    this.fetchFlight.selectedFlightDetails.subscribe(data=>{
      if(data.length>0){
        this.selectedFlight=data
        console.log(data);
        console.log("hi");
        this.formShow = true;
        this.bookedFlightForm.get("flightNumber").setValue(this.selectedFlight[0].FlightNumber);
        this.bookedFlightForm.get("classType").setValue(this.selectedFlight[0].EconomyClassDetails[0]["ClassType"] == "Economy" ?1:2); 
        this.fetchFlights=[]
      }
    })

    
  }

  bookFlight(myForm: NgForm)
  {
    this.fetchFlights=[]
    this.formShow=false
    console.log(this.flightBookForm.value);
      this.fetchFlight.getFlights(this.flightBookForm.value.source,
        this.flightBookForm.value.destination,this.flightBookForm.value.travelDate)
        .subscribe(data=> {
          this.fetchFlights = data
         if(data.length ==0)
         {
           this.fetchedData = true;
         }
         else
         {
           this.fetchedData = false;
         }
          this.fetchFlight.getFlightDetails(data)
        })
  }

  bookedFlight(myForm: NgForm)
  {
    console.log(this.bookedFlightForm.value);
  }

  getFormCities(val){
    if(this.fromCitiesList.indexOf(val)!=-1){
      return
    }
    this.fbss.getCitiesList(val).subscribe(data=>{
      this.fromCitiesList=data
      console.log(this.fromCitiesList);
    })
  }

  getToCities(val){
    if(this.toCitiesList.indexOf(val)!=-1){
      return
    }
    this.fbss.getCitiesList(val).subscribe(data=>{
      this.toCitiesList=data
    })
  }

  getTotalFare($event)
  {
    if($event.keyCode ==69 || $event.keyCode==101)
    {
      $event.preventDefault();
    }
    let max = 20;
    console.log($event.keyCode);
    console.log($event.target.value.length)
    if ($event.target.value.length == max) {
      console.log("manoj")
      $event.preventDefault();
  }
    if(($event.keyCode >= 48 && $event.keyCode <=57))
    {
    console.log(this.selectedFlight);
    this.flightFare = $event.target.value * 3000;
    }
    
     
    
  }
  
}
