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

import { TrainsListComponent } from './trains-list/trains-list.component';
import { TrainsService } from './trains.service';
import * as fromTrains from './store/trains.reducer';
import { MatTableModule } from '@angular/material/table';
import { TrainsRoutingModule } from './trains-routing.module';
import { TrainsComponent } from './trains/trains.component';
import { TrainCreateComponent } from './train-create/train-create.component';
import { CommonModule } from '@angular/common';
import { TrainEffects } from './store/trains.effects';
import { TrainsUpdateComponent } from './trains-update/trains-update.component';
import { FormatterPipe } from '../pipes/formatter.pipe';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromTrains.trainsFeatureKey,
      fromTrains.trainsReducer
    ),
    EffectsModule.forFeature([TrainEffects]),
    CommonModule,
    RouterModule,
    TrainsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatInputModule /*,
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
    TrainsComponent,
    TrainsListComponent,
    TrainCreateComponent,
    TrainsUpdateComponent,
    FormatterPipe,
  ],
  providers: [TrainsService],
})
export class TrainsModule {}
