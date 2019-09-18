import { Component, OnInit, Inject } from '@angular/core';
import { Inventory } from '../../core/models/Inventory';
import { Transaction } from '../../core/models/Transaction';
import { DataService } from '../../core/services/genericCRUD/data.service'
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef ,MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-borrow-return-page',
    templateUrl: './borrow-return-page.component.html',
    styleUrls: ['./borrow-return-page.component.scss'],
})
export class BorrowReturnPageComponent implements OnInit {

    
    inventory : Inventory[] = [];
    instrument : Inventory[] = [];
    accessory : Inventory[] = [];
    displayedColumns: string[] = [ 'itemID' ,'type', 'subType' ,'name' , 'description' , 'condition' , 'status' ];

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
            return item.class == 'Instrument' && item.isArchived.toString() == '0'
        });
        this.accessory = this.inventory.filter(function(item){
            return item.class == 'Accessory' && item.isArchived.toString() == '0'
        });
    }

    

    openItem(row ) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            id : row._id,
            type : row.type,
            subType : row.subType,
            itemID : row.itemID,
            borrowerID : '',
            purpose: ''
        };
        if(row.status == 'OK'){
            this.dialog.open(borrowDialog, dialogConfig).afterClosed().subscribe(result => {
                this.readInventory()
            });
        }else if (row.status == 'BORROWED'){
            this.dialog.open(returnDialog, dialogConfig).afterClosed().subscribe(result => {
                this.readInventory()
            });
        }else{
            alert('Item is Unavailable');
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
                purpose : [''],
                dateBorrowed : [new Date],
                dateReturned : [''],
                lentBy: ['bandoy'],
                receivedBy: [''],
                hasIncident: ['']
            })
        }
    
    submitBorrowForm(){
        const updateItem = {
            id: this.data.id,
            status: 'BORROWED'
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
                hasIncident: ['0']
            })
        }
    
    async readLatestTransaction(){
        const type = 'getLatest'
        const getIDquery = 'id='+this.data.itemID ;
        const readPromise = this.DS.readPromise(Transaction,type,getIDquery);
        const [readRes] = await Promise.all([readPromise]);
        this.singleTransactionSource = readRes;

        this.data.borrowerID = this.singleTransactionSource.borrowerID;
        this.data.purpose = this.singleTransactionSource.purpose;
        this.returnForm = this.fb.group({
            id : [this.singleTransactionSource._id],
            dateReturned : [new Date],
            receivedBy: ['bandoy'],
            hasIncident: ['0']
        })
    }    

    submitReturnForm(){
        const updateItem = {
            id : this.data.id,
            status : 'OK'
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
