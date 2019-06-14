import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SurgicalPathology } from 'src/app/models/surgical-pathology';
import { DateUtils } from 'src/app/common/dateutils';
import { SurgeryTypeEnum } from '../../enums/surgery-type-enum';
import { SurgeryHistologyEnum } from '../../enums/surgery-histology-enum';
import { SurgicalFeatureEnum } from '../../enums/surgical-feature-enum';
import { SurgicalMarginEnum } from '../../enums/surgical-margin-enum';
import { ReceptorStatusEnum } from 'src/app/enums/receptor-status-enum';
import { Her2Receptor } from 'src/app/models/her2-receptor';
import { ProgesteroneReceptor } from 'src/app/models/pr-receptor';
import { EstrogenReceptor } from 'src/app/models/er-receptor';
import { GradeEnum } from '../../enums/grade-enum';

@Component({
  selector: 'surgical-pathology',
  templateUrl: './surgical-pathology.component.html',
  styleUrls: ['./surgical-pathology.component.scss'],
})
export class SurgicalPathologyComponent implements OnInit {

  @Input('patient') patient: Patient;
  @Input('pathology') pathology: SurgicalPathology;
  @Output() saveEmitter = new EventEmitter<SurgicalPathology>();

  // ngModel fields
  surgeryDate: string;
  erStatus: ReceptorStatusEnum;
  prStatus: ReceptorStatusEnum;
  her2Status: ReceptorStatusEnum;
  tumorGrade: GradeEnum;

  // make these enums available in template
  surgeryTypeEnum = SurgeryTypeEnum; 
  surgeryHistologyEnum = SurgeryHistologyEnum;
  erEnum = ReceptorStatusEnum;
  prEnum = ReceptorStatusEnum;
  her2Enum = ReceptorStatusEnum;
  surgicalFeatureEnum = SurgicalFeatureEnum;
  surgicalMarginEnum = SurgicalMarginEnum;
  tumorGradeEnum = GradeEnum;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.pathology != null) {
      this.surgeryDate = this.dateUtils.isoStringToYyyymmdd(this.pathology.surgeryDate);
      if (this.pathology.er != null) {
        this.erStatus = this.pathology.er.status;
      }
      if (this.pathology.pr != null) {
        this.prStatus = this.pathology.pr.status;
      }
      if (this.pathology.her2 != null) {
        this.her2Status = this.pathology.her2.status;
      }
    }
  }

  save() {
    if (this.surgeryDate != null) {
      this.pathology.surgeryDate = this.dateUtils.yyyymmddToISOString(this.surgeryDate);
    }
    if (this.pathology.er == null) {
      this.pathology.er = new EstrogenReceptor();
    }
    if (this.pathology.pr == null) {
      this.pathology.pr = new ProgesteroneReceptor();
    }
    if (this.pathology.her2 == null) {
      this.pathology.her2 = new Her2Receptor();
    }
    this.pathology.er.status = this.erStatus;
    this.pathology.pr.status = this.prStatus;
    this.pathology.her2.status = this.her2Status;
    this.saveEmitter.emit(this.pathology);
  }
}
