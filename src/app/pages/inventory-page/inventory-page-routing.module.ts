import { InventoryPageComponent, addInventoryDialog, editInventoryDialog } from './inventory-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: InventoryPageComponent,
        data: { shouldReuse: true, key: 'inventory' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    
})
export class InventoryPageRoutingModule {}
