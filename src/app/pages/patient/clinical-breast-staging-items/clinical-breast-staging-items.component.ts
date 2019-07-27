import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'clinical-breast-staging-items',
  templateUrl: './clinical-breast-staging-items.component.html',
  styleUrls: ['./clinical-breast-staging-items.component.scss'],
})
export class ClinicalBreastStagingItemsComponent implements OnInit {

  @Input('patient') patient: Patient;

  constructor() { }

  ngOnInit() {}

}