import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {FetchFlightService} from '../fetch-flight.service';
import { FlightLoginService } from '../flight-login.service';
import {FlightBookSaveService} from '../flight-book-save.service';
import {MyBookingsService} from '../my-bookings.service';
import {FlightBookSelectService} from '../flight-book-select.service';
import {FlightBookService} from '../flight-book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-flight-book-select',
  templateUrl: './flight-book-select.component.html',
  styleUrls: ['./flight-book-select.component.css']
})
export class FlightBookSelectComponent implements OnInit {

  bookedFlightForm: FormGroup
  FinalBookedData = []
  bookedData = []
  userName = ''
  classTypesList = []
  fetchedData = false;
  classType = ''
  flightTotalFare;
  FlightEconomyFare;
  FlightBusinessFare;
  formShow = false;
  noOfSeatsFinal;
  @Input() selectedFlight;
  @Input() FlightFetchDetails;
  constructor(private fb:FormBuilder,private fetchFlight : FetchFlightService,
    private loginService : FlightLoginService, private saveservice : FlightBookSaveService,
    private router : Router, private mybookings: MyBookingsService,
    private flightBookSelectService : FlightBookSelectService,
    private flightBook : FlightBookService) { }

  ngOnInit(): void {
    this.bookedFlightForm=this.fb.group({
      passengerName :['',Validators.required],
      flightNumber:['',Validators.required],
      classType:['',Validators.required],
      noOfSeats:['',Validators.required]
    })

    this.loginService.userNameSaved.subscribe(data =>{
      this.userName = data
    })

    this.bookedFlightForm.get("flightNumber").setValue(this.selectedFlight[0].FlightNumber);

        this.FlightEconomyFare = this.selectedFlight[0].EconomyClassDetails[0]["FlightCost"];
        
        if(this.selectedFlight[0].BusinessClassDetails.length> 0)
          {
        this.FlightBusinessFare = this.selectedFlight[0].BusinessClassDetails[0]["FlightCost"]
          }

        if( this.selectedFlight[0].EconomyClassDetails.length > 0 && this.selectedFlight[0].EconomyClassDetails[0]["ClassType"] == "Economy")
        {
          this.flightTotalFare = this.FlightEconomyFare;
          this.classTypesList.push("Economy");
          this.bookedFlightForm.get("classType").setValue("Economy");
        }
         if( this.selectedFlight[0].BusinessClassDetails.length > 0 && this.selectedFlight[0].BusinessClassDetails[0]["ClassType"] == "Business")
        {
          this.flightTotalFare = this.FlightBusinessFare;
          this.classTypesList.push("Business");
          this.bookedFlightForm.get("classType").setValue("Business"); 
        }
        if(this.classTypesList.length ==2)
        {
          this.flightTotalFare = this.FlightEconomyFare;
          this.bookedFlightForm.get("classType").setValue("Economy");
        }
        this.bookedFlightForm.get("noOfSeats").setValue(1);
}

bookedFlight(form :NgForm)
{
 this.saveservice.SaveFlightDetails(this.userName,
  this.FlightFetchDetails.flightSource,
  this.FlightFetchDetails.flightDestination,
  this.bookedFlightForm.value.flightNumber,
  this.FlightFetchDetails.flightTravelDate,
  this.bookedFlightForm.value.passengerName,
  this.bookedFlightForm.value.classType).subscribe(data=>  {
    this.bookedData = data
    if(data.IsFlightBooked)
    {
      this.flightBook.GetFormVisible(false);
      this.router.navigate(['/mybookings']);
    }
  })
}

getTotalFare($event)
  { 
    let lengthValue = $event.target.value.slice(0,3);
    console.log("Calculation",lengthValue);

    this.bookedFlightForm.get("noOfSeats").setValue(lengthValue);

    if(($event.keyCode >= 48 && $event.keyCode <=57) || $event.keyCode ==8)
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
  
  ChangeClassType()
  {
    if(document.getElementById('Classtype').innerHTML == "Economy")
    {
      this.flightTotalFare = this.FlightEconomyFare;
    }
    else
    {
      this.flightTotalFare = this.FlightBusinessFare;
    }
  }


}
