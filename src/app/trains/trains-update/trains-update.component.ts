import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectLoadedTrain } from '../store/trains.selectors';
import { trainsLoadedAction, trainUpdateAction, trainRequestedAction } from '../store/trains.actions';
import { map } from 'rxjs/operators';
import {selectSites} from "../../sites/store/sites.selectors";
import {sitesRequestedAction} from "../../sites/store/sites.actions";
import { SiteModel } from '../../sites/store/sites.model';

@Component({
  selector: 'app-trains-update',
  templateUrl: './trains-update.component.html',
  styleUrls: ['./trains-update.component.css']
})
export class TrainsUpdateComponent implements OnInit {

  trainsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store) { }

  //sites$ = this.store.pipe(select(selectSites)).pipe(map((sites: SiteModel[]) => sites.filter((site: SiteModel) => site.deleted === false)));

  ngOnInit(): void {
    //this.store.dispatch(sitesRequestedAction());

    this.route.paramMap.pipe(
      map(params => {
        return this.store.dispatch(trainRequestedAction({trainId: params.get('trainId')}))})
    ).subscribe();
    this.store.pipe(select(selectLoadedTrain)).subscribe(
      train => {
        console.log('TRAIN', train);
        console.log('TRAINSFORM', this.trainsForm);
        if(train && this.trainsForm) {
          this.trainsForm.controls['trainId'].setValue(train.trainId);
          this.trainsForm.controls['manufactureYear'].setValue(train.manufactureYear);
          this.trainsForm.controls['trackNumber'].setValue(train.trackNumber);
          this.trainsForm.controls['owner'].setValue(train.owner);
          this.trainsForm.controls['siteId'].setValue(train.siteId);
          this.trainsForm.controls['site'].setValue(train.site);
        }
      }
    );
    this.trainsForm = this.formBuilder.group({
      trainId: ['', [Validators.required, Validators.maxLength(5)]],
      manufactureYear: ['1950', [Validators.required, Validators.min(1950)]],
      trackNumber: ['', [Validators.required, Validators.maxLength(17)]],
      owner: ['',[Validators.required, Validators.maxLength(10)]],
      'siteId': [''],
      'deleted':[false]
    });
  }

  onSubmit(trainData: any) {
    console.log('Traindata log:', trainData);
    this.store.dispatch(trainUpdateAction(trainData));
    this.trainsForm.reset();
    this.router.navigate(['/trains']);
  }

  get trainId() { return this.trainsForm.get('trainId'); }
  get manufactureYear() { return this.trainsForm.get('manufactureYear'); }
  get trackNumber() { return this.trainsForm.get('trackNumber'); }
  get owner() { return this.trainsForm.get('owner'); }

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