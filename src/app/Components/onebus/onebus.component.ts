import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService } from '../../Shared/bus.service';
import { StationService } from '../../Shared/station.service';

@Component({
  selector: 'app-onebus',
  templateUrl: './onebus.component.html',
  styleUrls: ['./onebus.component.css']
})
export class OnebusComponent implements OnInit {
  id;
  bus;
  stationname;
  constructor(private route : ActivatedRoute, private busservice: BusService,private stationservice: StationService) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
      this.bus = this.busservice.getOne(this.id);
      this.stationname = this.stationservice.getOne(this.bus[0].stations)[0].stationName;
    })
  }
}
