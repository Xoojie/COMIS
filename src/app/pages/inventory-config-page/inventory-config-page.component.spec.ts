import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryConfigPageComponent } from './inventory-config-page.component';

describe('InventoryConfigPageComponent', () => {
  let component: InventoryConfigPageComponent;
  let fixture: ComponentFixture<InventoryConfigPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryConfigPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
