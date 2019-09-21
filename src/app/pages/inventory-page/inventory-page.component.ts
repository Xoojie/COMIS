import { Component, OnInit, Inject } from '@angular/core';
import { IInventory, Inventory } from '../../core/models/Inventory';
import { DataService } from '../../core/services/genericCRUD/data.service'
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef ,MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-inventory-page',
    templateUrl: './inventory-page.component.html',
    styleUrls: ['./inventory-page.component.scss'],
})

export class InventoryPageComponent implements OnInit {
    
    // inventory = new MatTableDataSource<IInventory>();
    inventory : Inventory[] = [];
    instrument : Inventory[] = [];
    accessory : Inventory[] = [];
    displayedColumns: string[] = [ 'itemID' ,'type', 'subType' ,'name' , 'description' ,'location', 'condition' ];
    

    ngOnInit() {
        this.readInventory();
    }

    constructor(
        public DS: DataService,
        public dialog: MatDialog,
       // public BRC : BorrowReturnPageComponent,
    ) { }

    async readInventory() {
        const inventoryPromise = this.DS.readPromise(Inventory);
    
        const [inventoryRes] = await Promise.all([inventoryPromise]);
    
        this.inventory = inventoryRes;

        this.instrument = this.inventory.filter(function(item){
            return item.class == 'Instrument' && item.isArchived.toString() == '0'
        });
        this.accessory = this.inventory.filter(function(item){
            return item.class == 'Accessory' && item.isArchived.toString() == '0'
        });
        // this.BRC.readInventory();
    }

    public applyFilter = (value: string) => {
       
      }

    openAddInstrumentDialog(): void {
        
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            class : 'Instrument'
        };

        this.dialog.open(addInventoryDialog, dialogConfig).afterClosed().subscribe(result => {
            this.readInventory()
        });
    }

    openAddAccessoryDialog(): void {
        
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            class : 'Accessory'
        };

        this.dialog.open(addInventoryDialog, dialogConfig).afterClosed().subscribe(result => {
            this.readInventory()
        });
    }

    editInstrument(row) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            class : 'Instrument',
            type : row.type,
            id : row._id, 
            itemID : '',
            subType : '',
            name: row.name,
            description : row.description,
            condition : row.condition,
            location : row.location
        };

        this.dialog.open(editInventoryDialog, dialogConfig).afterClosed().subscribe(result => {
            this.readInventory()
        });
    }

    editAccessory(row) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            class : 'Accessory',
            type : row.type,
            id : row._id, 
            itemID : '',
            subType : '',
            name: row.name,
            description : row.description,
            condition : row.condition,
            location : row.location
        };

        this.dialog.open(editInventoryDialog, dialogConfig).afterClosed().subscribe(result => {
            this.readInventory()
        });
    }  
}

@Component({
    selector : 'addInventory-dialog',
    templateUrl : './dialog/addInventory-dialog.html',
})

export class addInventoryDialog {

    addInventoryForm : any;
    
    constructor(
        public DS: DataService,
        public dialogRef: MatDialogRef<addInventoryDialog>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.addInventoryForm = this.fb.group({
                itemID :[''],
                class: [data.class],
                type : [''],
                subType : [''],
                itemNum : [''],
                name : [''],
                description: [''],
                location: [''],
                condition : [''],
                status: ['OK'],
                dateAdded : [new Date()],
                dateEdited : [''],
                addedBy : ['bandoy'],
                editedBy : [''],
                isArchived : ['0'],
            })
        }

    async submitAddInventoryForm() {
        this.DS.createPromise(Inventory , this.addInventoryForm.value);
        this.dialogRef.close();
    }
        
    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector : 'editInventory-dialog',
    templateUrl : './dialog/editInventory-dialog.html'
})

export class editInventoryDialog implements OnInit {

    editInventoryForm : any;
    singleInventorySource : any;
    singleInventory  = new MatTableDataSource<Inventory>(this.singleInventorySource);

    ngOnInit() {
        this.readSingleInventory();
    }
    
    constructor(
        public DS: DataService,
        public dialogRef: MatDialogRef<editInventoryDialog>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.editInventoryForm = this.fb.group({
                id: [data.id],
                name : [data.name],
                description: [data.description],
                location: [data.location],
                condition : [data.condition],
                dateEdited : [new Date()],
                editedBy : ['bandoy'],
            })
    }

    async readSingleInventory() {
        
        const getIDquery = 'id='+this.data.id ;
        const type = 'get';
        const inventoryPromise = this.DS.readPromise(Inventory ,type, getIDquery);
        const [inventoryRes] = await Promise.all([inventoryPromise]);
        this.singleInventorySource = inventoryRes;
        this.data.itemID = this.singleInventorySource.itemID
        this.data.subType = this.singleInventorySource.subType
    }

    submitEditInventoryForm(){
        this.DS.updatePromise(Inventory, this.editInventoryForm.value);
        this.dialogRef.close();
    }

    submitDeleteInventoryForm(){
        const deleteQuery = {
            id : this.data.id,
            isDeleted : '1'
        }

        this.DS.updatePromise(Inventory, deleteQuery);
        this.dialogRef.close(); 
    }

    onNoClick(): void {
            this.dialogRef.close();
    }
}
