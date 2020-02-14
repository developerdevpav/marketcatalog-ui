import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductCharacteristic} from "../../../store/domain/system/product.characteristic";

export class AbstractProductService<T extends AbstractProduct> {

  constructor(protected http: HttpClient, protected uri: string) {}

  getCount(): Observable<number> {
    return this.http.get(this.uri + '/count') as Observable<number>;
  }

  getCharacteristic(id: string): Observable<ProductCharacteristic> {
    const params: HttpParams = new HttpParams()
      .set('id', id);
    return this.http.get(this.uri + '/characteristic', {
      params
    }) as Observable<ProductCharacteristic>;
  }

  findById(id: string): Observable<AbstractProduct> {
    return this.http.get(this.uri + '/' + id) as Observable<AbstractProduct>;
  }


}
