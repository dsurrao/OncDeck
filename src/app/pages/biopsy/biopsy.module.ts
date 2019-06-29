import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './biopsy.routing';

import { IonicModule } from '@ionic/angular';

import { BiopsyPage } from './biopsy.page';
import { BiopsyStatusComponent } from './biopsy-status/biopsy-status.component';
import { ScheduledBiopsyComponent } from './scheduled-biopsy/scheduled-biopsy.component';
import { CompletedBiopsyComponent } from './completed-biopsy/completed-biopsy.component';
import { CompletedBiopsyReceptorsComponent } from './completed-biopsy-receptors/completed-biopsy-receptors.component';
import { CompletedBiopsyFeaturesComponent } from './completed-biopsy-features/completed-biopsy-features.component';
import { CompletedBiopsySummaryComponent } from './completed-biopsy-summary/completed-biopsy-summary.component';
import { BiopsySummaryComponent } from './biopsy-summary/biopsy-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    routing
  ],
  declarations: [
    BiopsyPage,
    BiopsyStatusComponent,
    ScheduledBiopsyComponent,
    CompletedBiopsyComponent,
    CompletedBiopsyReceptorsComponent,
    CompletedBiopsyFeaturesComponent,
    CompletedBiopsySummaryComponent,
    BiopsySummaryComponent
  ],
  exports: [
    BiopsySummaryComponent
  ]
})
export class BiopsyPageModule {}
