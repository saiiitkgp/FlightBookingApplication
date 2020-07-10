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
  bookSelectFormData=null
  IsLogoutButtonClicked = false;
  FlightFetchDetails = null
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
        this.formShow = true;
        
        this.fetchFlights=[]
        this.bookSelectFormData=this.selectedFlight[0]
        this.FlightFetchDetails = {flightSource : this.flightBookForm.value.source,
                                  flightDestination : this.flightBookForm.value.destination,
                                  flightTravelDate : this.flightBookForm.value.travelDate}
      }
    })

    this.fbss.formShowVisible.subscribe(data =>{
      this.formShow = data;
    })
    
  }

  bookFlight(myForm: NgForm)
  {
    this.fetchFlights=[]
    this.formShow=false
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

  

  logoutFunction()
  {
    if(confirm("Are you sure want to logout"))
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.router.navigate(['/bookflight']);
    }
  }
  
}
