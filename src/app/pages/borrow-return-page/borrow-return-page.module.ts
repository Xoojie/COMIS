import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowReturnPageRoutingModule } from './borrow-return-page-routing.module';
import { BorrowReturnPageComponent } from './borrow-return-page.component';

@NgModule({
    declarations: [BorrowReturnPageComponent],
    imports: [CommonModule, BorrowReturnPageRoutingModule],
})
export class BorrowReturnPageModule {}
