import { Component, OnInit, Inject} from '@angular/core';
import { DataService } from '../../core/services/genericCRUD/data.service'


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

    ngOnInit() {
       
    } 
    
}
