import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtensionMenuComponent} from './extension-menu.component';

describe('ExtensionMenuComponent', () => {
  let component: ExtensionMenuComponent;
  let fixture: ComponentFixture<ExtensionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
