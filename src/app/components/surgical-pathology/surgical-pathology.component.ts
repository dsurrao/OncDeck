import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SurgicalPathology } from 'src/app/models/surgical-pathology';
import { DateUtils } from 'src/app/common/dateutils';
import { SurgeryTypeEnum } from '../../enums/surgery-type-enum';
import { SurgicalMarginEnum } from '../../enums/surgical-margin-enum';
import { ReceptorStatusEnum } from 'src/app/enums/receptor-status-enum';
import { GradeEnum } from '../../enums/grade-enum';
import { HistologyEnum } from 'src/app/enums/histology-enum';
import { LVIEnum } from 'src/app/enums/lvi-enum';

@Component({
  selector: 'surgical-pathology',
  templateUrl: './surgical-pathology.component.html',
  styleUrls: ['./surgical-pathology.component.scss'],
})
export class SurgicalPathologyComponent implements OnInit {

  @Input('patient') patient: Patient;
  @Input('pathology') pathology: SurgicalPathology;
  @Output() saveEmitter = new EventEmitter<SurgicalPathology>();

  // make these enums available in template
  surgeryTypeEnum = SurgeryTypeEnum; 
  histologyEnum = HistologyEnum;
  erEnum = ReceptorStatusEnum;
  prEnum = ReceptorStatusEnum;
  her2Enum = ReceptorStatusEnum;
  lviEnum = LVIEnum;
  gradeEnum = GradeEnum;
  surgicalMarginEnum = SurgicalMarginEnum;
  tumorGradeEnum = GradeEnum;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

  save() {
    this.saveEmitter.emit(this.pathology);
  }
}
