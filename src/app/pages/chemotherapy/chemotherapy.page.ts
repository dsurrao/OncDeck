import { Component, OnInit } from '@angular/core';
import { Chemotherapy } from 'src/app/models/chemotherapy';

@Component({
  selector: 'app-chemotherapy',
  templateUrl: './chemotherapy.page.html',
  styleUrls: ['./chemotherapy.page.scss'],
})
export class ChemotherapyPage implements OnInit {
  
  chemotherapy: Chemotherapy;

  constructor() { }

  ngOnInit() {
  
    this.chemotherapy = new Chemotherapy();


  }


}
