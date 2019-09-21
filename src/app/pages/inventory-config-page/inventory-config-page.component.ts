import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../core/services/genericCRUD/data.service';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef ,MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { InventoryType } from '../../core/models/InventoryType';
import { InventorySubType } from '../../core/models/InventorySubType';


@Component({
  selector: 'app-inventory-config-page',
  templateUrl: './inventory-config-page.component.html',
  styleUrls: ['./inventory-config-page.component.scss']
})
export class InventoryConfigPageComponent implements OnInit {

  type : InventoryType[] = [];
  iType = [];
  aType = [];
  displayedColumnsType : string[] = ['type'];

  subType : InventorySubType[] = [];
  iSubType = [];
  aSubType = [];
  displayedColumnsSubType : string[] = ['type' , 'subType' , 'subTypeAbbv'];

  constructor(
    public DS: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.readType();
    this.readSubType();
  }

  async readType() {
    const promise = this.DS.readPromise(InventoryType);
    const [res] = await Promise.all([promise]);
    this.type = res;

    this.iType = this.type.filter(function(item){
      return item.class == "Instrument" 
    });

    this.aType = this.type.filter(function(item){
      return item.class == "Accessory"
    });
  }

  async readSubType() {
    const promise = this.DS.readPromise(InventorySubType);
    const [res] = await Promise.all([promise]);
    this.subType = res;

    this.iSubType = this.subType.filter(function(item){
      return item.class == "Instrument" 
    });

    this.aSubType = this.subType.filter(function(item){
      return item.class == "Accessory"
    });
  }

  openAddTypeDialog(string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      class : string
    };

    this.dialog.open(addTypeDialog, dialogConfig).afterClosed().subscribe(result => {
      this.readType()
    });
  }

  editTypeDialog(row, string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id : row._id,
      class : string,
      type : row.type
    };

    this.dialog.open(editTypeDialog , dialogConfig).afterClosed().subscribe(result => {
      this.readType()
    });
  }

  openAddSubTypeDialog(string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      class : string
    };

    this.dialog.open(addSubTypeDialog, dialogConfig).afterClosed().subscribe(result => {
      this.readSubType()
    });
  }

  editSubTypeDialog(row, string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id : row._id,
      class : string,
      type : row.type,
      subType : row.subType,
      subTypeAbbv : row.subTypeAbbv
    };

    this.dialog.open(editSubTypeDialog , dialogConfig).afterClosed().subscribe(result => {
      this.readSubType()
    });
  }

}

@Component({
  selector : 'add-type-dialog',
  templateUrl : './dialog/add-type-dialog.html',
})

export class addTypeDialog {

  addTypeForm : any ;

  constructor(
    public DS: DataService,
    public dialogRef: MatDialogRef<addTypeDialog>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.addTypeForm = this.fb.group({
        class: [data.class],
        type: ['']
      })
    }

  submitAddTypeForm() {
    this.DS.createPromise(InventoryType , this.addTypeForm.value);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector : 'edit-type-dialog',
  templateUrl : './dialog/edit-type-dialog.html',
})

export class editTypeDialog {

  editTypeForm : any; 

  constructor(
    public DS: DataService,
    public dialogRef: MatDialogRef<editTypeDialog>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.editTypeForm = this.fb.group({
          id : [data.id],
          class : [data.class],
          type : [data.type]
        })
    }

  submitEditTypeForm() {
    this.DS.updatePromise(InventoryType, this.editTypeForm.value);
    this.dialogRef.close();
  }

  deleteType() {
      //TODO
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector : 'add-subtype-dialog',
  templateUrl : './dialog/add-subtype-dialog.html',
})

export class addSubTypeDialog {

  addSubTypeForm : any;

  constructor(
    public DS: DataService,
    public dialogRef: MatDialogRef<addSubTypeDialog>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.addSubTypeForm = this.fb.group({
          class : [data.class],
          type : [''],
          subType : [''],
          subTypeAbbv : ['']
        })
    }

  submitAddSubTypeForm(){
    this.DS.createPromise(InventorySubType , this.addSubTypeForm.value);
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

@Component({
  selector : 'edit-subtype-dialog',
  templateUrl : './dialog/edit-subtype-dialog.html',
})

export class editSubTypeDialog {

  editSubTypeForm : any;

  constructor(
    public DS: DataService,
    public dialogRef: MatDialogRef<editSubTypeDialog>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.editSubTypeForm = this.fb.group({
          id : [data.id],
          class : [data.class],
          type : [data.type],
          subType : [data.subType], 
          subTypeAbbv : [data.subTypeAbbv]
        })
    }

    submitEditSubTypeForm() {
      this.DS.updatePromise(InventorySubType , this.editSubTypeForm.value);
      this.dialogRef.close();
    }

    deleteSubType() {
      //TODO
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
