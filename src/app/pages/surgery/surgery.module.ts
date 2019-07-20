import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SurgeryPage } from './surgery.page';
import { SurgeryHomeComponent } from './surgery-home/surgery-home.component';
import { SurgerySummaryComponent } from './surgery-summary/surgery-summary.component';
import { CompletedSurgeryComponent } from './completed-surgery/completed-surgery.component';
import { CompletedSurgerySummaryComponent } from './completed-surgery-summary/completed-surgery-summary.component';
import { SurgicalPathologySummaryComponent } from './surgical-pathology-summary/surgical-pathology-summary.component';
import { ScheduledSurgeryComponent } from './scheduled-surgery/scheduled-surgery.component';
import { NotScheduledSurgeryComponent } from './not-scheduled-surgery/not-scheduled-surgery.component';
import { NotIndicatedSurgeryComponent } from './not-indicated-surgery/not-indicated-surgery.component';

const routes: Routes = [
  { path: 'completed-surgery', component: CompletedSurgeryComponent},
  { path: 'completed-surgery/:completedSurgeryId', component: CompletedSurgeryComponent},
  { path: 'scheduled-surgery', component: ScheduledSurgeryComponent},
  { path: 'not-scheduled-surgery', component: NotScheduledSurgeryComponent}, 
  { path: 'not-indicated-surgery', component: NotIndicatedSurgeryComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SurgeryPage,
    SurgeryHomeComponent,
    SurgerySummaryComponent,
    CompletedSurgeryComponent,
    CompletedSurgerySummaryComponent,
    SurgicalPathologySummaryComponent,
    ScheduledSurgeryComponent,
    NotScheduledSurgeryComponent,
    NotIndicatedSurgeryComponent
  ],
  exports: [
    SurgerySummaryComponent,
    SurgeryHomeComponent
  ]
})
export class SurgeryPageModule {}
