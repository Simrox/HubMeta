import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Application, Resume } from '../app.model';

@Component({
  selector: 'app-status-renderer',
  templateUrl: './status-renderer.component.html',
  styleUrls: [],
})
export class StatusRendererComponent implements OnInit, AgRendererComponent {
  applicationStatus: string;
  appliedDay: string;

  constructor() {
    this.applicationStatus = '';
    this.appliedDay = '';
  }

  ngOnInit(): void {}

  refresh(params: ICellRendererParams): boolean {
    this.applicationStatus = (params.data as Application)?.status ?? '';
    this.appliedDay = this.getAppliedDay(params.data);
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.applicationStatus = (params.data as Application)?.status ?? '';
    this.appliedDay = this.getAppliedDay(params.data);
  }

  private getAppliedDay(data: Application): string {
    const days = Math.round(
      (new Date().getTime() - data.created_at) / (24 * 60 * 60 * 1000)
    );
    return days == 0 ? 'Today' : days == 1 ? 'Yesterday' : days + ' Days ago';
  }
}
