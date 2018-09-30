import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './alert.service';
import { TestBed } from '@angular/core/testing';

import { StationService } from './station.service';
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HttpTestingController, TestRequest, HttpClientTestingModule } from '@angular/common/http/testing';

// describe('StationService', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [HttpClientModule,MatSnackBarModule,RouterModule],
//     providers: [ HttpClient,StationService,AlertService,MatSnackBar]
//   }));

//   it('should be created', () => {
//     const service: StationService = TestBed.get(StationService);
//     expect(service).toBeTruthy();
//   });
// });



describe('requests in stations', () => {
  let service: StationService;
  let backend: HttpTestingController;

   beforeEach(() =>{ TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule,HttpClientModule,MatSnackBarModule,RouterModule,HttpClientTestingModule],
    providers: [ HttpClient,StationService,AlertService,MatSnackBar]
  })
  

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
  service = TestBed.get(StationService);
  backend = TestBed.get(HttpTestingController);
    // Spying on localstorage
    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
  spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  spyOn(localStorage, 'removeItem')
    .and.callFake(mockLocalStorage.removeItem);
  spyOn(localStorage, 'clear')
    .and.callFake(mockLocalStorage.clear);
});//end beforeEach
   






// }
//   );
  it('Stations should be created', () => {
    let service: StationService = TestBed.get(StationService);
   expect(service).toBeTruthy();
 });
    it('should expectOne url', () => {
      service.getAllStationsAPI().subscribe();
      backend.expectOne(`http://localhost:3000/stations`);
      backend.verify();

    });

    it('should expect One Stations url and method', () => {
      service.getAllStationsAPI().subscribe();
      backend.expectOne({url: `http://localhost:3000/stations`});
      service.getAllStationsAPI().subscribe();
      backend.expectOne({url: `http://localhost:3000/stations`, method: 'GET'});
      backend.verify();
    });

    it('should not expect Stations one when not subscribed', () => {
      service.getAllStationsAPI()// .subscribe();
      backend.expectNone(`http://localhost:3000/stations`);
      backend.verify();
    });

    it('should not expect two Stations request', () => {
      service.getAllStationsAPI().subscribe();
      backend.expectOne(`http://localhost:3000/stations`);
      backend.expectNone(`http://localhost:3000/stations`);
      backend.verify();
    });

    it('should expectOne Stations request differant style', () => {
      service.getAllStationsAPI().subscribe();
      backend.expectOne((request: HttpRequest<any>) => {
        return request.url.match(/stations/) &&
              request.method === 'GET';
      });
      backend.verify();
    });

    it('should expect One station request different style (using TestRequest)', () => {
      service.getAllStationsAPI().subscribe();
      const call: TestRequest = backend.expectOne(`http://localhost:3000/stations`);
      expect(call.request.method).toEqual('GET');
      backend.verify();
    });

   

    it('should match Stations url', () => {
      service.getAllStationsAPI().subscribe();
      backend.match((request) => {
        return request.url.match(/stations/) &&
               request.method === 'GET';
      });
      backend.verify();
    });

    it('should match two Stations requests', () => {
      service.getAllStationsAPI().subscribe();
      service.getOneStationsAPI(1).subscribe();
      backend.match((request) => {
        return request.url.match(/stations/) &&
              request.method === 'GET';
      });
      backend.verify();
    });

    it('should match two requests with length check', () => {
      service.getAllStationsAPI().subscribe();
      service.getOneStationsAPI(1).subscribe();
      const calls = backend.match((request) => {
        return request.url.match(/stations/) &&
               request.method === 'GET';
      });
      expect(calls.length).toEqual(2);
      expect(calls[0].request.url).toEqual(`http://localhost:3000/stations`);
      backend.verify();
    });

    // Station Responses

    it('should get Stations result', () => {
      const response = [
        {
          "stationName": "station1",
          "Longitude": "3123213",
          "Latitude": "76786",
          "address": "hofmannstraße 69-81379 Munich",
          "city": "Munich",
          "postal": "32714",
          "streetName": "hofmannstraße",
          "HouseNumber": "Lietz",
          "selectedStations": [
            {
              "station": "station1",
              "id": 1538290662657,
              "disabled": false
            }
          ],
          "id": 1538290681346,
          "SlotAval": 1
        }
      ]
      service.getAllStationsAPI().subscribe((result) => {
         expect(result['length']).toEqual(1);
        expect(result[0].stationName).toEqual('station1');
        expect(result[0].SlotAval).toEqual(1);
      });
      backend.expectOne(`http://localhost:3000/stations`).flush(response);
      backend.verify();
    });

    it('should get station result different style', () => {
      const response = {
        "stationName": "station1",
        "id": 1,
        "SlotAval": 1
      };
      service.getOneStationsAPI(1).subscribe((result) => {
        expect(result['id']).toEqual(1);
      });
      const call = backend.expectOne(`http://localhost:3000/stations/1`);
      expect(call.request.method).toEqual('GET');
      call.flush(response);
      backend.verify();
    });

  
  });


