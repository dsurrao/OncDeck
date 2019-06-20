import { Component, OnInit, Input } from '@angular/core';
import { CompletedBiopsy } from 'src/app/models/completed-biopsy';
import { DateUtils } from 'src/app/common/dateutils';
import { LymphNodeEnum } from 'src/app/enums/lymph-node-enum';
import { BiopsyTissueEnum } from 'src/app/enums/biopsy-tissue-enum';
import { BiopsyTypeEnum } from 'src/app/enums/biopsy-type-enum';
import { BiopsyHistologyEnum } from 'src/app/enums/biopsy-histology-enum';

@Component({
  selector: 'app-completed-biopsy-summary',
  templateUrl: './completed-biopsy-summary.component.html',
  styleUrls: ['./completed-biopsy-summary.component.scss'],
})
export class CompletedBiopsySummaryComponent implements OnInit {
  @Input('biopsy') biopsy: CompletedBiopsy;
  
  biopsyType: string = '';
  site: string = '';
  histology: string = '';
  receptors: string = '';
  features: string = '';

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {
    // Biopsy Type
    if (this.biopsy.type.type == BiopsyTypeEnum.Other) {
      this.biopsyType = this.biopsy.type.other;
    }
    else {
      this.biopsyType = this.biopsy.type.type;
    }

    // Site
    if (this.biopsy.site.tissue == BiopsyTissueEnum.Other) {
      this.site += this.biopsy.site.otherTissue + '; ';
    }
    else {
      this.site += this.biopsy.site.tissue + '; ';
    }
    if (this.biopsy.site.side != null) {
      this.site += 'Side: ' + this.biopsy.site.side + '; ';
    }

    if (this.biopsy.site.lymphNode != null) {
      if (this.biopsy.site.lymphNode == LymphNodeEnum.Other) {
        this.site += 'Lymph Nodes: ' + this.biopsy.site.otherLymphNode + '; ';
      }
      else {
        this.site += 'Lymph Nodes: ' + this.biopsy.site.lymphNode + '; ';
      }
    }

    // Histology
    if (this.biopsy.histology.histology == BiopsyHistologyEnum.Other) {
      this.histology = this.biopsy.histology.other;
    }
    else {
      this.histology = this.biopsy.histology.histology;
    }

    // Receptors
    if (this.biopsy.receptors != null) {
      if (this.biopsy.receptors.er != null) { 
        this.receptors += 'ER: ' + this.biopsy.receptors.er.status + ' ' 
          + this.biopsy.receptors.er.strength + '; ';
      }
      if (this.biopsy.receptors.pr != null) {
        this.receptors += 'PR: ' + this.biopsy.receptors.pr.status + ' ' 
          + this.biopsy.receptors.pr.strength + '; ';
      }
      if (this.biopsy.receptors.her2 != null) {
        this.receptors += 'HER2: ' + this.biopsy.receptors.her2.status + ' ' 
          + this.biopsy.receptors.her2.testingMethod + '; ';
      }
    }

    // Features
    if (this.biopsy.features != null) {
      if (this.biopsy.features.grade != null) {
        this.features += 'Grade: ' + this.biopsy.features.grade + '; ';
      }
      if (this.biopsy.features.lvi != null ) {
        this.features += 'LVI: ' + this.biopsy.features.lvi + '; ';
      }
    }
  }

}
