import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  slots;
  constructor(private http : HttpClient,private alertService: AlertService) {


   }
   /************************************************************/
  /***************      API Methods               ************/
  /************************************************************/
   PostNewSlot(SlotName,id) {
    SlotName.id = id;
    SlotName.disabled = false;
    this.SaveSlotData(SlotName,id);
   return this.http.post('http://localhost:3000/slots', SlotName);
   }

    // Get from Fake API
  getAllSlot() {
    return this.http.get('http://localhost:3000/slots');
  }

  // Update Slots to not be avalible after added by station
 updateAvalibleSlot(ids) {
    
   
    ids.forEach(slot => {
      this.getOneSlot(slot.id).subscribe(
        (res) =>{
          res['disabled']= true;
          this.http.put(`http://localhost:3000/slots/${res['id']}`, res)
          .subscribe((response) => response)
          });
          });

  }

  // get one slot
  getOneSlot(id) {
    return this.http.get(`http://localhost:3000/slots/${id}`)
  
  }

 /************************************************************/
  /***************      LocalStorage Methods      ************/
  /************************************************************/


//
  SaveSlotData(SlotName,id) {
   
    
  
    if(localStorage.getItem('slots')===null){
       this.slots = [];
      this.slots.push(SlotName);
      localStorage.setItem('slots',JSON.stringify(this.slots))
  }else{
       this.slots=JSON.parse(localStorage.getItem('slots'));
      this.slots.push(SlotName);
      localStorage.setItem('slots',JSON.stringify(this.slots))

  }
  this.alertService.showToaster('Slot name is sucessfully saved');

  }

  // get All Slots
 
  getAll() {
    return JSON.parse(localStorage.getItem('slots'));
  }
  
  // Edit slot not be avalible after added by station
  editSlot(array , obj,value){
    array.forEach(e=>{
    obj.forEach(slot=>{
        if(slot.id == e.id) {
          e.disabled = value;
          
        }
      })
    });

  
   }
}
