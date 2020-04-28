import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Service} from './service';
import {Observable} from 'rxjs';
import {BaseEntity, Pageable} from '../domain/abstract.domain';

export abstract class AbstractService<T extends BaseEntity> implements Service<T> {

  protected headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  protected separator = '/';

  protected constructor(protected httpClient: HttpClient, protected uri: string = '/api') {
  }

  getPage(pageIndex: number, pageSize: number): Observable<Pageable<T>> {
    let params: HttpParams = new HttpParams();
    // tslint:disable-next-line:no-construct

    const pageIndexString = !!pageIndex ? pageIndex.toString() : '' + 0;
    const pageSizeString = !!pageSize ? pageSize.toString() : '' + 10;

    params = params.append('page', pageIndexString);
    params = params.append('size', pageSizeString);

    return this.httpClient.get(`${this.uri}`, { headers: this.headers, params }) as Observable<Pageable<T>>;
  }

}
