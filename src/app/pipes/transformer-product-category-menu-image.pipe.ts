import {Pipe, PipeTransform} from '@angular/core';
import {MenuImageItem} from '../containers/menu-image/menu-image.component';
import {ProductCategory} from '../store/domain/system/product.category';

@Pipe({
  name: 'transformerMenuImageItem'
})
export class TransformerProductCategoryMenuImagePipe implements PipeTransform {

  transform(value: ProductCategory[]): any {
    if (!value) {
      return [];
    }

    return value.map(item => ({ title: item.title, image: item.img, id: item.id } as MenuImageItem));
  }

}
