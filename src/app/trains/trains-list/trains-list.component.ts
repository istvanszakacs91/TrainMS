import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrainsService } from '../trains.service';
import { selectTrains } from '../store/trains.selectors';
import { Store, select } from '@ngrx/store';
import { TrainModel } from '../store/trains.model';
import {trainsRequestedAction, trainDeleteAction, trainUpdatedAction} from '../store/trains.actions';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Train } from '../../data/trains.data';

@Component({
  selector: 'app-trains-list',
  templateUrl: './trains-list.component.html',
  styleUrls: ['./trains-list.component.css'],
})
export class TrainsListComponent implements OnInit {
  displayedColumns: string[] = ['trainId', 'trackNumber', 'site', 'actions'];

  constructor(private trainsService: TrainsService, 
              private store: Store) {}

  // trains observable egy selector, amire feliratkoztunk
  //trains: any[] = [];
  //trainsSub: Subscription;
  trains$: Observable<TrainModel[]> = this.store.pipe(select(selectTrains));
  private train: Observable<TrainModel>;

  ngOnInit(): void {
    //this.trainsSub = this.trainsService.getTrains().subscribe((result) => (this.trains = result));
    this.store.dispatch(trainsRequestedAction());
    this.trains$.subscribe((tr) => console.log('TRAINS', tr));
  }

  onDeleteTrain(train: TrainModel) {
    this.store.dispatch(trainDeleteAction({trainId:train.trainId}));
  }

  /*ngOnDestroy() {
    if (this.trainsSub) this.trainsSub.unsubscribe();
  }*/
}
