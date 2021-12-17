import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.css'],
})
export class CustomHeaderComponent implements IHeaderAngularComp {
  params: any;
  ascSort: string = '';
  descSort: string = '';
  noSort: string = '';

  agInit(params: IHeaderParams): void {
    this.params = params;

    params.column.addEventListener(
      'sortChanged',
      this.onSortChanged.bind(this)
    );

    this.onSortChanged();
  }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive';
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active';
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active';
    } else {
      this.noSort = 'active';
    }
  }

  onSortRequested(order: string, event: any) {
    this.params.setSort(order, event.shiftKey);
  }

  refresh(params: IHeaderParams): boolean {
    return true;
  }
}
