import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiopsyOrderPage } from './biopsy-order';

@NgModule({
  declarations: [
    BiopsyOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(BiopsyOrderPage),
  ],
})
export class BiopsyOrderPageModule {}
