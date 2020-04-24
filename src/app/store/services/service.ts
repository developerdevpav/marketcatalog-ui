import {Observable} from 'rxjs';

export interface Service<T> {

  getPage(pageIndex: number, pageSize: number, uri: string): Observable<Pageable<T>>;

}
