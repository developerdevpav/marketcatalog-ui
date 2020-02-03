import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterExtensionPanelComponent} from './filter-extension-panel.component';

describe('FilterExtensionPanelComponent', () => {
  let component: FilterExtensionPanelComponent;
  let fixture: ComponentFixture<FilterExtensionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterExtensionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterExtensionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
