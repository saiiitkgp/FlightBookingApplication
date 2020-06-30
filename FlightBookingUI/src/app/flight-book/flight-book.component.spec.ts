import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookComponent } from './flight-book.component';

describe('FlightBookComponent', () => {
  let component: FlightBookComponent;
  let fixture: ComponentFixture<FlightBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
