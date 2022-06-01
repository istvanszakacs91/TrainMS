import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SitesService } from '../sites.service';
import { SiteActionTypes, sitesRequested, sitesLoaded, siteCreate, siteCreated } from './sites.actions';
import { selectNextSiteId } from './sites.selectors';
import { EMPTY } from 'rxjs';

@Injectable()
export class SiteEffects {
  constructor(
    private actions$: Actions,
    private sitesService: SitesService,
    private store: Store
  ) {}


  loadSites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteActionTypes.sitesRequested),
      mergeMap((action) => {
        return this.sitesService.getSites().pipe(
          map((sites) => sitesLoaded({ sites })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createSite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteActionTypes.siteCreate),
      concatLatestFrom((action) => this.store.select(selectNextSiteId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.sitesService.createSite(action).pipe(
          map((item: any) => {
            return siteCreated({
              site: {
                siteId,
                serialNumber: action.serialNumber,
                manufactureYear: action.manufactureYear,
                trackNumber: action.trackNumber,
                owner: action.owner,
                site: action.site,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
