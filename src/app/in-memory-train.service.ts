import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SiteTable } from './data/sites.data';
import { TrainTable } from './data/trains.data';

@Injectable()
export class InMemoryTrainService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const db = {
      trains: TrainTable.trains,
      sites: SiteTable.sites,
    };
    return db;
  }
}
