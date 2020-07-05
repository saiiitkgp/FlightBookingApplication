import { TestBed } from '@angular/core/testing';

import { FlightBookService } from './flight-book.service';

describe('FlightBookService', () => {
  let service: FlightBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
