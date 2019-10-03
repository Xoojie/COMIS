import { BorrowerInfoPageComponent } from './borrower-info-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: BorrowerInfoPageComponent,
        data: { shouldReuse: true, key: 'borrower-info' },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BorrowerInfoPageRoutingModule {}
