import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightBookService {

  constructor(private http:HttpClient) { }

  getCitiesList(searchChars):any{

    return this.http.get("https://localhost:44344/api/flight/ValidateCityName?flightName="+searchChars);
  }

  private formVisible = new BehaviorSubject<boolean>(false);
  formShowVisible = this.formVisible.asObservable();

  GetFormVisible(details)
  {
    this.formVisible.next(details);
  }


  
}
