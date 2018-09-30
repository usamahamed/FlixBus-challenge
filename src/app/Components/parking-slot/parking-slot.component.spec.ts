import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSlotComponent } from './parking-slot.component';
import { FormsModule } from '@angular/forms';

describe('ParkingSlotComponent', () => {
  let component: ParkingSlotComponent;
  let fixture: ComponentFixture<ParkingSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSlotComponent ]
      ,
      imports: [
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
