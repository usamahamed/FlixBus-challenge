import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import { OnebusComponent } from './onebus.component';

describe('OnebusComponent', () => {
  let component: OnebusComponent;
  let fixture: ComponentFixture<OnebusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnebusComponent ]
      ,
      imports: [
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnebusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
