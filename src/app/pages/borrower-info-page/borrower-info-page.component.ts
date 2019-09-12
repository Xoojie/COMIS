import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../core/services/genericCRUD/data.service'
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef ,MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-borrower-info-page',
    templateUrl: './borrower-info-page.component.html',
    styleUrls: ['./borrower-info-page.component.scss'],
})
export class BorrowerInfoPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

