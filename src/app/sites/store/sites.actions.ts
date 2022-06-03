import { createAction, props } from '@ngrx/store';
import { Site } from '../../data/sites.data';
import { SiteModel } from './sites.model';

export enum SiteActionTypes {
  siteRequested = '[Sites] Site Requested',
  sitesRequested = '[Sites] Sites Requested',
  siteLoaded = '[Sites] Site Loaded',
  sitesLoaded = '[Sites] Sites Loaded',
  siteCreate = '[Sites] Site Create',
  siteCreated = '[Sites] Site Created',
  siteUpdate = '[Sites] Site Update',
  siteUpdated = '[Sites] Site Updated',
  siteDelete = '[Sites] Site Delete',
}

export const siteRequestedAction = createAction(
  SiteActionTypes.siteRequested,
  props<{ siteId: string }>()
);

export const sitesRequestedAction = createAction(
  SiteActionTypes.sitesRequested
);

export const siteLoadedAction = createAction(
  SiteActionTypes.siteLoaded,
  props<{ site: SiteModel }>()
);

export const sitesLoadedAction = createAction(
  SiteActionTypes.sitesLoaded,
  props<{ sites: Site[] }>()
);

export const siteCreateAction = createAction(
  SiteActionTypes.siteCreate,
  props<{ site: SiteModel }>()
);

export const siteCreatedAction = createAction(
  SiteActionTypes.siteCreated,
  props<{ site: SiteModel }>()
);

export const siteUpdateAction = createAction(
  SiteActionTypes.siteUpdate,
  props<{ site: SiteModel }>()
);
export const siteUpdatedAction = createAction(
  SiteActionTypes.siteUpdated,
  props<{ site: SiteModel }>()
);

export const siteDeleteAction = createAction(
  SiteActionTypes.siteDelete,
  props<{ site: SiteModel }>()
);