import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrainsService } from '../trains.service';
import { selectTrains } from '../store/trains.selectors';
import { Store, select } from '@ngrx/store';
import { TrainModel } from '../store/trains.model';
import {trainsRequestedAction, trainsLoadedAction, trainDeleteAction} from '../store/trains.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trains-list',
  templateUrl: './trains-list.component.html',
  styleUrls: ['./trains-list.component.css'],
})
export class TrainsListComponent implements OnInit {
  displayedColumns: string[] = ['trainId', 'serialNumber', 'trackNumber', 'site', 'delete'];

  constructor(private trainsService: TrainsService, 
              private store: Store) {}

  // trains observable egy selector, amire feliratkoztunk
  //trains: any[] = [];
  //trainsSub: Subscription;
  trains$: Observable<TrainModel[]> = this.store.pipe(select(selectTrains));

  ngOnInit() {
    //this.trainsSub = this.trainsService.getTrains().subscribe((result) => (this.trains = result));
    this.store.dispatch(trainsRequestedAction());
    this.trains$.subscribe((tr) => console.log('TRAINS', tr));
  }

  onDeleteTrain(train: TrainModel): void {
    this.store.dispatch(trainDeleteAction({train}));
  }

  /*ngOnDestroy() {
    if (this.trainsSub) this.trainsSub.unsubscribe();
  }*/
}
