import { createReducer, on, Action } from '@ngrx/store';
import { TrainModel } from './trains.model';
import { trainLoadedAction, trainsLoadedAction, trainCreateAction, trainDeleteAction } from './trains.actions';

// string contast for the feature to register the feature store
export const trainsFeatureKey = 'trainsFeature';

export interface TrainsFeatureState {
  trains: Array<TrainModel>;
  loadedTrain: TrainModel;
}

// initial state for the feature
export const initialState: TrainsFeatureState = {
  trains: [],
  loadedTrain: null
};

//one reducer based on initial state and actions defined earlier
//on: melyik eseményre hogyan reagál: megkapja az aktuális állapotot, utána veszővel felsorolva kapja a propertyket: vasúti koxsik listáját kapja és ezzel tér vissza.
export const trainsReducer = createReducer(
  initialState,
  on(trainsLoadedAction, (state, {trains}) => ({...state, trains})),
  on(trainCreateAction, (state) => ({...state})),
  on(trainLoadedAction, (state, {train}) => ({
    ...state, 
    loadedTrain: train
  }))
);
