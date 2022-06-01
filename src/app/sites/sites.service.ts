import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../data/sites.data';
import { RequestService } from '../request.service';
import { SiteModel } from './store/sites.model';

const TRAIN_URL = 'api/sites';

@Injectable()
export class SitesService {
  constructor(private requestService: RequestService) {}

  getSites(): Observable<Site[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Site[]>(TRAIN_URL, httpOptions);
  }

  getSite(siteId): Observable<any> {
    return this.requestService.get(`${TRAIN_URL}/${siteId}`);
  }

  createSite(site: SiteModel): Observable<any> {
    return this.requestService.post(`${TRAIN_URL}/`, site);
  }

  deleteSite(siteId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const url = `${TRAIN_URL}/${siteId}`;
    return this.requestService.delete(url, httpOptions);
  }
}
