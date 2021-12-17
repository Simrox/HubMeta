import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';
import { Application, Job } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css'],
})
export class ApplicantComponent implements OnInit {
  properties: Partial<Application> =
    this.propertiesService.getApplicationProperties();
  form: FormGroup = this.formBuilder.group({
    fullName: [this.properties.name ?? '', Validators.required],
    email: [
      this.properties.email ?? '',
      [Validators.required, Validators.email],
    ],
    phone: [this.properties.phone ?? '', Validators.required],
    applicantStatus: this.properties.status ?? '',
    job: [this.properties.job_id ?? '', Validators.required],
    resume: this.properties.resume ?? '',
  });
  uploadedFile: any;
  jobs: Job[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private crudService: AppService,
    private propertiesService: AppDataService
  ) {}

  async ngOnInit(): Promise<void> {
    const allJobs = await this.crudService.getAllJobs();
    this.jobs = allJobs.items;
  }

  uploadedFileChanged(event: any) {
    this.uploadedFile = event.target.file;
  }

  get isValid(): boolean {
    if (
      !this.form.controls['fullName'].valid ||
      !this.form.controls['email'].valid ||
      !this.form.controls['phone'].valid ||
      !this.form.controls['job'].valid ||
      !this.form.controls['resume'].valid
    )
      return false;
    return true;
  }

  private getData(): Application {
    return {
      name: this.form.controls['fullName'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      status: this.form.controls['applicantStatus'].value,
      job_id: this.form.controls['job'].value,
      resume: this.uploadedFile,
      created_at: new Date().getTime(),
      id: 0,
      __job: null,
    };
  }

  async onSubmit() {
    const applied = await this.crudService.addApplicant(this.getData());
    this.propertiesService.setApplicationProperties({});
    if (applied.id) this.router.navigateByUrl('/home');
  }

  routeToAddJob() {
    this.propertiesService.setApplicationProperties(this.getData());
    this.router.navigateByUrl('/job');
  }
}
