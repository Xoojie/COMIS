import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowerInfoPageRoutingModule } from './borrower-info-page-routing.module';
import { BorrowerInfoPageComponent } from './borrower-info-page.component';
import { MaterialModule } from '../../material.module';

@NgModule({
    declarations: [BorrowerInfoPageComponent],
    imports: [CommonModule, BorrowerInfoPageRoutingModule,MaterialModule],
})
export class BorrowerInfoPageModule {}
