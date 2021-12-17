import { Injectable } from '@angular/core';
import { firstValueFrom, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Application,
  ApplicationsPerPage,
  Category,
  HomeProperties,
  Job,
} from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private homeProperties: HomeProperties = {
    currentPage: 1,
  };

  private applicantProperties: Partial<Application> = {};

  constructor(private httpClient: HttpClient) {}

  getHomeProperties(): HomeProperties {
    return this.homeProperties;
  }

  getApplicationProperties(): Partial<Application> {
    return this.applicantProperties;
  }

  setApplicationProperties(properties: Partial<Application>) {
    this.applicantProperties = properties;
  }
}
