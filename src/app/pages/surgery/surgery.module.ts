import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SurgeryPage } from './surgery.page';
import { SurgeryHomeComponent } from './surgery-home/surgery-home.component';
import { SurgerySummaryComponent } from './surgery-summary/surgery-summary.component';
import { CompletedSurgeryComponent } from './completed-surgery/completed-surgery.component';

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
    CompletedSurgeryComponent
  ]
})
export class SurgeryPageModule {}
