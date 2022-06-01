import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { trainsRequestedAction } from '../../trains/store/trains.actions';
import { TrainModel } from '../../trains/store/trains.model';
import { SitesService } from '../sites.service';
import { Store, select } from '@ngrx/store';
import { selectTrains } from '../../trains/store/trains.selectors';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css'],
})
export class SiteDetailsComponent implements OnInit {
  sites = [];
  site: any = {};

  constructor(private route: ActivatedRoute,
              private siteService: SitesService,
              private store: Store) {}

  trains$: Observable<TrainModel[]> = this.store.pipe(select(selectTrains));

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.siteService.getSite(+params.get('siteId')))
    )
    .subscribe(site => {
      this.site = site;
    });
    this.store.dispatch(trainsRequestedAction());
  }
}
