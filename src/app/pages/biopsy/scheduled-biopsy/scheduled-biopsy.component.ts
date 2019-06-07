import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scheduled-biopsy',
  templateUrl: './scheduled-biopsy.component.html',
  styleUrls: ['./scheduled-biopsy.component.scss'],
})
export class ScheduledBiopsyComponent implements OnInit {

  patientId: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
  }

}
