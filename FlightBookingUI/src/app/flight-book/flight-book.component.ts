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
  classTypesList = []
  fetchedData = false;
  classType = ''
  flightTotalFare;
  FlightEconomyFare;
  FlightBusinessFare;
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

        this.FlightEconomyFare = this.selectedFlight[0].EconomyClassDetails[0]["FlightCost"];
        
        if(this.selectedFlight[0].BusinessClassDetails.length> 0)
          {
        this.FlightBusinessFare = this.selectedFlight[0].BusinessClassDetails[0]["FlightCost"]
          }

          // if(this.selectedFlight[0].EconomyClassDetails.length> 0 && 
          //   this.selectedFlight[0].BusinessClassDetails.length > 0 
          //   && this.selectedFlight[0].BusinessClassDetails[0]["ClassType"] == "Economy"
          //   &&  this.selectedFlight[0].EconomyClassDetails[0]["ClassType"] == "Business")
          // {
          //   console.log("Teester");
          //   this.classTypesList.push("Economy");
          //   this.classTypesList.push("Business");
          // }

        if( this.selectedFlight[0].EconomyClassDetails.length > 0 && this.selectedFlight[0].EconomyClassDetails[0]["ClassType"] == "Economy")
        {
          this.classTypesList.push("Economy");
        this.bookedFlightForm.get("classType").setValue("Economy");
        }
         if( this.selectedFlight[0].BusinessClassDetails.length > 0 && this.selectedFlight[0].BusinessClassDetails[0]["ClassType"] == "Business")
        {
          this.classTypesList.push("Business");
          this.bookedFlightForm.get("classType").setValue("Business"); 
        }
        if(this.classTypesList.length ==2)
        {
          this.bookedFlightForm.get("classType").setValue("Economy");
        }
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
          this.flightTotalFare = ''
          this.classTypesList = []
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
    console.log($event.key);
    let max = 3;
    
    let lengthValue = $event.target.value.slice(0,3);
    this.bookedFlightForm.get("noOfSeats").setValue(lengthValue);

    if(($event.keyCode >= 48 && $event.keyCode <=57))
    {
      if(this.bookedFlightForm.value.classType == "Economy")
      {
        this.flightTotalFare = lengthValue * this.FlightEconomyFare;
      }
      if (this.bookedFlightForm.value.classType == "Business")
      {
        this.flightTotalFare = lengthValue * this.FlightBusinessFare;
      }
    
    }

  }
  
}
