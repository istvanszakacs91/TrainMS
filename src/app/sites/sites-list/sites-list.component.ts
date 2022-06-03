import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SitesService } from '../sites.service';
import { selectSites } from '../store/sites.selectors';
import { Store, select } from '@ngrx/store';
import { SiteModel } from '../store/sites.model';
import {sitesRequestedAction, sitesLoadedAction, siteDeleteAction} from '../store/sites.actions';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css'],
})

export class SitesListComponent implements OnInit {
  displayedColumns: string[] = ['siteId', 'name', 'owner', 'address', 'code', 'actions'];

  constructor(private sitesService: SitesService, private store: Store) {}

  // sites observable egy selector, amire feliratkoztunk
  //sites: any[] = [];
  //sitesSub: Subscription;
  sites$: Observable<SiteModel[]> = this.store.pipe(select(selectSites));

  ngOnInit() {
    //this.sitesSub = this.sitesService.getSites().subscribe((result) => (this.sites = result));
    this.store.dispatch(sitesRequestedAction());
    this.sites$.subscribe((tr) => console.log('SITES', tr));
  }

  onDeleteSite(site: SiteModel) {
    this.store.dispatch(siteDeleteAction({siteId:site.siteId}));
  }

  /*ngOnDestroy() {
    if (this.sitesSub) this.sitesSub.unsubscribe();
  }*/
}
