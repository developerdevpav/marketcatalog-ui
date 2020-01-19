import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccessoryProductPageComponent} from './accessory-product-page.component';

describe('AccessoryProductPageComponent', () => {
  let component: AccessoryProductPageComponent;
  let fixture: ComponentFixture<AccessoryProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
