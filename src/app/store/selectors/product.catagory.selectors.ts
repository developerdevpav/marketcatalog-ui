import {createSelector} from '@ngrx/store';
import * as selectorProductCategory from '../reducers/product.category.reducer';
import {Dictionary} from '@ngrx/entity';
import {Pageable} from '../domain/abstract.domain';
import {ProductCategory} from '../domain/system/product.category';

export const selectFirstProductCategoryPage = createSelector(
  selectorProductCategory.selectEntities,
  (pages: Dictionary<Pageable<ProductCategory>>) => {
    return pages[0];
  }
);

export const selectProductCategory = createSelector(
  selectorProductCategory.selectAll,
  (pages: Pageable<ProductCategory>[]) => {
    const array: Array<ProductCategory> = [];
    pages.forEach(it => array.push(...it.content));

    return array;
  }
);

export const selectRootProductCategory = createSelector(
  selectProductCategory,
  (categories: ProductCategory[],  props: { categorySearch: ProductCategory}) => {
    const { categorySearch } = props;

    if (!categorySearch) {
      return null;
    }

    const productCategory = categories.find(category => category.parent === categorySearch.parent);

    return !!productCategory && (productCategory.parent === productCategory.id || !productCategory.parent)
      ? productCategory
      : selectRootProductCategory(categories, categorySearch);
  }
);


export const selectProductCategoryPages = createSelector(
  selectorProductCategory.selectAll,
  (pages: Pageable<ProductCategory>[]) => {
    return pages;
  }
);



export const selectParentProductCategory = createSelector(
  selectorProductCategory.selectAll,
  (pages: Pageable<ProductCategory>[]) => {
    const array: Array<ProductCategory> = [];
    pages.forEach(it => array.push(...it.content));

    return array.filter(category => category.parent && (category.parent === category.id));
  }
);

export const selectChildrenProductCategory = createSelector(
  selectorProductCategory.selectAll,
  (pages: Pageable<ProductCategory>[], props: { id: string }) => {
    const array: Array<ProductCategory> = [];
    pages.forEach(it => array.push(...it.content));

    return array.filter(category => category.parent && (category.parent === props.id) && (category.parent !== category.id));
  }
);


export const selectProductCategoryPageByIndex = createSelector(
  selectorProductCategory.selectAll,
  (pages: Pageable<ProductCategory>[], props: { pageIndex: number }) => {
    return pages.find(page => page.page === props.pageIndex);
  }
);
