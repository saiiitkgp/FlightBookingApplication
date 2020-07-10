import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookSelectComponent } from './flight-book-select.component';

describe('FlightBookSelectComponent', () => {
  let component: FlightBookSelectComponent;
  let fixture: ComponentFixture<FlightBookSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBookSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
