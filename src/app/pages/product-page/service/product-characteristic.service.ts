import {Injectable} from '@angular/core';
import {ProductCharacteristic} from '../../../store/domain/product-characteristic/product-characteristic';
import {AbstractClient} from './abstract.client';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicService extends AbstractClient<ProductCharacteristic> {

  constructor(http: HttpClient) {
    super(http, '/api/product-characteristic');
  }

  getFilterByCategory(id: string) {
    const httpParams: HttpParams = new HttpParams()
      .set('id', id);

    return this.http.get(this.url + '/findCharacteristic', {
      params: httpParams
    });
  }

}
