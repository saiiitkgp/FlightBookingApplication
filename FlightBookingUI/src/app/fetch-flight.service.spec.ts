import { TestBed } from '@angular/core/testing';

import { FetchFlightService } from './fetch-flight.service';

describe('FetchFlightService', () => {
  let service: FetchFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
