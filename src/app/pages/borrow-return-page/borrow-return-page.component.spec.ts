import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowReturnPageComponent } from './borrow-return-page.component';

describe('BorrowReturnPageComponent', () => {
    let component: BorrowReturnPageComponent;
    let fixture: ComponentFixture<BorrowReturnPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BorrowReturnPageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BorrowReturnPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
