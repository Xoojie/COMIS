import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { BorrowReturnPageRoutingModule } from './borrow-return-page-routing.module';
import { BorrowReturnPageComponent, borrowDialog, returnDialog, incidentDialog } from './borrow-return-page.component';

@NgModule({
    entryComponents : [borrowDialog , returnDialog , incidentDialog],
    declarations: [BorrowReturnPageComponent, borrowDialog , returnDialog , incidentDialog],
    imports: [CommonModule, BorrowReturnPageRoutingModule , MaterialModule],
})
export class BorrowReturnPageModule {}
