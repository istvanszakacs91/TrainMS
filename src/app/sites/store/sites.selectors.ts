import { AppState } from '../../app.module';
import { sitesFeatureKey, SitesFeatureState } from './sites.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SiteModel } from './sites.model';

// createFeatureSelector: kiveszi az adott kulcsú elemet az Appstateből, vonatok tömbje
export const selectFeature = createFeatureSelector<AppState, SitesFeatureState>(sitesFeatureKey);

// 1 darab selector, ami a vonatkocsikat fogja kiválasztani
export const selectSites = createSelector(
  selectFeature,
  //projektor fv: megkapja a kiválasztott állapotot, 
  (state: SitesFeatureState) => {
    return state.sites;
  }
)

export const selectLoadedSite = createSelector(
  selectFeature,
  (state: SitesFeatureState) => {
    return state.loadedSite;
  }
)

export const selectNextSiteId = createSelector(
  selectSites,
  (sites: SiteModel[]) => {
    return sites.length + 1;
  }
)