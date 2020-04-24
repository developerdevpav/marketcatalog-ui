import {AbstractService} from './abstract.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends AbstractService<ProductCategory> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/category');
  }

}
