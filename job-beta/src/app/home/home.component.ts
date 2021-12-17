import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, RowNode, SortChangedEvent } from 'ag-grid-community';
import { AppDataService } from '../app-data.service';
import { Application, ApplicationsPerPage, Direction } from '../app.model';
import { AppService } from '../app.service';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
import { NameRendererComponent } from '../name-renderer/name-renderer.component';
import { StatusRendererComponent } from '../status-renderer/status-renderer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  pageInfo: ApplicationsPerPage | null = null;
  selectedCategoryForSearch: string = 'Job';
  frameworkComponents = {
    nameRendererComponent: NameRendererComponent,
    statusRendererComponent: StatusRendererComponent,
    customHeader: CustomHeaderComponent,
  };
  columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
      cellRenderer: 'nameRendererComponent',
    },
    { headerName: 'Phone', field: 'phone' },
    {
      headerName: 'Job',
      valueGetter: (params) => params.data.__job?.title ?? '',
    },
    {
      headerName: 'Status',
      cellRenderer: 'statusRendererComponent',
      minWidth: 300,
      comparator: (
        valueA: any,
        valueB: any,
        nodeA: RowNode,
        nodeB: RowNode,
        isInverted: boolean
      ): number => {
        return nodeA.data.created_at > nodeB.data.created_at ? 1 : -1;
      },
    },
  ];
  defaultColDef = {
    resizable: true,
    sortable: true,
  };

  rowData: Application[] = [];

  get isFirstPage(): boolean {
    return (this.pageInfo?.curPage ?? 1) === 1;
  }

  get isLastPage(): boolean {
    return (this.pageInfo?.pageTotal ?? 1) === (this.pageInfo?.curPage ?? 1);
  }

  constructor(
    private crudService: AppService,
    private router: Router,
    private dataService: AppDataService
  ) {}

  async ngOnInit(): Promise<void> {
    let homeProperties = this.dataService.getHomeProperties();
    this.pageInfo = await this.crudService.getAllApplications(
      homeProperties.currentPage,
      homeProperties.sortedByColumn,
      homeProperties.orderedBy
    );
    this.rowData = this.pageInfo.items;
  }

  async sortChanged(event: SortChangedEvent) {
    const sortedColumns = event.columnApi
      .getColumnState()
      .filter((i) => i.sort)
      .map((i) => ({ id: i.colId, order: i.sort }));
    if (sortedColumns.length > 0) {
      this.pageInfo = await this.crudService.getAllApplications(
        this.pageInfo?.curPage ?? 1,
        sortedColumns[0].id,
        sortedColumns[0].order ?? 'asc'
      );
      this.dataService.getHomeProperties().sortedByColumn = sortedColumns[0].id;
      this.dataService.getHomeProperties().orderedBy =
        sortedColumns[0].order ?? 'asc';
    } else {
      this.pageInfo = await this.crudService.getAllApplications(
        this.pageInfo?.curPage ?? 1
      );
      this.dataService.getHomeProperties().sortedByColumn = null;
      this.dataService.getHomeProperties().orderedBy = null;
    }
    this.rowData = this.pageInfo.items;
  }

  async onChangePageClick(direction: Direction) {
    let pageNo = 0;
    let curPage = this.pageInfo?.curPage;
    if (!curPage) return;
    switch (direction) {
      case Direction.Current:
        pageNo = 1;
        return;
      case Direction.Previous:
        if (curPage == 1) return;
        pageNo = curPage - 1;
        break;
      case Direction.Next:
        if ((this.pageInfo?.curPage ?? 1) === (this.pageInfo?.pageTotal ?? 1))
          return;
        pageNo = curPage + 1;
        break;
      case Direction.First:
        pageNo = 1;
        break;
      case Direction.Last:
        pageNo = this.pageInfo?.pageTotal ?? 1;
        break;
    }
    if (pageNo == 0) return;
    this.pageInfo = await this.crudService.getAllApplications(
      pageNo,
      this.dataService.getHomeProperties().sortedByColumn,
      this.dataService.getHomeProperties().orderedBy
    );
    this.rowData = this.pageInfo.items;
    this.dataService.getHomeProperties().currentPage =
      this.pageInfo?.curPage ?? 1;
  }

  routeToApplication() {
    this.router.navigateByUrl('/applicant');
  }
}
