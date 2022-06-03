import { createReducer, on, Action } from '@ngrx/store';
import { SiteModel } from './sites.model';
import { sitesLoadedAction, siteCreateAction, siteLoadedAction, siteDeleteAction } from './sites.actions';

// string contast for the feature to register the feature store
export const sitesFeatureKey = 'sitesFeature';

export interface SitesFeatureState {
  sites: Array<SiteModel>;
}

// initial state for the feature
export const initialState: SitesFeatureState = {
  sites: []
};

//one reducer based on initial state and actions defined earlier
//on: melyik eseményre hogyan reagál: megkapja az aktuális állapotot, utána veszővel felsorolva kapja a propertyket: vasúti koxsik listáját kapja és ezzel tér vissza.
export const sitesReducer = createReducer(
  initialState,
  on(siteLoadedAction, (state, {site}) => ({...state, loadedSite: site})),
  on(sitesLoadedAction, (state, {sites}) => ({...state, sites})),
  on(siteCreateAction, (state) => ({...state})),
  on(siteDeleteAction, (state, {siteId}) => ({...state, loading: true, sites: state.sites.filter(s => s.siteId !== siteId)
  }))
);
