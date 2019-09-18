import { InventoryConfigPageComponent } from './inventory-config-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ {path:'',component:InventoryConfigPageComponent,data:{shouldReuse:true,key:'inventory-config'}},  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryConfigPageRoutingModule { }
