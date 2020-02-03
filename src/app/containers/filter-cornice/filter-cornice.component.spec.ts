import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FIlterCorniceComponent} from './filter-cornice.component';

describe('FIlterCorniceComponent', () => {
  let component: FIlterCorniceComponent;
  let fixture: ComponentFixture<FIlterCorniceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FIlterCorniceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FIlterCorniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
