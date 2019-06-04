import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SurgicalPathology } from 'src/app/models/surgical-pathology';
import { DateUtils } from 'src/app/common/dateutils';
import { SurgeryType } from '../../enums/surgery-type';
import { SurgeryHistology } from '../../enums/surgery-histology';
import { EstrogenReceptor } from '../../enums/er-receptor';
import { ProgesteroneReceptor } from '../../enums/pr-receptor';
import { Her2Receptor } from '../../enums/her2-receptor';
import { SurgicalFeature } from '../../enums/surgical-feature';
import { SurgicalMargin } from '../../enums/surgical-margin';

@Component({
  selector: 'surgical-pathology',
  templateUrl: './surgical-pathology.component.html',
  styleUrls: ['./surgical-pathology.component.scss'],
})
export class SurgicalPathologyComponent implements OnInit {

  @Input('patient') patient: Patient;
  @Input('pathology') pathology: SurgicalPathology;
  @Output() saveEmitter = new EventEmitter<SurgicalPathology>();
  surgeryDate: string;

  // make these enums available in template
  surgeryType = SurgeryType; 
  surgeryHistology = SurgeryHistology;
  estrogenReceptor = EstrogenReceptor;
  progesteroneReceptor = ProgesteroneReceptor;
  her2Receptor = Her2Receptor;
  surgicalFeature = SurgicalFeature;
  surgicalMargin = SurgicalMargin;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.pathology != null) {
      this.surgeryDate = this.dateUtils.isoStringToYyyymmdd(this.pathology.surgeryDate);
    }
  }

  save() {
    if (this.surgeryDate != null) {
      this.pathology.surgeryDate = this.dateUtils.yyyymmddToISOString(this.surgeryDate);
    }
    this.saveEmitter.emit(this.pathology);
  }
}
