import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {LoaderComponent} from './loader/loader.component';
import {FilterExtensionPanelComponent} from './filter-extension-panel/filter-extension-panel.component';
import {DropdownSelectComponent} from './dropdown-select/dropdown-select.component';
import {ButtonComponent} from './button/button.component';
import {ExtensionListComponent} from './extension-list/extension-list.component';
import {FormsModule} from '@angular/forms';
import {NgxPipeModule} from '../pipes/ngx-pipe/ngx-pipe.module';
import {ChipComponent} from './chip/chip.component';
import {ImageCarouselComponent} from './image-carousel/image-carousel.component';

@NgModule({
  declarations: [PaginationComponent, LoaderComponent, FilterExtensionPanelComponent,
    DropdownSelectComponent, ButtonComponent, ExtensionListComponent, ChipComponent, ImageCarouselComponent],
  exports: [
    PaginationComponent,
    LoaderComponent,
    FilterExtensionPanelComponent,
    DropdownSelectComponent,
    ExtensionListComponent,
    ChipComponent,
    ImageCarouselComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    NgxPipeModule
  ]
})
export class CommonComponentModule { }
