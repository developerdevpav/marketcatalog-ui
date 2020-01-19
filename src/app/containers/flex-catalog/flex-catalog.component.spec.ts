import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FlexCatalogComponent} from './flex-catalog.component';

describe('FlexCatalogComponent', () => {
  let component: FlexCatalogComponent;
  let fixture: ComponentFixture<FlexCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
