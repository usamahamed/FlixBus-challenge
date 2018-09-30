import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ParkingSlotComponent } from './Components/parking-slot/parking-slot.component';
import { StationComponent } from './Components/station/station.component';
import { BusComponent } from './Components/bus/bus.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertService } from './Shared/alert.service';
import { BusesComponent } from './Show/buses/buses.component';
import { StationsComponent } from './Show/stations/stations.component';
import { OnebusComponent } from './Components/onebus/onebus.component';
import { OnestationComponent } from './Components/onestation/onestation.component';
import { CustomaddbusComponent } from './Components/customaddbus/customaddbus.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { NewsidebarComponent } from './Components/home/newsidebar/newsidebar.component';
import { NewheaderComponent } from './Components/home/newheader/newheader.component';
import { NewfooterComponent } from './Components/home/newfooter/newfooter.component';
const appRoutes: Routes = [

  { path: 'slot', component: ParkingSlotComponent },
  { path: 'station', component: StationComponent },
  { path: 'bus', component: BusComponent },
  { path: 'AddbustoStation', component: CustomaddbusComponent },
  { path: 'listbus/:id/:name', component: OnebusComponent },
  { path: 'listbus', component: BusesComponent },
  { path: 'liststations/:id/:name', component: OnestationComponent },
  { path: 'liststations', component: StationsComponent },
  { path: '', component: HomeComponent }
];



 @NgModule({
  declarations: [
    AppComponent,
    ParkingSlotComponent,
    StationComponent,
    BusComponent,
    BusesComponent,
    StationsComponent,
    OnestationComponent,
    OnebusComponent,
    OnestationComponent,
    CustomaddbusComponent,
    HomeComponent,
    NewsidebarComponent,
    NewheaderComponent,
    NewfooterComponent

   
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
