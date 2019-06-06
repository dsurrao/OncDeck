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

const routes: Routes = [
  { path: '', component: BiopsyPage },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'biopsy-status/:patientId', component: BiopsyStatusComponent },
  { path: 'completed-biopsy/:patientId', component: CompletedBiopsyComponent },
  { path: 'scheduled-biopsy/:patientId', component: ScheduledBiopsyComponent },
  { path: 'biopsy-not-indicated/:patientId', component: BiopsyNotIndicatedComponent },
  { path: 'biopsy-not-scheduled/:patientId', component: BiopsyNotScheduledComponent}
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
    BiopsyNotIndicatedComponent,
    BiopsyNotScheduledComponent
  ]
})
export class BiopsyPageModule {}
