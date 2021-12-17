import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Application } from '../app.model';

@Component({
  selector: 'app-name-renderer',
  template: `<span>{{ cellValue }}</span>`,
  styleUrls: [],
})
export class NameRendererComponent implements OnInit, AgRendererComponent {
  cellValue: string;

  constructor() {
    this.cellValue = '';
  }

  ngOnInit(): void {}

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getFormattedData(params.data);
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getFormattedData(params.data);
  }

  private getFormattedData(data: Application): string {
    if (data.email) {
      return `${data.name} (${data.email})`;
    } else {
      return data.name;
    }
  }
}
