import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { AlertService } from './alert.service';
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BusService } from './bus.service';
import { RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
// describe('BusService', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [HttpClientModule,MatSnackBarModule,RouterModule],
//     providers: [ HttpClient,BusService,AlertService,MatSnackBar,  {provide: Router, useClass: RouterStub} ]
//   }));

//   it('should be created', () => {
//     const service: BusService = TestBed.get(BusService);
//     expect(service).toBeTruthy();
//   });
// });






describe('Buses Requests', () => {
  let service: BusService;
  let backend: HttpTestingController;

  beforeEach(() =>{ TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule,HttpClientModule,MatSnackBarModule,RouterModule,HttpClientTestingModule],
    providers: [  HttpClient,BusService,AlertService,MatSnackBar,  {provide: Router, useClass: RouterStub} ]
  });
  service = TestBed.get(BusService);
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
  it('Buses should be created', () => {
    let service: BusService = TestBed.get(BusService);
   expect(service).toBeTruthy();
 });
    it('should expectOne url', () => {
      service.getAllBuses().subscribe();
      backend.expectOne(`http://localhost:3000/buses`);
      backend.verify();

    });

    it('should expect One Buses url and method', () => {
      service.getAllBuses().subscribe();
      backend.expectOne({url: `http://localhost:3000/buses`});
      service.getAllBuses().subscribe();
      backend.expectOne({url: `http://localhost:3000/buses`, method: 'GET'});
      backend.verify();
    });

    it('should not expect Buses one when not subscribed', () => {
      service.getAllBuses()// .subscribe();
      backend.expectNone(`http://localhost:3000/buses`);
      backend.verify();
    });

    it('should not expect two Buses request', () => {
      service.getAllBuses().subscribe();
      backend.expectOne(`http://localhost:3000/buses`);
      backend.expectNone(`http://localhost:3000/buses`);
      backend.verify();
    });

    it('should expectOne Buses request differant style', () => {
      service.getAllBuses().subscribe();
      backend.expectOne((request: HttpRequest<any>) => {
        return request.url.match(/buses/) &&
              request.method === 'GET';
      });
      backend.verify();
    });

    it('should expect One bus request different style (using TestRequest)', () => {
      service.getAllBuses().subscribe();
      const call: TestRequest = backend.expectOne(`http://localhost:3000/buses`);
      expect(call.request.method).toEqual('GET');
      backend.verify();
    });

    it('should match Buses url', () => {
      service.getAllBuses().subscribe();
      backend.match((request) => {
        return request.url.match(/buses/) &&
               request.method === 'GET';
      });
      backend.verify();
    });

    it('should get one bus', () => {
      service.getAllBuses().subscribe();
      service.CheckPlateExist(1).subscribe();
      backend.match((request) => {
        return request.url.match(/buses/) &&
              request.method === 'GET';
      });
      backend.verify();
    });

    it('should get one bus with length check', () => {
      service.getAllBuses().subscribe();
      service.CheckPlateExist(1).subscribe();
      const calls = backend.match((request) => {
        return request.url.match(/buses/) &&
               request.method === 'GET';
      });
      expect(calls.length).toEqual(2);
      expect(calls[0].request.url).toEqual(`http://localhost:3000/buses`);
      backend.verify();
    });

    // Responses

    it('should get Buses result', () => {
      const response = [{
        "id": 1538290895146,
        "busType": "Double_Decker",
        "stations": 1538290681346,
        "plateNumber": "BUS-111-114"
      }];
      service.getAllBuses().subscribe((result) => {
         expect(result['length']).toEqual(1);
        expect(result[0].busType).toEqual('Double_Decker');
        expect(result[0].plateNumber).toEqual("BUS-111-114");
      });
      backend.expectOne(`http://localhost:3000/buses`).flush(response);
      backend.verify();
    });

    it('should get Buses result different style', () => {
      const response = {
        "id": 1,
        "busType": "Double_Decker",
        "stations": 1538290681346,
        "plateNumber": "BUS-111-114"
      }];
      service.CheckPlateExist(1).subscribe((result) => {
        expect(result['id']).toEqual(1);
      });
      const call = backend.expectOne(`http://localhost:3000/buses/1`);
      expect(call.request.method).toEqual('GET');
      call.flush(response);
      backend.verify();
    });
  });

