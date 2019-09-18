import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryConfigPageRoutingModule } from './inventory-config-page-routing.module';
import { InventoryConfigPageComponent } from './inventory-config-page.component';

@NgModule({
  declarations: [InventoryConfigPageComponent],
  imports: [
    CommonModule,
    InventoryConfigPageRoutingModule
  ]
})
export class InventoryConfigPageModule { }
