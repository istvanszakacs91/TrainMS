import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteModel } from '../store/sites.model';
import { Store, select } from '@ngrx/store';
import { siteCreateAction } from '../store/sites.actions';
import { Observable } from 'rxjs';
import { selectSites } from '../store/sites.selectors';

@Component({
  selector: 'app-site-create',
  templateUrl: './site-create.component.html',
  styleUrls: ['./site-create.component.css'],
})
export class SiteCreateComponent implements OnInit {
  siteForm: FormGroup;
  //sites$: Observable<SiteModel[]> = this.store.pipe(select(selectSites));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.siteForm = this.formBuilder.group({
      siteId: '',
      name: '',
      owner: '',
      address: '',
      code: 0,
      deleted: false
    });
  }

  onSubmit(siteData: any) {
    siteData.deleted = false;
    alert('Form submitted:\n' + JSON.stringify(siteData));
    this.store.dispatch(siteCreateAction(siteData));
    this.siteForm.reset();
    this.router.navigate(['/sites']);
  }
}
