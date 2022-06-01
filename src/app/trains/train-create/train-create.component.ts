import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainModel } from '../store/trains.model';
import { Store, select } from '@ngrx/store';
import { trainCreateAction } from '../store/trains.actions';
import { Observable } from 'rxjs';
import { selectTrains } from '../store/trains.selectors';

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

  ngOnInit() {
    this.trainForm = this.formBuilder.group({
      serialNumber: '',
      manufactureYear: '',
      trackNumber: '',
      owner: '',
      site: '',
    });
  }

  onSubmit(trainData: any) {
    trainData.deleted = false;
    alert('Form submitted:\n' + JSON.stringify(trainData));
    this.store.dispatch(trainCreateAction(trainData));
    this.trainForm.reset();
    this.router.navigate(['/trains']);
  }
}
