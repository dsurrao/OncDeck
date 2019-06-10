import { Component, OnInit } from '@angular/core';
import { LVIEnum } from 'src/app/enums/lvi-enum';
import { GradeEnum } from 'src/app/enums/grade-enum';

@Component({
  selector: 'app-completed-biopsy-features',
  templateUrl: './completed-biopsy-features.component.html',
  styleUrls: ['./completed-biopsy-features.component.scss'],
})
export class CompletedBiopsyFeaturesComponent implements OnInit {

  // for use in template
  gradeEnum: GradeEnum;
  lviEnum: LVIEnum;

  constructor() { }

  ngOnInit() {}

}
