import {HttpClient} from '@angular/common/http';

export abstract class AbstractClient<T extends BaseEntity> {

  protected constructor(protected http: HttpClient, protected url: string) {}

}
