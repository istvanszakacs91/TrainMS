import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../data/sites.data';
import { RequestService } from '../request.service';
import { SiteModel } from './store/sites.model';
import { TrainsService } from '../trains/trains.service';
import { map, exhaustMap } from 'rxjs/operators';

const SITES_URL = 'api/sites';

@Injectable()
export class SitesService {
  constructor(private requestService: RequestService,
              private trainsService: TrainsService) {}

  getSites(): Observable<Site[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Site[]>(SITES_URL, httpOptions);
  }

  getSite(siteId): Observable<any> {
    return this.requestService.get(`${SITES_URL}/${siteId}`);
  }

  createSite(site: SiteModel): Observable<any> {
    return this.requestService.post(`${SITES_URL}/`, site);
  }

  updateSite(site: SiteModel): Observable<any> {
    return this.requestService.put(`${SITES_URL}/`, site);
  }

  deleteSite(site: SiteModel): Observable<any> {
    return this.trainsService.getTrains().pipe(
      exhaustMap(res => {
        if(res.filter(t => t.siteId === site.siteId).length > 0){
          throw new Error('A telephely nem törölhető!');
        }
        site = Object.assign({}, site, {deleted: true});
        return this.updateSite(site);
      })
    );
  }
}
