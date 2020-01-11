import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DefaultDataServiceConfig, EntityMetadataMap, NgrxDataModule} from 'ngrx-data';
import {environment} from '../../environments/environment';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'api'
};

export enum MarketCatalogStore {
  PRODUCT_CATEGORY = 'product_category',
  PRODUCT_ACCESSORY = 'product_accessory',
  PRODUCT_CORNICE = 'product_cornice',
  PRODUCT_JALOSIE = 'product_jalosie',
  PRODUCT_ROLSTOR = 'product_rolstor'
}

const entityMetadata: EntityMetadataMap = {
  product_category: {},
  product_accessory: {},
  product_cornice: {},
  product_jalosie: {},
  product_rolstor: {}
};

const pluralNames = {
  product_category: 'category',
  product_accessory: 'accessory-product',
  product_cornice: 'cornice-product',
  product_jalosie: 'jalosie-product',
  product_rolstor: 'rolstor-product'
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    NgrxDataModule.forRoot({entityMetadata, pluralNames}),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class MarketCatalogStoreModule { }
