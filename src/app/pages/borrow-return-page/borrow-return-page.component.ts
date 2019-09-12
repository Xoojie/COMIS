import { Component, OnInit, Inject } from '@angular/core';
import { Inventory } from '../../core/models/Inventory';
import { Transaction } from '../../core/models/Transaction';
import { DataService } from '../../core/services/genericCRUD/data.service'
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef ,MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-borrow-return-page',
    templateUrl: './borrow-return-page.component.html',
    styleUrls: ['./borrow-return-page.component.scss'],
})
export class BorrowReturnPageComponent implements OnInit {

    
    inventory : Inventory[] = [];
    instrument : Inventory[] = [];
    accessory : Inventory[] = [];
    displayedColumns: string[] = [ 'itemID' , 'subType' ,'name' , 'description' , 'condition' ];

    constructor(
        public DS: DataService,
        public dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.readInventory();
    }

    async readInventory() {
        const inventoryPromise = this.DS.readPromise(Inventory);
    
        const [inventoryRes] = await Promise.all([inventoryPromise]);
    
        this.inventory = inventoryRes;

        this.instrument = this.inventory.filter(function(item){
            return item.type == 'Instrument' && item.isDeleted.toString() == '0'
        });
        this.accessory = this.inventory.filter(function(item){
            return item.type == 'Accessory' && item.isDeleted.toString() == '0'
        });
    }

    

    openItem(row ) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            id : row._id,
            subType : row.subType,
            itemID : row.itemID,
            borrowerID : ''
        };
        if(row.condition == 'OK'){
            this.dialog.open(borrowDialog, dialogConfig).afterClosed().subscribe(result => {
                this.readInventory()
            });
        }else if (row.condition == 'BORROWED'){
            this.dialog.open(returnDialog, dialogConfig).afterClosed().subscribe(result => {
                this.readInventory()
            });
        }else{
            alert("Item is Unavailable");
        }
    }    
}

@Component({
    selector : 'borrow-dialog',
    templateUrl : './dialog/borrow-dialog.html',
})

export class borrowDialog {

    borrowForm : any;

    constructor(
        public DS: DataService,
        public dialogRef: MatDialogRef<borrowDialog>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.borrowForm = this.fb.group({
                borrowerID: [''],
                itemID : [data.itemID],
                dateBorrowed : [new Date],
                dateReturned : [''],
                lentBy: ['bandoy'],
                receivedBy: [''],
                remarks: [''],
                hasIncident: ['']
            })
        }
    
    submitBorrowForm(){
        var updateItem = {
            id: this.data.id,
            condition: 'BORROWED'
        }
        this.DS.updatePromise(Inventory,updateItem);
        this.DS.createPromise(Transaction, this.borrowForm.value);
        this.dialogRef.close();
    }
        
    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector : 'return-dialog',
    templateUrl : './dialog/return-dialog.html',
})

export class returnDialog implements OnInit {

    returnForm : any;
    singleTransactionSource : any;

    ngOnInit(){
        this.readLatestTransaction();
    };

    constructor(
        public DS: DataService,
        public dialogRef: MatDialogRef<returnDialog>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.returnForm = this.fb.group({
                id : [''],
                dateReturned : [new Date],
                receivedBy: ['bandoy'],
                remarks: [''],
                hasIncident: ['0']
            })
        }
    
    async readLatestTransaction(){
        const readPromise = this.DS.readLatestTransaction(Transaction, this.data.itemID);
        const [readRes] = await Promise.all([readPromise]);
        this.singleTransactionSource = readRes;
        this.data.borrowerID = this.singleTransactionSource.borrowerID;
        this.returnForm = this.fb.group({
            id : [this.singleTransactionSource._id],
            dateReturned : [new Date],
            receivedBy: ['bandoy'],
            remarks: [''],
            hasIncident: ['0']
        })
    }    

    submitReturnForm(){
        var updateItem = {
            id : this.data.id,
            condition : 'OK'
        }
        this.DS.updatePromise( Inventory, updateItem);
        this.DS.updatePromise( Transaction, this.returnForm.value );
        this.dialogRef.close(); 
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector : 'incident-dialog',
    templateUrl : './dialog/incident-dialog.html',
})

export class incidentDialog {

    incidentForm : any;

    constructor(
        public DS: DataService,
        public dialogRef: MatDialogRef<incidentDialog>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.incidentForm = this.fb.group({

            })
        }
        
    onNoClick(): void {
        this.dialogRef.close();
    }

}
