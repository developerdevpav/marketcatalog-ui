import {Injectable} from '@angular/core';
import {AbstractProductService} from './abstract.product.service';
import {HttpClient} from '@angular/common/http';
import {ProductRolstor} from '../../../store/domain/product/product.rolstor';

@Injectable({
  providedIn: 'root'
})
export class RolstorHttpService extends AbstractProductService<ProductRolstor> {

  constructor(http: HttpClient) {
    super(http, '/api/rolstor-product');
  }

}
