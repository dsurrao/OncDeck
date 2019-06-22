import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Biopsy } from 'src/app/models/biopsy';
import { CompletedBiopsy } from 'src/app/models/completed-biopsy';
import { BiopsyStatusEnum } from 'src/app/enums/biopsy-status-enum';
import { DateUtils } from 'src/app/common/dateutils';
import { BiopsyTypeEnum } from 'src/app/enums/biopsy-type-enum';

@Component({
  selector: 'app-biopsy-summary',
  templateUrl: './biopsy-summary.component.html',
  styleUrls: ['./biopsy-summary.component.scss'],
})
export class BiopsySummaryComponent implements OnInit, OnChanges {

  @Input('biopsy') biopsy: Biopsy;

  biopsyType: string = '';
  mostRecentCompletedBiopsy: CompletedBiopsy;

  // for use in template
  biopsyStatusEnum = BiopsyStatusEnum;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

  ngOnChanges() {
    // TODO: get latest biopsy by date
    if (this.biopsy.completedBiopsies != null) {
      this.mostRecentCompletedBiopsy = this.biopsy.completedBiopsies[this.biopsy.completedBiopsies.length - 1];
    }

    if (this.biopsy.status == BiopsyStatusEnum.Scheduled) {
      if (this.biopsy.scheduledBiopsy.biopsyType.type == BiopsyTypeEnum.Other) {
        this.biopsyType = this.biopsy.scheduledBiopsy.biopsyType.other;
      }
      else {
        this.biopsyType = this.biopsy.scheduledBiopsy.biopsyType.type;
      }
    }
  }

}
