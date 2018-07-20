import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduledSurgeryPage } from './scheduled-surgery';

@NgModule({
  declarations: [
    ScheduledSurgeryPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduledSurgeryPage),
  ],
})
export class ScheduledSurgeryPageModule {}
