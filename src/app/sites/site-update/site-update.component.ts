import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteModel } from '../store/sites.model';
import { Store, select } from '@ngrx/store';
import { siteCreateAction } from '../store/sites.actions';
import { Observable } from 'rxjs';
import { selectSites } from '../store/sites.selectors';

@Component({
  selector: 'app-site-update',
  templateUrl: './site-update.component.html',
  styleUrls: ['./site-update.component.css']
})
export class SiteUpdateComponent implements OnInit {

  siteForm: FormGroup;
  //sites$: Observable<SiteModel[]> = this.store.pipe(select(selectSites));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.siteForm = this.formBuilder.group({
      siteId: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      owner: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      code: [0, [Validators.required, Validators.maxLength(5)]],
      deleted: [false]
    });
  }

  onSubmit(siteData: any) {
    siteData.deleted = false;
    alert('Form submitted:\n' + JSON.stringify(siteData));
    this.store.dispatch(siteCreateAction(siteData));
    this.siteForm.reset();
    this.router.navigate(['/sites']);
  }

  get name() { return this.siteForm.get('name'); }
  get owner() { return this.siteForm.get('owner'); }
  get address() { return this.siteForm.get('address'); }
  get code() { return this.siteForm.get('code'); }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'Adjon meg egy értéket!';
      if (this.name.hasError('maxlength')) return 'Legfeljebb 50 karaktert adjon meg!';
    }
    return '';
  }

  getOwnerErrorMessage() {
    if (this.owner.dirty || this.owner.touched) {
      if (this.owner.hasError('required')) return 'Adjon meg egy értéket!';
      if (this.owner.hasError('maxlength')) return 'Legfeljebb 10 karaktert adjon meg!';
    }
    return '';
  }

  getAddressErrorMessage() {
    if (this.address.dirty || this.address.touched) {
      if (this.address.hasError('required')) return 'Adjon meg egy értéket!';
      if (this.address.hasError('maxlength')) return 'Legfeljebb 50 karaktert adjon meg!';
    }
    return '';
  }

  getCodeErrorMessage() {
    if (this.code.dirty || this.code.touched) {
      if (this.code.hasError('required')) return 'Adjon meg egy értéket!';
      if (this.code.hasError('maxlength')) return 'Legfeljebb 5 számot adjon meg!';
    }
    return '';
  }
}