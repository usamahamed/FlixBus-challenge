import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { AlertService } from './alert.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import {  HttpRequest } from '@angular/common/http';
import { SlotService } from './slot.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';





describe('Slots Requests', () => {
  let service: SlotService;
  let backend: HttpTestingController;

  beforeEach(() =>{ TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule,HttpClientModule,MatSnackBarModule,RouterModule,HttpClientTestingModule],
    providers: [ HttpClient,SlotService,AlertService,MatSnackBar]
  });
  service = TestBed.get(SlotService);
    backend = TestBed.get(HttpTestingController);

// Creating mock localstorage
let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  // Spying on localstorage
  spyOn(localStorage, 'getItem')
  .and.callFake(mockLocalStorage.getItem);
spyOn(localStorage, 'setItem')
  .and.callFake(mockLocalStorage.setItem);
spyOn(localStorage, 'removeItem')
  .and.callFake(mockLocalStorage.removeItem);
spyOn(localStorage, 'clear')
  .and.callFake(mockLocalStorage.clear);


}
  );
  it('SLots should be created', () => {
    let service: SlotService = TestBed.get(SlotService);
   expect(service).toBeTruthy();
 });
    it('should expectOne url', () => {
      service.getAllSlot().subscribe();
      backend.expectOne(`http://localhost:3000/slots`);
      backend.verify();

    });

    it('should expect One slots url and method', () => {
      service.getAllSlot().subscribe();
      backend.expectOne({url: `http://localhost:3000/slots`});
      service.getAllSlot().subscribe();
      backend.expectOne({url: `http://localhost:3000/slots`, method: 'GET'});
      backend.verify();
    });

    it('should not expect slots one when not subscribed', () => {
      service.getAllSlot()// .subscribe();
      backend.expectNone(`http://localhost:3000/slots`);
      backend.verify();
    });

    it('should not expect two slots request', () => {
      service.getAllSlot().subscribe();
      backend.expectOne(`http://localhost:3000/slots`);
      backend.expectNone(`http://localhost:3000/slots`);
      backend.verify();
    });

    it('should expectOne slots request differant style', () => {
      service.getAllSlot().subscribe();
      backend.expectOne((request: HttpRequest<any>) => {
        return request.url.match(/slots/) &&
              request.method === 'GET';
      });
      backend.verify();
    });

    it('should expect One slot request different style (using TestRequest)', () => {
      service.getAllSlot().subscribe();
      const call: TestRequest = backend.expectOne(`http://localhost:3000/slots`);
      expect(call.request.method).toEqual('GET');
      backend.verify();
    });

    it('should match slots url', () => {
      service.getAllSlot().subscribe();
      backend.match((request) => {
        return request.url.match(/slots/) &&
               request.method === 'GET';
      });
      backend.verify();
    });

    it('should match two slots requests', () => {
      service.getAllSlot().subscribe();
      service.getOneSlot(1).subscribe();
      backend.match((request) => {
        return request.url.match(/slots/) &&
              request.method === 'GET';
      });
      backend.verify();
    });

    it('should match two requests with length check', () => {
      service.getAllSlot().subscribe();
      service.getOneSlot(1).subscribe();
      const calls = backend.match((request) => {
        return request.url.match(/slots/) &&
               request.method === 'GET';
      });
      expect(calls.length).toEqual(2);
      expect(calls[0].request.url).toEqual(`http://localhost:3000/slots`);
      backend.verify();
    });

    // Responses

    it('should get slots result', () => {
      const response = [{
        "slot": "slot1",
        "id": 1538290662657,
        "disabled": false
      }];
      service.getAllSlot().subscribe((result) => {
         expect(result['length']).toEqual(1);
        expect(result[0].slot).toEqual('slot1');
        expect(result[0].disabled).toEqual(false);
      });
      backend.expectOne(`http://localhost:3000/slots`).flush(response);
      backend.verify();
    });

    it('should get slots result different style', () => {
      const response = {
        "slot": "slot1",
        "id": 1,
        "disabled": false
      };
      service.getOneSlot(1).subscribe((result) => {
        expect(result['id']).toEqual(1);
      });
      const call = backend.expectOne(`http://localhost:3000/slots/1`);
      expect(call.request.method).toEqual('GET');
      call.flush(response);
      backend.verify();
    });

    it('should create result', () => {
      service.PostNewSlot({
        "slot": "slot1",
        "disabled": false
      },121112).subscribe((response) => {
        expect(response).toEqual(jasmine.objectContaining({
          id: 121112,
          slot: "slot1",
          disabled: false
        }));
      });
      const response = {
        "slot": "slot1",
        "id": 121112,
        "disabled": false
      };
      const call = backend.expectOne(`http://localhost:3000/slots`);
      expect(call.request.method).toEqual('POST');
      call.flush(response);
      backend.verify();
    });

    it('should handle server error', () => {
      service.PostNewSlot({
        slot: 'Trying something dangerous'
      }).subscribe((response) => {
        throw('Should not land here');
      }, (error) => {
        expect(error.status).toEqual(422);
        expect(error.statusText).toEqual('Boom');
      });

      backend.expectOne(`http://localhost:3000/slots`).flush({}, {status: 422, statusText: 'Boom'});
      backend.verify();
    });

    it('should handle network error', () => {
      service.PostNewSlot({
        slot: 'Trying something dangerous'
      }).subscribe((response) => {
        throw('Should not land here');
      }, (error) => {
        expect(error.status).toEqual(422);
        expect(error.statusText).toEqual('Some server error');
      });

      backend.expectOne(`http://localhost:3000/slots`).error(
        new ErrorEvent(''), {
        status: 422,
        statusText: 'Some server error'
      });
      backend.verify();
    });

  

    describe('simulate localstorage', () => {
      it('should store the token in localStorage',
        () => {
        
          service.SaveSlotData('slot1',1);
          expect(localStorage.getItem('slots')).toEqual('["slot1"]');
      });

      it('should get all slots from localStorage',
      () => {
      //  let slot = {
      //     "slot": "slot1",
      //     "id": 1,
      //     "disabled": true
      //   }
        service.SaveSlotData('slot2',1);
        service.getAll();
        expect(localStorage.getItem('slots')).toEqual('["slot2"]');
    });

    describe('Edit SLots Function', () => {
      it('should alter slot avalible value',
      () => {
       let slot = [{
          slot: "slot1",
          id: 1,
          disabled: false
        }]

        let arrayslots = [{
          slot: "slot1",
          id: 1,
          disabled: false
        },{
          slot: "slot2",
          id: 2,
          disabled: false
        }]
        service.editSlot(arrayslots,slot,true);
       
        expect(arrayslots[0].disabled).toBe(true);
    });
    });


    });

  



  });











