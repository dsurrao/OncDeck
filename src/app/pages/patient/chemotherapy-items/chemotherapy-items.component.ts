import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'chemotherapy-items',
  templateUrl: './chemotherapy-items.component.html',
  styleUrls: ['./chemotherapy-items.component.scss'],
})
export class ChemotherapyItemsComponent implements OnInit {

  @Input('patient') patient: Patient;

  constructor() { }

  ngOnInit() {
  }

}
