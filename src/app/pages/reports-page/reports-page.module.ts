import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsPageRoutingModule } from './reports-page-routing.module';
import { ReportsPageComponent , editIncidentDialog } from './reports-page.component';
import { MaterialModule } from '../../material.module'; 

@NgModule({
    entryComponents: [
        editIncidentDialog
    ],
    declarations: [
        ReportsPageComponent,
        editIncidentDialog
    ],
    imports: [CommonModule, ReportsPageRoutingModule , MaterialModule],
})
export class ReportsPageModule {}
