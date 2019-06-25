import { Component, OnInit, Input } from '@angular/core';
import { CompletedSurgery } from 'src/app/models/completed-surgery';
import { SurgicalPathologyStatusEnum } from 'src/app/enums/surgical-pathology-status-enum';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-completed-surgery-summary',
  templateUrl: './completed-surgery-summary.component.html',
  styleUrls: ['./completed-surgery-summary.component.scss'],
})
export class CompletedSurgerySummaryComponent implements OnInit {
  @Input('surgery') surgery: CompletedSurgery;

  surgicalPathologyStatusEnum = SurgicalPathologyStatusEnum;
  
  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

}
