import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TrainCreateComponent } from './train-create/train-create.component';
import { TrainsListComponent } from './trains-list/trains-list.component';
import { TrainsUpdateComponent } from './trains-update/trains-update.component';
import { TrainsComponent } from './trains/trains.component';

const routes: Routes = [
  {
    path: '',
    component: TrainsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: TrainsListComponent,
          },
          {
            path: 'edit/:trainId',
            component: TrainsUpdateComponent,
          },
          {
            path: 'create',
            component: TrainCreateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/trains', pathMatch: 'full' },
  { path: '**', component: TrainsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainsRoutingModule {}
