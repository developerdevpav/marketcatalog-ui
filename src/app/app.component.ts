import {Component, OnInit} from '@angular/core';
import {EntityCollectionService, EntityServices} from 'ngrx-data';
import {Observable} from 'rxjs';
import {MarketCatalogStore} from './store/market-catalog-store.module';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductInformation} from './pages/product-information/product-information.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  styleSocIcon = {'width.px': '35', 'height.px': '35'};
  isFlowTopHeader = false;

  extensionMenu = false;

  activeMenuItem: string;

  categories: ProductCategory[];

  info: ProductInformation = {
    id: 'vafefef',
    // tslint:disable-next-line:max-line-length
    images: [
      {
        url: 'https://asforos.by/upload/resize_cache/iblock/2d6/500_500_17236f3bb137eb253405d06e58cacf26c/2d680639b1cc829cce56faceb6ff5cb3.JPG'
      }
    ],
    value: 'Title product',
    properties: [
      {
        title: 'Characteristic',
        values: [
          'val', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3'
        ]
      },
      {
        title: 'Characteristic2',
        values: [
          'val', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3'
        ]
      },
      {
        title: 'Characteristic3',
        values: [
          'val', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3', 'val2', 'val3', 'val', 'val2', 'val3'
        ]
      }
    ]
  };

  category$: Observable<ProductCategory[]>;
  serviceStore: EntityCollectionService<ProductCategory>;

  constructor(private matIconRegistry: MatIconRegistry,
              private activatedRout: ActivatedRoute,
              private router: Router,
              private domSanitizer: DomSanitizer, private entityServices: EntityServices) {
    this.serviceStore = entityServices.getEntityCollectionService(MarketCatalogStore.PRODUCT_CATEGORY);
    this.category$ = this.serviceStore.entities$;
    this.matIconRegistry.addSvgIcon(
      'info_company_hand',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info_company/hands.svg')
    ).addSvgIcon(
      'info_company_idea',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info_company/idea.svg')
    ).addSvgIcon(
      'info_company_truck',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info_company/truck.svg')
    ).addSvgIcon(
      'info_company_notes',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info_company/notes.svg')
    ).addSvgIcon(
      'clear',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/clear.svg')
    ).addSvgIcon(
      'phone',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/phone.svg')
    ).addSvgIcon(
      'filter-icon',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/filter.svg')
    ).addSvgIcon(
      'expansion',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/baseline-expand.svg')
    ).addSvgIcon(
      'unexpansion',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/baseline-expand_less.svg')
    ).addSvgIcon(
      'tick',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/tick.svg')
    ).addSvgIcon(
      'circle-empty',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/circle-empty.svg')
    ).addSvgIcon(
      'sort-down',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/sort_down.svg')
    ).addSvgIcon(
      'sort-up',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/sort_up.svg')
    );
  }

  ngOnInit(): void {
    this.serviceStore.getAll();

    this.category$.subscribe(it => {
      this.categories = it;
    });
  }

  handleExtensionMenu() {
    this.extensionMenu = !this.extensionMenu;
  }

  getParentCategory(): Observable<ProductCategory[]> {
    return this.filterCategory(it => it.parent === it.id);
  }

  routLink(path: string, id: string) {
    this.router.navigate([path], {
        queryParams: {
          category: id
        }
      }
    );

  }

  getChildCategory(): Observable<ProductCategory[]> {
    return this.filterCategory(it => it.parent === this.activeMenuItem && it.id !== this.activeMenuItem);
  }

  filterCategory(predicate: (category: ProductCategory) => boolean): Observable<ProductCategory[]> {
    return this.category$.pipe(
      map(categories => categories.filter(predicate))
    );
  }

  handleMouseOver(id: string) {
    this.activeMenuItem = id;
  }

  handleClickCategory(category: ProductCategory) {
    this.extensionMenu = false;
  }

  handleSelectCategory(category: ProductCategory) {
    const recursiveParentCategory = this.getRecursiveParentCategory(category);
    this.extensionMenu = false;
    this.routLink('product/' + recursiveParentCategory, category.id);
  }

  getRecursiveParentCategory(category: ProductCategory): string {
    if (category.id === category.parent) {
      return category.systemName;
    }

    return this.getRecursiveParentCategory(this.searchCategory(category.parent));
  }

  searchCategory(id: string) {
    return this.categories.find(it => it.id === id);
  }
}
