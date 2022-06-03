import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { SiteEffects } from './store/sites.effects';
import { SitesListComponent } from './sites-list/sites-list.component';
import { SitesService } from './sites.service';
import * as fromSites from './store/sites.reducer';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites/sites.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { SiteCreateComponent } from './site-create/site-create.component';
import { SiteUpdateComponent } from './site-update/site-update.component';
import { TrainsModule } from '../trains/trains.module';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromSites.sitesFeatureKey,
      fromSites.sitesReducer
    ),
    EffectsModule.forFeature([SiteEffects]),
    CommonModule,
    RouterModule,
    SitesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    TrainsModule /*,
		MatMenuModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTooltipModule,
		MatDialogModule,
    MatDividerModule*/,
  ],
  declarations: [
    SitesComponent,
    SitesListComponent,
    SiteDetailsComponent,
    SiteCreateComponent,
    SiteUpdateComponent
  ],
  providers: [SitesService],
})
export class SitesModule {}
