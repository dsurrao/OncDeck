import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BiopsyPage } from './biopsy.page';
import { BiopsyStatusComponent } from './biopsy-status/biopsy-status.component';
import { ScheduledBiopsyComponent } from './scheduled-biopsy/scheduled-biopsy.component';
import { CompletedBiopsyComponent } from './completed-biopsy/completed-biopsy.component';
import { BiopsyNotIndicatedComponent } from './biopsy-not-indicated/biopsy-not-indicated.component';
import { BiopsyNotScheduledComponent } from './biopsy-not-scheduled/biopsy-not-scheduled.component';
import { CompletedBiopsyReceptorsComponent } from './completed-biopsy-receptors/completed-biopsy-receptors.component';
import { CompletedBiopsyFeaturesComponent } from './completed-biopsy-features/completed-biopsy-features.component';

const routes: Routes = [
  // TODO: try using loadChildren
  // { path: '', component: BiopsyPage },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: '', component: BiopsyStatusComponent },
  { path: 'biopsy-status', component: BiopsyStatusComponent },
  { path: 'completed-biopsy', component: CompletedBiopsyComponent },
  { path: 'completed-biopsy/:completedBiopsyId', component: CompletedBiopsyComponent },
  { path: 'completed-biopsy/:completedBiopsyId/receptors', component: CompletedBiopsyReceptorsComponent },
  { path: 'completed-biopsy/:completedBiopsyId/features', component: CompletedBiopsyFeaturesComponent },
  { path: 'scheduled-biopsy', component: ScheduledBiopsyComponent },
  { path: 'biopsy-not-indicated', component: BiopsyNotIndicatedComponent },
  { path: 'biopsy-not-scheduled', component: BiopsyNotScheduledComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BiopsyPage,
    BiopsyStatusComponent,
    ScheduledBiopsyComponent,
    CompletedBiopsyComponent,
    CompletedBiopsyReceptorsComponent,
    CompletedBiopsyFeaturesComponent,
    BiopsyNotIndicatedComponent,
    BiopsyNotScheduledComponent
  ]
})
export class BiopsyPageModule {}
