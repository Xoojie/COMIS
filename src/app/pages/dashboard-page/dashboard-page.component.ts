import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../core/models/Inventory';
import { DataService } from '../../core/services/genericCRUD/data.service'


@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

    inventory: Inventory[] = [];

    constructor(
        public DS: DataService
    ) { }

    ngOnInit() {
        this.readWithPromise();
    }

    async readWithPromise() {
        const inventoryPromise = this.DS.readPromise(Inventory);
    
        const [inventoryRes] = await Promise.all([inventoryPromise]);
    
        this.inventory = inventoryRes;
    }  

    

   
    
}
