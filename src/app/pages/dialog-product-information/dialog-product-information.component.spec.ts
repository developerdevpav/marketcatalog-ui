import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogProductInformationComponent} from './dialog-product-information.component';

describe('DialogProductInformationComponent', () => {
  let component: DialogProductInformationComponent;
  let fixture: ComponentFixture<DialogProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProductInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
