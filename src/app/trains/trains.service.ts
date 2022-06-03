import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { Train } from '../data/trains.data';
import { RequestService } from '../request.service';
import { TrainModel } from './store/trains.model';

const TRAIN_URL = 'api/trains';

@Injectable()
export class TrainsService {
  constructor(private requestService: RequestService) {}

  getTrains(): Observable<Train[]> {
    return this.requestService.get<Train[]>(`${TRAIN_URL}/?deleted=false`);
  }

  getTrain(trainId: string): Observable<any> {
    return this.requestService.get(`${TRAIN_URL}/${trainId}`);
  }

  createTrain(train: TrainModel): Observable<any> {
    return this.requestService.post(`${TRAIN_URL}/`, train);
  }

  updateTrain(train: TrainModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.put(`${TRAIN_URL}/`, train);
  }

  deleteTrain(trainId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.delete(`${TRAIN_URL}/${trainId}`, httpOptions);
  }
}
