import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {find, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {GetCategoryPage} from './store/action/system/product.category.action';
import {
  selectChildrenProductCategory,
  selectFirstProductCategoryPage,
  selectParentProductCategory,
  selectRootProductCategory
} from './store/selectors/product.catagory.selectors';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  styleSocIcon = {'width.px': '35', 'height.px': '35'};
  isFlowTopHeader = false;

  extensionMenu = false;

  productCategory: ProductCategory;

  pageCategory$: Observable<Pageable<ProductCategory>>;

  currentChildren: Observable<ProductCategory[]>;

  icons: Array<{ icon: string, path: string }> = [
    {
      icon: 'info_company_hand',
      path: '../assets/icon/info_company/hands.svg'
    },
    {
      icon: 'info_company_idea',
      path: '../assets/icon/info_company/idea.svg'
    },
    {
      icon: 'info_company_truck',
      path: '../assets/icon/info_company/truck.svg'
    },
    {
      icon: 'info_company_notes',
      path: '../assets/icon/info_company/notes.svg'
    },
    {
      icon: 'clear',
      path: '../assets/icon/clear.svg'
    },
    {
      icon: 'phone',
      path: '../assets/icon/phone.svg'
    },
    {
      icon: 'filter-icon',
      path: '../assets/icon/filter.svg'
    },
    {
      icon: 'expansion',
      path: '../assets/icon/baseline-expand.svg'
    },
    {
      icon: 'unexpansion',
      path: '../assets/icon/baseline-expand_less.svg'
    },
    {
      icon: 'tick',
      path: '../assets/icon/tick.svg'
    },
    {
      icon: 'circle-empty',
      path: '../assets/icon/circle-empty.svg'
    },
    {
      icon: 'sort-down',
      path: '../assets/icon/sort_down.svg'
    },
    {
      icon: 'sort-up',
      path: '../assets/icon/sort_up.svg'
    }
  ];

  private subscription: Subscription = new Subscription();

  constructor(private store: Store<any>,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private activatedRout: ActivatedRoute,
              private router: Router) {
    this.store.dispatch(new GetCategoryPage());

    this.icons.forEach(iconData => {
      this.matIconRegistry.addSvgIcon(iconData.icon, domSanitizer.bypassSecurityTrustResourceUrl(iconData.path));
    });
  }

  ngOnInit(): void {
    this.pageCategory$ = this.store.select(selectFirstProductCategoryPage);
  }

  getParentCategories(): Observable<ProductCategory[]> {
    return this.store.select(selectParentProductCategory);
  }

  getChildrenCategory(id: string): Observable<ProductCategory[]> {
    return this.store.select(selectChildrenProductCategory, {id});
  }

  handleExtensionMenu() {
    this.extensionMenu = !this.extensionMenu;
  }

  handleMouseOver(productCategory: ProductCategory) {
    if (!!productCategory) {
      this.productCategory = productCategory;
      this.currentChildren = this.store.select(selectChildrenProductCategory, {id: productCategory.id});
    }
  }

  isActive(category: ProductCategory) {
    return !!this.productCategory && this.productCategory.id === category.id;
  }

  handleClickCategory(category: ProductCategory) {
    this.extensionMenu = false;
  }

  handleSelectCategory(id: string, categories: Observable<ProductCategory[]>) {
    if (!categories) {
      return;
    }

    console.log(id);

    const category: Observable<ProductCategory> = categories.pipe(
      switchMap(it => it),
      find(item => item.id === id)
    );

    const foundCategorySubscriber = category.subscribe(it => {
      console.log(it);
      const recursiveParentCategory = this.store.select(selectRootProductCategory, {categorySearch: it});

      const foundParentCategorySubscriber = recursiveParentCategory.subscribe((foundCategory: ProductCategory) => {
        this.extensionMenu = false;
        this.routLink('product/' + foundCategory.systemName, it.id);
      });

      this.subscription.add(foundParentCategorySubscriber);
    });

    this.subscription.add(foundCategorySubscriber);
  }

  routLink(path: string, id: string) {
    this.router.navigate([path], {
        queryParams: {
          category: id
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
