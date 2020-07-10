import { Component, OnInit } from '@angular/core';
import { FlightLoginService } from '../flight-login.service';
import {FlightBookSelectService} from '../flight-book-select.service';
import {MyBookingsService} from '../my-bookings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  userName;
  mybookings =[]
  selectedItemBookFlight = false;
  selectedItemMyBook = false;
  seletcedItemLogout = false;

  constructor(private loginService : FlightLoginService,
    private flightbookSelectService: FlightBookSelectService,
    private mybookingService: MyBookingsService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginService.userNameSaved.subscribe(data =>{
      this.userName = data})
  }

  bookflight()
  {
    this.selectedItemBookFlight = true;
    this.selectedItemMyBook = false;
    this.seletcedItemLogout = false;
    this.router.navigate(['/bookflight']);
  }
  Mybookings()
  {
    this.selectedItemMyBook = true;
    this.selectedItemBookFlight = false;
    this.seletcedItemLogout = false;
      this.router.navigate(['/mybookings']);
  }
  logout()
  {
    this.seletcedItemLogout = true;
    this.selectedItemMyBook = false;
    this.selectedItemBookFlight = false;
    this.router.navigate(['/login'])
  }

}
