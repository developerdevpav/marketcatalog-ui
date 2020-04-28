import {Injectable} from '@angular/core';
import {AbstractService} from './abstract.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilterCategory, FilterCharacteristicItem} from '../domain/system/filterCharacteristicItem';

@Injectable({
  providedIn: 'root'
})
export class FilterCharacteristicService extends AbstractService<FilterCharacteristicItem> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'api/product-characteristic');
  }

  public getFilter(id: string): Observable<FilterCategory> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.uri + this.separator + 'filter', { headers: this.headers, params }) as Observable<FilterCategory>;
  }

}
