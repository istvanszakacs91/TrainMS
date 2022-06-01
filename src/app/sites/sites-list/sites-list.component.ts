import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SitesService } from '../sites.service';
import { selectSites } from '../store/sites.selectors';
import { Store, select } from '@ngrx/store';
import { SiteModel } from '../store/sites.model';
import {sitesRequested, sitesLoaded, siteDelete} from '../store/sites.actions';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css'],
})

export class SitesListComponent implements OnInit {
  displayedColumns: string[] = ['siteId', 'name', 'owner', 'address', 'code'];

  constructor(private sitesService: SitesService, private store: Store) {}

  // sites observable egy selector, amire feliratkoztunk
  //sites: any[] = [];
  //sitesSub: Subscription;
  sites$: Observable<SiteModel[]> = this.store.pipe(select(selectSites));

  ngOnInit() {
    //this.sitesSub = this.sitesService.getSites().subscribe((result) => (this.sites = result));
    this.store.dispatch(sitesRequested());
    this.sites$.subscribe((tr) => console.log('SITES', tr));
  }

  /*onDeleteSite(siteId: number): void {
    this.sitesService.deleteSite(siteId).subscribe(res => {
      this.store.dispatch(siteDelete({siteId}));
    });
  }
  /*ngOnDestroy() {
    if (this.sitesSub) this.sitesSub.unsubscribe();
  }*/
}
