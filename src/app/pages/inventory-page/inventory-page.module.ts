import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { InventoryPageRoutingModule } from './inventory-page-routing.module';
import { InventoryPageComponent } from './inventory-page.component';

@NgModule({
    declarations: [InventoryPageComponent],
    imports: [CommonModule, InventoryPageRoutingModule , MaterialModule],
})
export class InventoryPageModule {}
