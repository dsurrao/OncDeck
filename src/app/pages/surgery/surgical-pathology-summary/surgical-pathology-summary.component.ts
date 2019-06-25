import { Component, OnInit, Input } from '@angular/core';
import { SurgicalPathology } from 'src/app/models/surgical-pathology';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-surgical-pathology-summary',
  templateUrl: './surgical-pathology-summary.component.html',
  styleUrls: ['./surgical-pathology-summary.component.scss'],
})
export class SurgicalPathologySummaryComponent implements OnInit {
  @Input('pathology') pathology: SurgicalPathology;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

}
