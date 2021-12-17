import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NameRendererComponent } from './name-renderer/name-renderer.component';
import { StatusRendererComponent } from './status-renderer/status-renderer.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobComponent } from './job/job.component';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NameRendererComponent,
    StatusRendererComponent,
    ApplicantComponent,
    JobComponent,
    CustomHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
