import { Component, OnInit, Input } from '@angular/core';
import { Staging } from 'src/app/models/staging';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-completed-staging-summary',
  templateUrl: './completed-staging-summary.component.html',
  styleUrls: ['./completed-staging-summary.component.scss'],
})
export class CompletedStagingSummaryComponent implements OnInit {

  @Input('staging') staging: Staging;
  
  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

}
