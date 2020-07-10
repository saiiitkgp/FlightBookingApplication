import { TestBed } from '@angular/core/testing';

import { FlightBookSelectService } from './flight-book-select.service';

describe('FlightBookSelectService', () => {
  let service: FlightBookSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightBookSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
