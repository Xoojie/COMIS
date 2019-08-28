import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerInfoPageComponent } from './borrower-info-page.component';

describe('BorrowerInfoPageComponent', () => {
    let component: BorrowerInfoPageComponent;
    let fixture: ComponentFixture<BorrowerInfoPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BorrowerInfoPageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BorrowerInfoPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
