import { Site } from '../../data/sites.data';

export class SiteModel implements Site {
  siteId: number;
  name: string;
  owner: string;
  address: string;
  code: number;
  deleted: boolean;
}
