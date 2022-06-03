import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SitesService } from '../sites.service';
import { SiteActionTypes, sitesRequestedAction, siteLoadedAction, sitesLoadedAction, siteCreateAction, siteCreatedAction, siteUpdateAction} from './sites.actions';
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
          map((sites) => sitesLoadedAction({ sites })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadSite$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.siteRequested),
    switchMap((action: any) => this.sitesService.getSite(action.siteId)
      .pipe(
        map(site => (siteLoadedAction({site}))),
        catchError(() => EMPTY)
      ))
    )
  );

  createSite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteActionTypes.siteCreate),
      concatLatestFrom((action: any) => this.store.select(selectNextSiteId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.sitesService.createSite(action).pipe(
          map((item: any) => {
            return siteCreatedAction({
              site: {
                siteId: action.siteId,
                name: action.name,
                owner: action.owner,
                address: action.address,
                code: action.code,
                deleted: false
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  updateSite$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.siteUpdate),
    switchMap((action) => {
      console.log("ACTION", action)
      return this.sitesService.updateSite(action).pipe(
        map((item: any) => {
          return siteUpdateAction({site: {
              siteId: action.siteId,
              name: action.name,
              owner: action.owner,
              address: action.address,
              code: action.code,
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  deleteSite$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.siteDelete),
    switchMap((action: any) => {
      return this.sitesService.deleteSite(action.siteId).pipe(
        map((item: any) => {
          return siteUpdateAction({site: {
            deleted: false
          }});
        }),
        catchError((err) => {
          console.error("ERROR", err);
          return EMPTY;
        })
      )
    })
  ))

}
