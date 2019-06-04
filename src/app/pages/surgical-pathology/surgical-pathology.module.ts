import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SurgicalPathologyPage } from './surgical-pathology.page';
import { SurgicalPathologyComponent } from 'src/app/components/surgical-pathology/surgical-pathology.component';

const routes: Routes = [
  {
    path: '',
    component: SurgicalPathologyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SurgicalPathologyPage, SurgicalPathologyComponent]
})
export class SurgicalPathologyPageModule {}
