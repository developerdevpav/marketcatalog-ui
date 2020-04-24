import {Injectable} from '@angular/core';
import {AbstractService} from './abstract.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductAccessoryService extends AbstractService<ProductAccessory> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/accessory-product');
  }

}
