import { Component, OnInit } from '@angular/core';
import { StationService } from '../../Shared/station.service';
import { BusService } from '../../Shared/bus.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BusType } from '../../models/bus';

@Component({
  selector: 'app-customaddbus',
  templateUrl: './customaddbus.component.html',
  styleUrls: ['./customaddbus.component.css']
})
export class CustomaddbusComponent implements OnInit {
  BusesType: BusType[] = [
    {value: 'Double_Decker', viewValue: 'Double_Decker'},
    {value: 'Spinter', viewValue: 'Spinter'},
    {value: 'Club_Bus', viewValue: 'Club_Bus'}
  ];
  stations$;
  unique;
  uid: number = new Date().valueOf();
  paramvalues;

  constructor(private route: ActivatedRoute,private router :Router,
    private busservice: BusService ,private stationserice:StationService) { }

  ngOnInit() {
    this.unique = true;
     this.stationserice.getAllStationsAPI().subscribe(res =>{
      this.stations$ = res;
    })

     // params data for update
    this.route.queryParams.subscribe(params => {

      this.paramvalues = params;
  });

  }
// Executed When Form Is Submitted
onSubmit(bus: NgForm) { 
 
  if(this.busservice.foundornot(bus.value.plateNumber) == true) {
    this.unique = false;
     return;
  }
 
  this.busservice.PostNewBus(bus.value,this.uid).subscribe(res => res);
  bus.resetForm();
  this.router.navigateByUrl('/listbus')
}
}
