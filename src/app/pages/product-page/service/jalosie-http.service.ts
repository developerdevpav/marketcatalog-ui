import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractProductService} from './abstract.product.service';

@Injectable({
  providedIn: 'root'
})
export class JalosieHttpService extends AbstractProductService<ProductJalosie> {

  constructor(http: HttpClient) {
    super(http, '/api/jalosie-product');
  }

}
