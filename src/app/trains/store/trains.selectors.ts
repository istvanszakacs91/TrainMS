import { AppState } from '../../app.module';
import { trainsFeatureKey, TrainsFeatureState } from './trains.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TrainModel } from './trains.model';

// createFeatureSelector: kiveszi az adott kulcsú elemet az Appstateből, vonatok tömbje
export const selectFeature = createFeatureSelector<AppState, TrainsFeatureState>(trainsFeatureKey);

// 1 darab selector, ami a vonatkocsikat fogja kiválasztani
export const selectTrains = createSelector(
  selectFeature,
  //projektor fv: megkapja a kiválasztott állapotot, 
  (state: TrainsFeatureState) => {
    return state.trains;
  }
)

export const selectLoadedTrain = createSelector(
  selectFeature,
  (state: TrainsFeatureState) => {
    return state.loadedTrain;
  }
)

export const selectNextTrainId = createSelector(
  selectTrains,
  (trains: TrainModel[]) => {
    return trains.length + 1;
  }
)