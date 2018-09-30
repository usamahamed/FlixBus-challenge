import { NgModule } from '@angular/core';

import {MatSliderModule ,MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
    MatCardModule, MatTabsModule, MatIconModule,MatOptionModule,MatSelectModule,
    MatPaginatorModule, MatTableModule,MatDividerModule,MatListModule } from '@angular/material';

@NgModule({
    imports: [MatSliderModule,MatListModule, MatButtonModule, MatCheckboxModule, MatMenuModule, 
        MatInputModule, MatSnackBarModule,
        MatToolbarModule, MatDialogModule, MatSidenavModule, 
        MatNativeDateModule,MatTableModule,
    MatCardModule, MatTabsModule, MatIconModule,
    MatOptionModule,MatSelectModule,MatPaginatorModule, 
    MatTableModule,
    MatCardModule, MatTabsModule, MatIconModule,MatOptionModule,
    MatSelectModule,MatPaginatorModule, MatTableModule,MatDividerModule ,
    MatCardModule, MatTabsModule, MatIconModule,MatOptionModule,
    MatSelectModule,MatPaginatorModule,],
        
    exports: [MatSliderModule, MatListModule,MatDividerModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
        MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,MatTableModule,
        MatCardModule, MatTabsModule, MatIconModule,MatOptionModule,MatSelectModule,MatPaginatorModule  ]
})

export class MaterialModule {

}