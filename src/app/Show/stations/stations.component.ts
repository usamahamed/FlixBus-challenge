import { Component, OnInit, ViewChild } from '@angular/core';
import { StationService } from '../../Shared/station.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { BusService } from '../../Shared/bus.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  allbuses;
  ELEMENT_DATA: Stations[];
  displayedColumns: string[] = ['select', 'stationName', 'Address', 'city', 'streetName', 'selectedSLots','controllers'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection; 

  constructor(private stationservice: StationService, private busservice: BusService) { 
    this.ELEMENT_DATA = this.stationservice.getAll();
    this.dataSource = new MatTableDataSource<Stations>(this.ELEMENT_DATA);
    this.selection = new SelectionModel<Stations>(true, []);
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

  AddBus(e){
    console.log(e);
  }
  RemoveBus(e){
    console.log(e);
  }

}

export interface Stations {
  id: number;
  stationName: string;
  Address: string;
  city: string;
  streetName: string;
  selectedSLots: string;
  Longitude: number;
  Latitude: string;
  SlotAval: number;
}
