import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortProductsComponent } from './sort-products.component';

describe('SortProductsComponent', () => {
  let component: SortProductsComponent;
  let fixture: ComponentFixture<SortProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortProductsComponent]
    });
    fixture = TestBed.createComponent(SortProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
