import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectLoadedTrain } from '../store/trains.selectors';
import { trainsLoadedAction, trainUpdateAction, trainRequestedAction } from '../store/trains.actions';
import { map } from 'rxjs/operators';

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

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => {
        return this.store.dispatch(trainRequestedAction({trainId: +params.get('trainId')}))})
    ).subscribe();
    this.store.pipe(select(selectLoadedTrain)).subscribe(
      train => {
        if(train && this.trainsForm) {
          this.trainsForm.controls.trainId.setValue(train.trainId);
          this.trainsForm.controls.serialNumber.setValue(train.serialNumber);
          this.trainsForm.controls.manufactureYear.setValue(train.manufactureYear);
          this.trainsForm.controls.trackNumber.setValue(train.trackNumber);
          this.trainsForm.controls.owner.setValue(train.owner);
          this.trainsForm.controls.siteId.setValue(train.siteId);
          this.trainsForm.controls.site.setValue(train.site);
        }
      }
    );
    this.trainsForm = this.formBuilder.group({
      'trainId': 0,
      'name': '',
      'serialNumber': '',
      'manufactureYear': 0,
      'trackNumber': '',
      'owner': '',
      'siteId': 0,
      'deleted': [false]
    });
  }

  onSubmit(trainData: any) {
    this.store.dispatch(trainUpdateAction(trainData));
    this.trainsForm.reset();
    this.router.navigate(['/trains']);
  }
}