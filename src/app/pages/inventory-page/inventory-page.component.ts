import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../core/models/Inventory';
import { DataService } from '../../core/services/genericCRUD/data.service'
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-inventory-page',
    templateUrl: './inventory-page.component.html',
    styleUrls: ['./inventory-page.component.scss'],
})
export class InventoryPageComponent implements OnInit {
   
    displayedColumns: string[] = [ 'itemID' , 'subType' ,'name' , 'description' , 'condition' ];

    inventory = new MatTableDataSource<any>();

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

    public doFilter = (value: string) => {
        this.inventory.filter = value.trim().toLocaleLowerCase();
      }
}

    
