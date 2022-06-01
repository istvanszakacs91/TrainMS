import { createAction, props } from '@ngrx/store';
import { Train } from '../../data/trains.data';
import { TrainModel } from './trains.model';

export enum TrainActionTypes {
  trainsRequested = '[Trains] Trains Requested',
  trainRequested = '[Trains] Train Requested',
  trainLoaded = '[Trains] Train Loaded',
  trainsLoaded = '[Trains] Trains Loaded',
  trainCreate = '[Trains] Train Create',
  trainCreated = '[Trains] Train Created',
  trainUpdate ='[Trains] Train Update',
  trainUpdated ='[Trains] Train Updated',
  trainDelete = '[Trains] Train Delete',
  trainDeleted = '[Trains] Train Deleted',
}

export const trainsRequestedAction = createAction(
  TrainActionTypes.trainsRequested
);

export const trainRequestedAction = createAction(
  TrainActionTypes.trainRequested,
  props<{trainId: number}>()
);

export const trainLoadedAction = createAction(
  TrainActionTypes.trainLoaded,
  props<{ train: TrainModel }>()
);

export const trainsLoadedAction = createAction(
  TrainActionTypes.trainsLoaded,
  props<{ trains: TrainModel[] }>()
);

export const trainCreateAction = createAction(
  TrainActionTypes.trainCreate,
  props<{ train: TrainModel }>()
);

export const trainCreatedAction = createAction(
  TrainActionTypes.trainCreated,
  props<{ train: TrainModel }>()
);

export const trainUpdateAction = createAction(
  TrainActionTypes.trainUpdate,
  props<{train: TrainModel}>()
);
export const trainUpdatedAction = createAction(
  TrainActionTypes.trainUpdated,
  props<{train: TrainModel}>()
);

export const trainDeleteAction = createAction(
  TrainActionTypes.trainDelete,
  props<{ train: TrainModel }>()
);

export const trainDeletedAction = createAction(
  TrainActionTypes.trainDeleted,
  props<{ train: TrainModel }>()
);
