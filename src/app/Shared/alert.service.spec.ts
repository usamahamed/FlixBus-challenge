import { BusComponent } from './../Components/bus/bus.component';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { AlertService } from './alert.service';
import { By } from '@angular/platform-browser';

describe('AlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AlertService],
    imports:[ MatSnackBar ]

  }));

  // it('should be created', () => {
  //   const service: AlertService = TestBed.get(AlertService);
  //   expect(service).toBeTruthy();
  // });
});



// let alertservice: AlertService;
// let fixture;
// let  store;
// let  component: BusComponent;
// beforeEach(() => {
//     fixture = TestBed.createComponent(BusComponent);
//     component = fixture.componentInstance;
//     store = TestBed.get(alertservice);
//     fixture.detectChanges();
// });


// it('should call the right funtion', () => {       
//     spyOn(alertservice, 'showToaster');// or spyOn(component, 'yourMethod');       
//     const fakeEvent = { preventDefault: () => console.log('preventDefault') };
//     fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
//     expect(alertservice.showToaster).toHaveBeenCalledWith('any message');
// });
