import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractProductService} from './abstract.product.service';

@Injectable({
  providedIn: 'root'
})
export class AccessoryHttpService extends AbstractProductService<ProductAccessory> {

  constructor(http: HttpClient) {
    super(http, '/api/accessory-product');
  }

}
