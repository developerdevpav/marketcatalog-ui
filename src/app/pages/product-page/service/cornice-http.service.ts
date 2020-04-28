import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractProductService} from './abstract.product.service';
import {ProductCornice} from '../../../store/domain/product/product.cornice';

@Injectable({
  providedIn: 'root'
})
export class CorniceHttpService extends AbstractProductService<ProductCornice> {

  constructor(http: HttpClient) {
    super(http, '/api/cornice-product');
  }

}
