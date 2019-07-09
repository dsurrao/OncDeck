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

const routes: Routes = [
  //{ path: '', component: SurgeryPage},
  { path: '', component: SurgeryHomeComponent},
  { path: 'completed-surgery', component: CompletedSurgeryComponent},
  { path: 'completed-surgery/:completedSurgeryId', component: CompletedSurgeryComponent}
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
    SurgicalPathologySummaryComponent
  ],
  exports: [
    SurgerySummaryComponent,
    SurgeryHomeComponent
  ]
})
export class SurgeryPageModule {}
