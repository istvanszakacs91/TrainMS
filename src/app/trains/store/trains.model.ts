import { Train } from '../../data/trains.data';

export class TrainModel implements Train {
  trainId: string;
  manufactureYear: number;
  trackNumber: string;
  owner: string;
  siteId: number;
  site?: string;
  deleted: boolean;
}
