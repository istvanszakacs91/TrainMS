import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { TrainModel } from '../store/trains.model';
import { Store, select } from '@ngrx/store';
import { trainCreateAction } from '../store/trains.actions';
import { Observable } from 'rxjs';
import { selectTrains } from '../store/trains.selectors';
import { sameValuesValidator } from '../../validators/same-values.validator';
import {selectSites} from "../../sites/store/sites.selectors";
import {sitesRequestedAction} from "../../sites/store/sites.actions";
import { SiteModel } from '../../sites/store/sites.model';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-train-create',
  templateUrl: './train-create.component.html',
  styleUrls: ['./train-create.component.css'],
})
export class TrainCreateComponent implements OnInit {
  trainForm: FormGroup;
  //trains$: Observable<TrainModel[]> = this.store.pipe(select(selectTrains));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  //sites$ = this.store.pipe(select(selectSites)).pipe(map((sites: SiteModel[]) => sites.filter((site: SiteModel) => site.deleted === false)));

  ngOnInit() {

    //this.store.dispatch(sitesRequestedAction());

    this.trainForm = this.formBuilder.group({
      trainId: ['', [Validators.required, Validators.maxLength(5)]],
      manufactureYear: ['1950', [Validators.required, Validators.min(1950)]],
      trackNumber: ['', [Validators.required, Validators.maxLength(17)]],
      owner: ['',[Validators.required, Validators.maxLength(10)]],
      'siteId': [''],
      'deleted':[false]
    });
  }

  onSubmit(trainData: any) {
    trainData.deleted = false;
    alert('Form submitted:\n' + JSON.stringify(trainData));
    this.store.dispatch(trainCreateAction(trainData));
    this.trainForm.reset();
    this.router.navigate(['/trains']);
  }

  get trainId() { return this.trainForm.get('trainId'); }
  get manufactureYear() { return this.trainForm.get('manufactureYear'); }
  get trackNumber() { return this.trainForm.get('trackNumber'); }
  get owner() { return this.trainForm.get('owner'); }

  getTrainIdErrorMessage() {
    if (this.trainId.dirty || this.trainId.touched) {
      if (this.trainId.hasError('required')) return 'Adjon meg egy értéket!';
      if (this.trainId.hasError('maxlength')) return 'Legfeljebb 5 karaktert adjon meg!';
    }
    return '';
  }

  getManufactureYearErrorMessage() {
    if (this.manufactureYear.dirty || this.manufactureYear.touched) {
      if (this.manufactureYear.hasError('required')) return 'Adjon meg egy értéket!';
      if (this.manufactureYear.hasError('min')) return 'Az értéknek nagyobbnak kell lennie, mint 1950!';
    }
    return '';
  }

  getTrackNumberErrorMessage() {
    if (this.trackNumber.dirty || this.trackNumber.touched) {
      if (this.trackNumber.hasError('required')) return 'Adjon meg egy értéket!';
      if (this.trackNumber.hasError('maxlength')) return 'Legfeljebb 17 karaktert adjon meg!';
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

}