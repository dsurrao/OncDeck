import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateUtils } from 'src/app/common/dateutils';
import { Patient } from 'src/app/models/patient';
import { Surgery } from 'src/app/models/surgery';

@Component({
  selector: 'scheduled-surgery',
  templateUrl: './scheduled-surgery.component.html',
  styleUrls: ['./scheduled-surgery.component.scss'],
})
export class ScheduledSurgeryComponent implements OnInit {
  
  @Input('patient') patient: Patient;
  @Input('surgery') surgery: Surgery;
  @Output() save = new EventEmitter<Surgery>();
  scheduledDate: string;
  completedDate: string;

  constructor(public dateUtils: DateUtils) { 

  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if (this.surgery != null) {
      this.scheduledDate = this.dateUtils.isoStringToYyyymmdd(this.surgery.scheduledDate);
      this.completedDate = this.dateUtils.isoStringToYyyymmdd(this.surgery.completedDate);
    }
  }

  _save() {
    // convert surgery dates to ISO format before saving
    if (this.scheduledDate != null) {
      this.surgery.scheduledDate = this.dateUtils.yyyymmddToISOString(this.scheduledDate);
    }
    if (this.completedDate != null) {
      this.surgery.completedDate = this.dateUtils.yyyymmddToISOString(this.completedDate);
    }    

    this.save.emit(this.surgery);
  }

}
