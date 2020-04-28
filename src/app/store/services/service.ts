import {Observable} from 'rxjs';
import {Pageable} from '../domain/abstract.domain';

export interface Service<T> {

  getPage(pageIndex: number, pageSize: number, uri: string): Observable<Pageable<T>>;

}
