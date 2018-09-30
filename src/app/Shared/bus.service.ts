import { StationService } from './station.service';
import { Stations } from './../Show/stations/stations.component';
import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  buses;
  Allstations;
  index;
  i;
  avalslot;
  arr;
  result;

  constructor(private http : HttpClient,
    private stationserveive : StationService ,
    private router:Router,private alertService :AlertService) { 
  }

  /************************************************************/
  /***************      API Methods               ************/
  /************************************************************/

  // Add new bus to fake API
  PostNewBus(buslist,id) {
    buslist.id = id;
    this.AddNewBus(buslist,id);  // update localstorage
    if(this.stationserveive.updateSlotsAPI(buslist.stations) == false) {
     return;
    }
    else {return this.http.post('http://localhost:3000/buses', buslist);}
    
  }

  // Get ALl buses
  getAllBuses() {
    return this.http.get(`http://localhost:3000/buses`)
  }

  // Check Duplicate Bus Plate Number
  CheckPlateExist(id) {
   
  return  this.http.get(`http://localhost:3000/buses/${id}`)
   
  }

// Update Bus
  UpdateBusAPI(buslist,id) {
      this.UpdateBus(buslist,id);  // update localstorage
      this.http.put(`http://localhost:3000/buses/${id}`, buslist)
           .subscribe((response) => response);
}

// delete bus
  deleteBusAPI(array ,id,stationid) {
  this.deletebus(array ,id,stationid);   // update localstorage
 return this.http.delete(`http://localhost:3000/buses/${id}`).subscribe(res=>res);
  }



 /************************************************************/
  /***************      LocalStorage Methods      ************/
  /************************************************************/
  public getAll() {
    return JSON.parse(localStorage.getItem('buses'));
  }


  AddNewBus(buslist,id) {
    buslist.id = id;
    this.Allstations = JSON.parse(localStorage.getItem('stationlist'));

    // decrease station slots
    if(this.decreaseAvalSlot(this.Allstations, buslist.stations) === false) {
      this.alertService.showToaster('you can\'t add new bus');
      this.router.navigateByUrl('/listbus');
      return;
    }

    if(localStorage.getItem('buses')===null){
      this.buses = [];
     this.buses.push(buslist);
     localStorage.setItem('buses',JSON.stringify(this.buses))
     }else{
     
      this.buses=JSON.parse(localStorage.getItem('buses'));
     this.buses.push(buslist);
     localStorage.setItem('buses',JSON.stringify(this.buses))

 }


 localStorage.setItem('stationlist',JSON.stringify(this.Allstations));

 //ALerts
 this.alertService.showToaster('New bus is sucessfully saved');
  }



  UpdateBus(buslist,id) {
   this.Allstations = JSON.parse(localStorage.getItem('stationlist'));



    if(localStorage.getItem('buses')===null){
      this.buses = [];
     this.buses.push(buslist);
     localStorage.setItem('buses',JSON.stringify(this.buses))
     }else{
     
      this.buses=JSON.parse(localStorage.getItem('buses'));
      this.index = this.buses.findIndex(x=>x.id == id);

     this.buses.splice(this.index,1,buslist);
     localStorage.setItem('buses',JSON.stringify(this.buses))

 }


 localStorage.setItem('stationlist',JSON.stringify(this.Allstations));

 //ALerts
 this.alertService.showToaster('New bus is sucessfully saved');
  }


  foundornot(platenumber){
    this.arr = this.getAll() || [];
    this.arr.forEach(i=>{
      if(i.plateNumber == platenumber){ this.result = true;
    }
      else{ 
        this.result = false;
         } 
    })
  return  this.result;
  }



getOne(id){
  return this.getAll().filter(buses => {
    return buses.id == id ;
  })
}

getOneBus(id){
  return this.getAll().filter(buses => {
    return buses.stations == id ;
  })
}
  
decreaseAvalSlot(array ,id){
  this.index = array.findIndex(x=>x.id == id);
  this.avalslot = array[this.index]['SlotAval'];
  if(this.avalslot>0){
    array[this.index]['SlotAval'] =  this.avalslot - 1;
  }else{
    return false;
  }
}


deletebus(array ,id,stationid){
  
  this.i = array.findIndex(x=>x.id == id);
  array.splice(this.i,1);
  // increase station slots
  this.stationserveive.IncreaseupdateSlotsAPI(stationid);
  this.stationserveive.IncreaseStationSlots(stationid);
  localStorage.setItem('buses',JSON.stringify(array));
  this.alertService.showToaster('Bus deleted sucessfully');
}

}