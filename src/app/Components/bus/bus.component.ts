import {  BusType } from './../../models/bus';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StationService } from '../../Shared/station.service';
import { BusService } from '../../Shared/bus.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})

export class BusComponent implements OnInit  {
  BusesType: BusType[] = [
    {value: 'Double_Decker', viewValue: 'Double_Decker'},
    {value: 'Spinter', viewValue: 'Spinter'},
    {value: 'Club_Bus', viewValue: 'Club_Bus'}
  ];
  stations$;
  uid: number = new Date().valueOf();
  unique;
  paramvalues;

  constructor(private route: ActivatedRoute,
    private router :Router,private busservice: BusService ,
    private stationserice:StationService) { 
  }
  ngOnInit(){
    this.unique = true;
   this.stationserice.getAllStationsAPI().subscribe(station =>{
    this.stations$ = station;
  }); 

   // params for update
  this.route.queryParams.subscribe(params => {

    this.paramvalues = params;
});
}


  // Executed When Form Is Submitted
  onSubmit(bus: NgForm) { 
     
     // check for plateNumber existance
    if(this.busservice.foundornot(bus.value.plateNumber) == true) {
      this.unique = false;
       return;
    }

    if(bus.value.id === undefined) {
      //add new Bus
      this.busservice.PostNewBus(bus.value,this.uid).subscribe(res=>{
       
      });

    } else {
        //update existing Bus
        this.busservice.UpdateBusAPI(bus.value,bus.value.id);
    }
    this.router.navigateByUrl('/listbus');
  }
}
