import {NgModule} from '@angular/core';
import {FlexCatalogComponent} from './flex-catalog/flex-catalog.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {CommonModule} from '@angular/common';
import {CommonComponentModule} from '../components/common-component.module';
import {FilterCorniceComponent} from './filter-cornice/filter-cornice.component';
import {NgxPipeModule} from "../pipes/ngx-pipe/ngx-pipe.module";

@NgModule({
  declarations: [
    FlexCatalogComponent,
    ProductCardComponent,
    FilterCorniceComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CommonComponentModule,
    NgxPipeModule
  ],
  exports: [
    ProductCardComponent,
    FlexCatalogComponent,
    FilterCorniceComponent
  ]
})
export class ContainerModule { }
