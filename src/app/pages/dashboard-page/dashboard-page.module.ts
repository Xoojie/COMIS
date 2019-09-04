import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';

@NgModule({
    declarations: [DashboardPageComponent],
    imports: [CommonModule, DashboardPageRoutingModule , MaterialModule],
})
export class DashboardPageModule {}
