import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinical-breast-staging',
  templateUrl: './clinical-breast-staging.page.html',
  styleUrls: ['./clinical-breast-staging.page.scss'],
})
export class ClinicalBreastStagingPage implements OnInit {

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {

    let patientId = this.route.snapshot.paramMap.get('patientId');
    console.log(patientId);

  }

}
