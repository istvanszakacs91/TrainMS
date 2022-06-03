import { SiteTable } from './sites.data';

export interface Train {
  trainId: string;
  manufactureYear: number;
  trackNumber: string;
  owner: string;
  siteId: number;
  site?: string;
  deleted: boolean;
}

export class TrainTable {
  private static _trains: Train[] = [
    {
      trainId: 'Cd12S',
      manufactureYear: 1986,
      trackNumber: '50 55 20-05 555-7'.replace(/\s/g, ''),
      owner: 'MÁV',
      siteId: 1,
      deleted: false,
    },
    {
      trainId: 'Dv32T',
      manufactureYear: 1990,
      trackNumber: '20 45 27-00 444-2'.replace(/\s/g, ''),
      owner: 'DB',
      siteId: 2,
      deleted: false,
    },
    {
      trainId: 'Gz87V',
      manufactureYear: 1979,
      trackNumber: '65 22 87-01 333-1'.replace(/\s/g, ''),
      owner: 'CHTrains',
      siteId: 3,
      deleted: false,
    },
    {
      trainId: 'Cc34S',
      manufactureYear: 1967,
      trackNumber: '25 62 83-61 777-9'.replace(/\s/g, ''),
      owner: 'CHTrains',
      siteId: 4,
      deleted: false,
    },
    {
      trainId: 'Ki54P',
      manufactureYear: 2001,
      trackNumber: '77 99 83-11 555-7'.replace(/\s/g, ''),
      owner: 'MÁV',
      siteId: 1,
      deleted: false,
    },
    {
      trainId: 'OP32M',
      manufactureYear: 1965,
      trackNumber: '92 99 36-49 888-5'.replace(/\s/g, ''),
      owner: 'DB',
      siteId: 5,
      deleted: false,
    },
  ];

  public static trains: Train[] = TrainTable._trains.map((train) => {
    const site = SiteTable.sites.find((s) => s.siteId === train.siteId);

    train.site = site.name;
    console.log("TRAIN-SITE", train);
    return train;
  });
}
