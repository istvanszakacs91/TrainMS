import { createAction, props } from '@ngrx/store';
import { Site } from '../../data/sites.data';
import { SiteModel } from './sites.model';

export enum SiteActionTypes {
  sitesRequested = '[Sites] Sites Requested',
  sitesLoaded = '[Sites] Sites Loaded',
  siteCreate = '[Sites] Site Create',
  siteCreated = '[Sites] Site Created',
  siteDelete = '[Sites] Site Delete',
}

export const sitesRequested = createAction(SiteActionTypes.sitesRequested);

export const sitesLoaded = createAction(
  SiteActionTypes.sitesLoaded,
  props<{ sites: Site[] }>()
);

export const siteCreate = createAction(
  SiteActionTypes.siteCreate,
  props<{ site: SiteModel }>()
);

export const siteCreated = createAction(
  SiteActionTypes.siteCreated,
  props<{ site: SiteModel }>()
);

export const siteDelete = createAction(
  SiteActionTypes.siteDelete,
  props<{ siteId }>()
);
