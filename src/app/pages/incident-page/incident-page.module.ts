import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentPageRoutingModule } from './incident-page-routing.module';
import { IncidentPageComponent , editIncidentDialog } from './incident-page.component';
import { MaterialModule } from '../../material.module'; 


@NgModule({
  entryComponents: [
    editIncidentDialog
  ],
  declarations: [
  IncidentPageComponent,
  editIncidentDialog],
  imports: [
    CommonModule,
    IncidentPageRoutingModule,
    MaterialModule
  ]
})
export class IncidentPageModule { }
