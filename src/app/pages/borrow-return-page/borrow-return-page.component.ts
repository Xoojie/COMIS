import { Component, OnInit, Inject } from '@angular/core';
import { Inventory } from '../../core/models/Inventory';
import { Transaction } from '../../core/models/Transaction';
import { DataService } from '../../core/services/genericCRUD/data.service'
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef ,MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Borrower } from '../../core/models/Borrower';
import { Incident } from '../../core/models/Incident';

@Component({
    selector: 'app-borrow-return-page',
    templateUrl: './borrow-return-page.component.html',
    styleUrls: ['./borrow-return-page.component.scss'],
})
export class BorrowReturnPageComponent implements OnInit {

    
    inventory : Inventory[] = [];
    instrument : any;
    accessory : any;
    displayedColumns: string[] = [ 'itemID' ,'type', 'subType' ,'name' , 'description' ,'location', 'condition' , 'status' ];

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

        this.instrument = new MatTableDataSource(this.instrument);
        this.accessory = new MatTableDataSource(this.accessory);
    }

    applyFilter(filterValue: string) {
        this.instrument.filter = filterValue.trim().toLowerCase();
        this.accessory.filter = filterValue.trim().toLowerCase();
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
                dateBorrowed : [new Date().toLocaleString()],
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
        public dialog : MatDialog,
        public dialogRef: MatDialogRef<returnDialog>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.returnForm = this.fb.group({
                id : [''],
                dateReturned : [new Date().toLocaleString()],
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
            dateReturned : [new Date().toLocaleString()],
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

    hasIncident(){
        const dialogConfigIncident = new MatDialogConfig();
        dialogConfigIncident.data = {
            id : this.singleTransactionSource._id,
            itemID : this.singleTransactionSource.itemID,
            itemObject : this.data.id,
            bID : this.singleTransactionSource.borrowerID,
            firstName : '',
            lastName: '',
            purpose : '',
            dateBorrowed : '',

        };
        this.dialog.open(incidentDialog, dialogConfigIncident).afterClosed().subscribe(result => {
            
        });
       
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector : 'incident-dialog',
    templateUrl : './dialog/incident-dialog.html',
    styleUrls: ['./borrow-return-page.component.scss'],
})

export class incidentDialog implements OnInit {

    incidentForm : any;
    borrowerInfo : any;
    transactionRaw : Transaction[] = [];
    transaction : any;
    displayedColumns : string[] = ['itemID' , 'purpose' , 'dateBorrowed' ];

    constructor(
        public DS: DataService,
        public dialogRef: MatDialogRef<incidentDialog>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.incidentForm = this.fb.group({
                data : [new Date],
                tID : [data.id],
                bID : [data.bID],
                bName : [''],
                itemID :  [data.itemID],
                adminDescription: [''],
                borrowerDescription: ['']        
            })
        }

    ngOnInit(){
        this.readBorrower();
        this.readTransaction();
        console.log(this.transaction);
    }

    async readBorrower(){
        let query = "id=" + this.data.bID;
        let type = "getByBorrower"
        const promise = this.DS.readPromise(Borrower , type , query);
        const [res] = await Promise.all([promise]);
        this.borrowerInfo = res;
        this.data.firstName = this.borrowerInfo.firstName;
        this.data.lastName = this.borrowerInfo.lastName;
        let bName = this.data.firstName + " " + this.data.lastName;
        this.incidentForm = this.fb.group({
            data : [new Date],
            tID : [this.data.id],
            bID : [this.data.bID],
            bName : [bName],
            itemID :  [this.data.itemID],
            adminDescription: [''],
            borrowerDescription: ['']        
        })
        
    }

    async readTransaction() {
        let query = "id=" + this.data.id;
        let type = "get";
        const promise = this.DS.readPromise(Transaction , type , query);
        const [res] = await Promise.all([promise]);
        this.transactionRaw.push(res);
        this.transaction = new MatTableDataSource(this.transactionRaw);
    }

    submitIncidentForm() {
        let ItemUpdate = {
            id: this.data.itemObject,
            condition : 'For Repair',
            status : 'OK'
        }

        let TransactionUpdate = {
            id : this.data.id,
            dateReturned : new Date,
            receivedBy : 'bandoy',
            hasIncident :'1'
        }
        this.DS.updatePromise(Inventory , ItemUpdate );
        this.DS.updatePromise(Transaction , TransactionUpdate);
        this.DS.createPromise(Incident , this.incidentForm.value );
        this.dialogRef.close();
    }
        
    onNoClick(): void {
        this.dialogRef.close();
    }

}
