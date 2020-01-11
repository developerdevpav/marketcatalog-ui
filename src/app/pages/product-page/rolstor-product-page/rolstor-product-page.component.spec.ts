import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RolstorProductPageComponent} from './rolstor-product-page.component';

describe('RolstorProductPageComponent', () => {
  let component: RolstorProductPageComponent;
  let fixture: ComponentFixture<RolstorProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolstorProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolstorProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
