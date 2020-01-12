import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {LoaderComponent} from './loader/loader.component';
import {FilterExtensionPanelComponent} from './filter-extension-panel/filter-extension-panel.component';


@NgModule({
  declarations: [PaginationComponent, LoaderComponent, FilterExtensionPanelComponent],
  exports: [
    PaginationComponent,
    LoaderComponent,
    FilterExtensionPanelComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class CommonComponentModule { }
