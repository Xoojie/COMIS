import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryConfigPageRoutingModule } from './inventory-config-page-routing.module';
import { InventoryConfigPageComponent , addTypeDialog , editTypeDialog , addSubTypeDialog , editSubTypeDialog } from './inventory-config-page.component';
import { MaterialModule } from '../../material.module'; 

@NgModule({
  declarations: [
    InventoryConfigPageComponent, 
    addTypeDialog, 
    editTypeDialog, 
    addSubTypeDialog, 
    editSubTypeDialog],
  entryComponents:[
    addTypeDialog, 
    editTypeDialog, 
    addSubTypeDialog, 
    editSubTypeDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InventoryConfigPageRoutingModule
  ]
})
export class InventoryConfigPageModule { }
