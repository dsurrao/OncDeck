/**
 * Pattern for parent child interaction: https://angular.io/guide/component-interaction
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'biopsy-status',
  templateUrl: './biopsy-status.component.html',
  styleUrls: ['./biopsy-status.component.scss'],
})
export class BiopsyStatusComponent implements OnInit {

  @Input('patient') patient: Patient;
  @Output() save = new EventEmitter<Patient>();

  constructor() { 
  }

  ngOnInit() {}

  _save() {
    this.save.emit(this.patient);
  }
}
