import {NgModule} from '@angular/core';
import {FlexCatalogComponent} from './flex-catalog/flex-catalog.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {CommonModule} from '@angular/common';
import {CommonComponentModule} from '../components/common-component.module';

@NgModule({
  declarations: [
    FlexCatalogComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CommonComponentModule
  ],
  exports: [
    ProductCardComponent,
    FlexCatalogComponent
  ]
})
export class ContainerModule { }
