import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './routings/app-routing.module';
import {AppComponent} from './app.component';
import {MarketCatalogStoreModule} from './store/market-catalog-store.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {CommonComponentModule} from './components/common-component.module';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';

const API_KEY = '5557c22c-f442-4b3f-a5bb-2c4591e14201';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarketCatalogStoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    CommonComponentModule,
    AngularYandexMapsModule.forRoot(API_KEY)
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
