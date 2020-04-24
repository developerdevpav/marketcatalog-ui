import {NgModule} from '@angular/core';
import {FlexCatalogComponent} from './flex-catalog/flex-catalog.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {CommonModule} from '@angular/common';
import {CommonComponentModule} from '../components/common-component.module';
import {FilterCorniceComponent} from './filter-cornice/filter-cornice.component';
import {MenuImageComponent} from './menu-image/menu-image.component';

@NgModule({
  declarations: [
    FlexCatalogComponent,
    ProductCardComponent,
    FilterCorniceComponent,
    MenuImageComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CommonComponentModule
  ],
    exports: [
        ProductCardComponent,
        FlexCatalogComponent,
        FilterCorniceComponent,
        MenuImageComponent
    ]
})
export class ContainerModule { }
