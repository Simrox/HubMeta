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
export class AppService {
  constructor(private httpClient: HttpClient) {}

  getAllApplications(
    page?: number,
    sortBy?: string | null,
    orderBy?: string | null
  ): Promise<ApplicationsPerPage> {
    let baseQuery = `https://x8ki-letl-twmt.n7.xano.io/api:bFKqZj63/application?external`;
    if (page) {
      baseQuery += `[page]=${page}`;
    }
    if (sortBy) {
      if (page) baseQuery += '&';
      baseQuery += `external[sort][sortBy]=${sortBy}`;
    }
    if (orderBy) {
      if (page || sortBy) baseQuery += '&';
      baseQuery += `external[sort][orderBy]=${orderBy}`;
    }
    return firstValueFrom(this.httpClient.get<ApplicationsPerPage>(baseQuery));
  }

  getAllCategories(): Promise<Category[]> {
    return firstValueFrom(
      this.httpClient.get<Category[]>(
        'https://x8ki-letl-twmt.n7.xano.io/api:bFKqZj63/category'
      )
    );
  }

  getAllJobs(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(
        'https://x8ki-letl-twmt.n7.xano.io/api:bFKqZj63/job'
      )
    );
  }

  addApplicant(application: Application) {
    return firstValueFrom(
      this.httpClient.post<Application>(
        'https://x8ki-letl-twmt.n7.xano.io/api:bFKqZj63/application',
        application
      )
    );
  }

  addJob(job: Job): Promise<Job> {
    return firstValueFrom(
      this.httpClient.post<Job>(
        'https://x8ki-letl-twmt.n7.xano.io/api:bFKqZj63/job',
        job
      )
    );
  }
}
