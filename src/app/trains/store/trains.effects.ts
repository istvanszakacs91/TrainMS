import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TrainsService } from '../trains.service';
import {
  TrainActionTypes,
  trainRequestedAction,
  trainsRequestedAction,
  trainLoadedAction,
  trainsLoadedAction,
  trainCreateAction,
  trainCreatedAction,
  trainUpdateAction,
  trainDeleteAction,
} from './trains.actions';
import { selectNextTrainId } from './trains.selectors';
import { EMPTY } from 'rxjs';

@Injectable()
export class TrainEffects {
  constructor(
    private actions$: Actions,
    private trainsService: TrainsService,
    private store: Store
  ) {}

  loadTrains$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainActionTypes.trainsRequested),
      mergeMap(() => {
        return this.trainsService.getTrains().pipe(
          map((trains) => trainsLoadedAction({ trains })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadTrain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainActionTypes.trainRequested),
      switchMap((action) =>
        this.trainsService.getTrain(action.trainId).pipe(
          map((train) => trainLoadedAction({ train })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  createTrain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainActionTypes.trainCreate),
      concatLatestFrom((action) => this.store.select(selectNextTrainId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.trainsService.createTrain(action).pipe(
          map((item: any) => {
            return trainCreatedAction({
              train: {
                trainId: action.trainId,
                manufactureYear: action.manufactureYear,
                trackNumber: action.trackNumber,
                owner: action.owner,
                siteId: action.siteId,
                site: '',
                deleted: false,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  updateTrain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainActionTypes.trainUpdate),
      switchMap((action) => {
        console.log('ACTION', action);
        return this.trainsService.updateTrain(action).pipe(
          map((item: any) => {
            return trainUpdateAction({
              train: {
                trainId: action['trainId'],
                manufactureYear: action['manufactureYear'],
                trackNumber: action['trackNumber'],
                owner: action['owner'],
                siteId: action['siteId'],
                deleted: false,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  deleteTrain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainActionTypes.trainDelete),
      switchMap((action: any) => {
        return this.trainsService.deleteTrain(action.trainId).pipe(
          map((item: any) => {
            return trainUpdateAction({
              train: {
                deleted: false,
              },
            });
          }),
          catchError((err) => {
            console.error('ERROR', err);
            return EMPTY;
          })
        );
      })
    )
  );
}
