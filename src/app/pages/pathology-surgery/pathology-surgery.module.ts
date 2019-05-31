import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PathologySurgeryPage } from './pathology-surgery.page';

const routes: Routes = [
  {
    path: '',
    component: PathologySurgeryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PathologySurgeryPage]
})
export class PathologySurgeryPageModule {}
