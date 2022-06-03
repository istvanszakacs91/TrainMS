import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { SitesListComponent } from './sites-list/sites-list.component';
import { SitesComponent } from './sites/sites.component';
import { SiteCreateComponent } from './site-create/site-create.component';
import { SiteUpdateComponent } from './site-update/site-update.component';

const routes: Routes = [
  {
    path: '',
    component: SitesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: SitesListComponent,
          },
          {
            path: 'details/:siteId',
            component: SiteDetailsComponent,
          },
          {
            path: 'edit/:siteId',
            component: SiteUpdateComponent,
          },
          {
            path: 'create',
            component: SiteCreateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/sites', pathMatch: 'full' },
  { path: '**', component: SitesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesRoutingModule {}
