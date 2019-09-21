import { IncidentPageComponent } from './incident-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ {path:'',component:IncidentPageComponent,data:{shouldReuse:true,key:'incident'}},  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentPageRoutingModule { }
