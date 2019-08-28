import { BorrowReturnPageComponent } from './borrow-return-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: BorrowReturnPageComponent,
        data: { shouldReuse: true, key: 'borrow-return' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BorrowReturnPageRoutingModule {}
