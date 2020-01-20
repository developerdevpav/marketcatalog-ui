import {Injectable} from '@angular/core';
import {AbstractProductService} from './abstract.product.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolstorHttpService extends AbstractProductService<ProductRolstor> {

  constructor(http: HttpClient) {
    super(http, '/api/rolstor-product');
  }

}
