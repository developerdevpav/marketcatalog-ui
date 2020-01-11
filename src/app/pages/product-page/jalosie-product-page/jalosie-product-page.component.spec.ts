import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JalosieProductPageComponent} from './jalosie-product-page.component';

describe('JalosieProductPageComponent', () => {
  let component: JalosieProductPageComponent;
  let fixture: ComponentFixture<JalosieProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JalosieProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JalosieProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
