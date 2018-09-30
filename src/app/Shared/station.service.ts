import { Stations } from './../models/station';
import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse} from  '@angular/common/http';

import { SlotService } from './slot.service';
import { ISlot } from '../models/slot';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  slots1;
  value1;
  index;
  Allslots;
  SlotAvalable;
  stationsarray;

  constructor(private slotservice:SlotService
    ,private http : HttpClient,
    private alertService: AlertService) {

   } 

   /************************************************************/
  /***************      API Methods               ************/
  /************************************************************/

   PostNewStation(station, id) {
    station.id = id;
    station.SlotAval = station.selectedSLots.length;
    this.AddNewStation(station, id);
    this.slotservice.updateAvalibleSlot(station.selectedSLots);
    return this.http.post('http://localhost:3000/stations', station);
   }

   // get ALl stations
   getAllStationsAPI() {
    return this.http.get('http://localhost:3000/stations');
   }

    // get one stations
    getOneStationsAPI(id) {
      return this.http.get(`http://localhost:3000/stations/${id}`);
     }
     
   // Update Station slots
     updateSlotsAPI(stationid) {
    let result:boolean;
    this.http.get(`http://localhost:3000/stations/${stationid}`).
    subscribe(station => {
      if(station['SlotAval'] == 0) {result = false;}
      else{
        station['SlotAval'] = station['SlotAval'] - 1
        this.http.put(`http://localhost:3000/stations/${station['id']}`, station)
            .subscribe((response) => response);
            result = true;
      }
     
      })
     return result;
  }

  // Increase slots after bus added
  IncreaseupdateSlotsAPI(stationid) {
    this.http.get(`http://localhost:3000/stations/${stationid}`).
    subscribe(station=> {
      
        station['SlotAval'] = station['SlotAval'] + 1
        this.http.put(`http://localhost:3000/stations/${station['id']}`, station)
            .subscribe((response) => response);
     
     
      })
    
  }


/************************************************************/
  /***************      LocalStorage Methods      ************/
  /************************************************************/

   AddNewStation(station, id) {
    
    this.alertService.showToaster('station is sucessfully saved');
  
   // update selected slot to not be selected again by another stations
   this.Allslots = JSON.parse(localStorage.getItem('slots'));
    this.slotservice.editSlot(this.Allslots, station.selectedSLots, true);
    localStorage.setItem('slots', JSON.stringify(this.Allslots));


   // end update
    if(localStorage.getItem('stationlist')===null){
       this.slots1 = [];

      this.slots1.push(station);
      localStorage.setItem('stationlist',JSON.stringify(this.slots1))
  } else {
       this.slots1 = JSON.parse(localStorage.getItem('stationlist'));
      this.slots1.push(station);
      localStorage.setItem('stationlist',JSON.stringify(this.slots1))

  }
  }
 
  getAll() {
    return JSON.parse(localStorage.getItem('stationlist'));
  }
  getOne(id){
    return this.getAll().filter(station => {
      return station.id == id ;
    })
  }

  
   IncreaseStationSlots(id){
    console.log(id )
    this.stationsarray = this.getAll();
    this.index = this.stationsarray.findIndex(x=>x.id == id);
    
    this.SlotAvalable = this.stationsarray[this.index]['SlotAval'];
    console.log(this.SlotAvalable )
    this.stationsarray[this.index]['SlotAval'] =  this.SlotAvalable + 1;
      localStorage.setItem('stationlist',JSON.stringify(this.stationsarray))
  }

}




