import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';


@NgModule({
  declarations: [PaginationComponent],
  exports: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class CommonComponentModule { }
