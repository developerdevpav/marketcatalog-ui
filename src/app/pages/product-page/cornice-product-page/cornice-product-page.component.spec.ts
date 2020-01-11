import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CorniceProductPageComponent} from './cornice-product-page.component';

describe('CorniceProductPageComponent', () => {
  let component: CorniceProductPageComponent;
  let fixture: ComponentFixture<CorniceProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorniceProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorniceProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
