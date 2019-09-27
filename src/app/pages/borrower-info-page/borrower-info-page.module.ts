import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowerInfoPageRoutingModule } from './borrower-info-page-routing.module';
import { BorrowerInfoPageComponent , addBorrowerDialog, editBorrowerDialog } from './borrower-info-page.component';
import { MaterialModule } from '../../material.module';

@NgModule({
    entryComponents : [addBorrowerDialog, editBorrowerDialog],
    declarations: [BorrowerInfoPageComponent ,addBorrowerDialog, editBorrowerDialog],
    imports: [CommonModule, BorrowerInfoPageRoutingModule,MaterialModule],
})
export class BorrowerInfoPageModule {}
