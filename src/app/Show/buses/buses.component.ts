import { StationService } from './../../Shared/station.service';
import { BusService } from './../../Shared/bus.service';
import { Component, OnInit, ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Buses } from '../../models/bus';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
   ELEMENT_DATA: Buses[];
   displayedColumns: string[] = ['select', 'Plate_Number', 'station_Name', 'Bus_Type',"controllers"];
   dataSource;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   selection; 

  constructor(private router:Router,private busservice : BusService,private stationservice: StationService) {
    this.ELEMENT_DATA = this.busservice.getAll();
    this.ELEMENT_DATA.forEach((elem)=>{

      elem.stationName = this.stationservice.getOne(elem.stations)[0].stationName;
    })
  
    this.dataSource = new MatTableDataSource<Buses>(this.ELEMENT_DATA);
    this.selection = new SelectionModel<Buses>(true, []);

   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  RemoveBus(e) {
  if( confirm('do you want to delete this bus?')) {
   this.busservice.deleteBusAPI( this.ELEMENT_DATA ,e.id,e.stations);
   this.router.navigateByUrl('/');
  }
  }
}




