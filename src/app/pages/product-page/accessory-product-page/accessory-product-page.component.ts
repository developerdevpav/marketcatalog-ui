import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractProductController} from '../abstract.controller';
import {ProductAccessoryService} from '../../../store/services/product.accessory';
import {MemoizedSelectorWithProps, Store} from '@ngrx/store';
import {selectProductAccessoryPage} from '../../../store/selectors/product.accessory.selectors';

@Component({
  selector: 'app-accessory-product-page',
  templateUrl: './accessory-product-page.component.html',
  styleUrls: ['./accessory-product-page.component.scss']
})
export class AccessoryProductPageComponent extends AbstractProductController<ProductAccessory> {

  constructor(store: Store<any>, activeRouting: ActivatedRoute, router: Router, service: ProductAccessoryService) {
    super(activeRouting, router, store, service);
  }

  getSelectorPage(): MemoizedSelectorWithProps<any, any, any> {
    return selectProductAccessoryPage;
  }

}
