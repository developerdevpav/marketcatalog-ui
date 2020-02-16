import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolstorProductPageComponent} from './rolstor-product-page/rolstor-product-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {ContainerModule} from '../../containers/container.module';
import {CommonComponentModule} from '../../components/common-component.module';
import {CorniceProductPageComponent} from './cornice-product-page/cornice-product-page.component';
import {JalosieProductPageComponent} from './jalosie-product-page/jalosie-product-page.component';
import {AccessoryProductPageComponent} from './accessory-product-page/accessory-product-page.component';
import {RolstorHttpService} from './service/rolstor-http.service';
import {CorniceHttpService} from './service/cornice-http.service';
import {JalosieHttpService} from './service/jalosie-http.service';
import {AccessoryHttpService} from './service/accessory-http.service';
import {ProductInformationComponent} from '../product-information/product-information.component';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';
import {DialogProductInformationComponent} from "../dialog-product-information/dialog-product-information.component";

const routes: Routes = [
  {
    path: 'rolstor',
    component: RolstorProductPageComponent
  },
  { path: 'rolstor/:id', component: ProductInformationComponent, data: { service: 'rolstor' } },
  {
    path: 'cornice',
    component: CorniceProductPageComponent
  },
  { path: 'cornice/:id', component: ProductInformationComponent, data: { service: 'cornice' }  },
  {
    path: 'jalousie',
    component: JalosieProductPageComponent
  },
  { path: 'jalousie/:id', component: ProductInformationComponent, data: { service: 'jalousie' }  },
  {
    path: 'accessory',
    component: AccessoryProductPageComponent
  },
  { path: 'accessory/:id', component: ProductInformationComponent, data: { service: 'accessory' }  }
];


@NgModule({
  declarations: [
    RolstorProductPageComponent,
    CorniceProductPageComponent,
    JalosieProductPageComponent,
    AccessoryProductPageComponent,
    ProductInformationComponent,
    DialogProductInformationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    ContainerModule,
    CommonComponentModule,
    AngularYandexMapsModule
  ],
  providers: [
    RolstorHttpService,
    CorniceHttpService,
    JalosieHttpService,
    AccessoryHttpService,
    ProductInformationComponent
  ], entryComponents: [
    DialogProductInformationComponent
  ]
})
export class ProductPageModule {
}
