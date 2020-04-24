import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {LoaderComponent} from './loader/loader.component';
import {FilterExtensionPanelComponent} from './filter-extension-panel/filter-extension-panel.component';
import {DropdownSelectComponent} from './dropdown-select/dropdown-select.component';
import {ButtonComponent} from './button/button.component';
import {ExtensionListComponent} from './extension-list/extension-list.component';
import {TransformerProductCategoryMenuImagePipe} from '../pipes/transformer-product-category-menu-image.pipe';

@NgModule({
  declarations: [PaginationComponent, LoaderComponent, FilterExtensionPanelComponent,
    DropdownSelectComponent, ButtonComponent, ExtensionListComponent, TransformerProductCategoryMenuImagePipe],
  exports: [
    PaginationComponent,
    LoaderComponent,
    FilterExtensionPanelComponent,
    DropdownSelectComponent,
    ExtensionListComponent,
    TransformerProductCategoryMenuImagePipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class CommonComponentModule {
}
