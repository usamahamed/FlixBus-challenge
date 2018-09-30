import { NgForm } from '@angular/forms';
import { SlotService } from './../../Shared/slot.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-slot',
  templateUrl: './parking-slot.component.html',
  styleUrls: ['./parking-slot.component.css']
})
export class ParkingSlotComponent implements OnInit {
  uid: number = new Date().valueOf();

  constructor(private slotsetvice: SlotService, private router:Router) { }

  ngOnInit() {
  }
  onSubmit(SlotName: NgForm) { 
    this.slotsetvice.PostNewSlot(SlotName.value,this.uid).subscribe((response) => {
  });
     SlotName.resetForm();
     this.router.navigateByUrl('/liststations')
  }
}
