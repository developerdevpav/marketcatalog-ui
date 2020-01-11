import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {AngularSvgIconModule} from 'angular-svg-icon';

export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Элементов на странице:';
  nextPageLabel     = 'Далее';
  previousPageLabel = 'Назад';
  firstPageLabel = 'fsfsd';
  lastPageLabel = 'sda';

  getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return '0 из ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' из ' + length;
  }
}

@NgModule({
  declarations: [],
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatMenuModule,
    AngularSvgIconModule,
    MatPaginatorModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatMenuModule,
    AngularSvgIconModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ]
})
export class AngularMaterialModule {}
