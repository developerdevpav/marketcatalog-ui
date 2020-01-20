import {Component, OnInit} from '@angular/core';
import {EntityCollectionService, EntityServices} from 'ngrx-data';
import {Observable} from 'rxjs';
import {MarketCatalogStore} from './store/market-catalog-store.module';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

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

  category$: Observable<ProductCategory[]>;
  serviceStore: EntityCollectionService<ProductCategory>;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, private entityServices: EntityServices) {
    this.serviceStore = entityServices.getEntityCollectionService(MarketCatalogStore.PRODUCT_CATEGORY);
    this.category$ = this.serviceStore.entities$;
    this.matIconRegistry
      .addSvgIcon(
        'info_company_hand',
        domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info_company/hands.svg')
      )
      .addSvgIcon(
        'info_company_idea',
        domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info_company/idea.svg')
      )
      .addSvgIcon(
        'info_company_truck',
        domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info_company/truck.svg')
      )
      .addSvgIcon(
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
  }

  handleExtensionMenu() {
    this.extensionMenu = !this.extensionMenu;
  }

  getParentCategory(): Observable<ProductCategory[]> {
    return this.filterCategory(it => it.child === it.id);
  }

  getChildCategory(): Observable<ProductCategory[]> {
    return this.filterCategory(it => it.child === this.activeMenuItem && it.id !== this.activeMenuItem);
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
}
