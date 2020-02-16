import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterSearchPipe} from '../filter-search.pipe';
import {SortCatalogListPipe} from './sort-catalog-list.pipe';


@NgModule({
  declarations: [
    FilterSearchPipe,
    SortCatalogListPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterSearchPipe,
    SortCatalogListPipe
  ]
})
export class NgxPipeModule { }
