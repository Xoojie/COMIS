import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentPageRoutingModule } from './incident-page-routing.module';
import { IncidentPageComponent } from './incident-page.component';

@NgModule({
  declarations: [IncidentPageComponent],
  imports: [
    CommonModule,
    IncidentPageRoutingModule
  ]
})
export class IncidentPageModule { }
