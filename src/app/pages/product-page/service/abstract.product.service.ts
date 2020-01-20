import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AbstractProductService<T extends AbstractProduct> {

  constructor(protected http: HttpClient, protected uri: string) {}

  getCount(): Observable<number> {
    return this.http.get(this.uri + '/count') as Observable<number>;
  }

}
