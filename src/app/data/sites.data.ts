export interface Site {
  siteId: number;
  name: string;
  owner: string;
  address: string;
  code: number;
  deleted: boolean
}

export class SiteTable {
  public static sites: Site[] = [
    {
      siteId: 1,
      name: 'Békéscsaba',
      owner: 'MÁV',
      address: '5600 Békéscsaba, Tábor u. 3114/10 hrsz.',
      code: 56001,
      deleted: false
    },
    {
      siteId: 2,
      name: 'Budapest',
      owner: 'DB',
      address: '1103 Budapest, Kőér u. 2/d.',
      code: 11032,
      deleted: false
    },
    {
      siteId: 3,
      name: 'Debrecen',
      owner: 'CHTrains',
      address: '4000 Debrecen, 15008 hrsz.',
      code: 40003,
      deleted: false
    },
    {
      siteId: 4,
      name: 'Dombóvár',
      owner: 'MÁV',
      address: '7200 Dombóvár, Kandó K. u. 5.',
      code: 72004,
      deleted: false
    },
    {
      siteId: 5,
      name: 'Hatvan',
      owner: 'MÁV',
      address: '3000 Hatvan, Hősmagyar út 6.',
      code: 30005,
      deleted: false
    },
  ];
}
