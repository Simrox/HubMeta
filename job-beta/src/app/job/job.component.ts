import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';
import { Job, Category, Application } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  categories: Category[] = [];
  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    type: ['', [Validators.required, Validators.maxLength(100)]],
    location: '',
    category: ['', Validators.required],
    description: ['', Validators.maxLength(255)],
  });

  constructor(
    private formBuilder: FormBuilder,
    private crudService: AppService,
    private propertiesService: AppDataService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.categories = await this.crudService.getAllCategories();
  }

  onLocationClicked() {}

  get isValid(): boolean {
    if (
      this.form.controls['title'].valid &&
      this.form.controls['category'].valid &&
      this.form.controls['type'].valid
    )
      return true;
    return false;
  }

  async onSubmit() {
    const job: Job = {
      id: 0,
      category: this.form.controls['category'].value,
      created_at: new Date().getTime(),
      description: '',
      location: '',
      title: this.form.controls['title'].value,
      type: this.form.controls['type'].value,
    };
    const applied = await this.crudService.addJob(job);
    if (applied.id) {
      this.propertiesService.getApplicationProperties().job_id = applied.id;
      this.router.navigateByUrl('/applicant');
    }
  }
}
