import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolstorProductPageComponent} from './rolstor-product-page/rolstor-product-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularMaterialModule} from '../../angular-material/angular-material.module';
import {ContainerModule} from '../../containers/container.module';
import {CommonComponentModule} from '../../components/common-component.module';

const routes: Routes = [
  { path: 'rolstor', component: RolstorProductPageComponent }
];


@NgModule({
  declarations: [
    RolstorProductPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    ContainerModule,
    CommonComponentModule
  ]
})
export class ProductPageModule { }
