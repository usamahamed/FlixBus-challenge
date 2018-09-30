import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StationService } from '../../Shared/station.service';
import { SlotService } from '../../Shared/slot.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  slots$;
  selectedSLots = [];
  uid: number = new Date().valueOf();


  constructor(private stationService: StationService, private slotservice: SlotService,private router:Router) { }

    ngOnInit() {
    this.slots$ =  this.slotservice.getAll();
}


onSubmit(f : NgForm) {
 this.stationService.PostNewStation(f.value,this.uid).subscribe((response) => {
});

 f.resetForm();
 this.router.navigateByUrl('/liststations')

}
}
