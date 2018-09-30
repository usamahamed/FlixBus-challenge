import { BusService } from './../../Shared/bus.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StationService } from '../../Shared/station.service';

@Component({
  selector: 'app-onestation',
  templateUrl: './onestation.component.html',
  styleUrls: ['./onestation.component.css']
})
export class OnestationComponent implements OnInit {

  id;
  station;
  allbuses;
  buses;
  constructor(private route : ActivatedRoute,private router: Router,
     private stationservice: StationService, private busservice:BusService) { }

  ngOnInit() {
    // station params data 
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
      this.station = this.stationservice.getOne(this.id);
       this.allbuses = this.busservice.getOneBus(this.id);
    })
  }
  deleteBus(bus){
    if(confirm('do you want to delete selected bus ?')){
       this.buses = this.busservice.getAll();
      this.busservice.deleteBusAPI(this.buses,bus.id,bus.stations)
      this.router.navigateByUrl('/liststations');
    }
  }
}  
