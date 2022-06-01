import { createReducer, on, Action } from '@ngrx/store';
import { SiteModel } from './sites.model';
import { sitesLoaded, siteCreate, siteDelete } from './sites.actions';

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
  on(sitesLoaded, (state, {sites}) => ({...state, sites})),
  on(siteCreate, (state) => ({...state})),
  //on(siteDelete, (state, { siteId }) => {
    //return {
      // kliens oldalon kiszűrjük a törölni kívánt vasúti kocsit
     // sites: state.sites.filter((tr) => tr.siteId !== siteId),
    //};
  //})
);
