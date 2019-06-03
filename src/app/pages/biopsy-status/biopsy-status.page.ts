/**
 * Pattern for parent child interaction: https://angular.io/guide/component-interaction
 */
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Events } from '@ionic/angular';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-biopsy-status',
  templateUrl: './biopsy-status.page.html',
  styleUrls: ['./biopsy-status.page.scss'],
})
export class BiopsyStatusPage implements OnInit {
  patient$: Observable<Patient>;

  constructor(public navCtrl: NavController, 
    public patientSvc: PatientService,
    public events: Events,
    public alertController: AlertController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('id');
    // existing patient
    if (patientId != null) {
      // create an observable by converting service return promise to observable, 
      // and taking the first result
      // https://www.learnrxjs.io/operators/filtering/take.html
      this.patient$ = from(this.patientSvc.getPatient(patientId)).pipe(take(1));
    }
  }

  save(patient: Patient) {
    this.patientSvc.savePatient(patient).then(updatedPatient => {
      console.log("patient saved");
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('patient/' + patient._id);
    })
    .catch(error => {
      let title: string = 'Error saving patient';
      let subTitle: string = '';
      if (error.status == '409') {
        subTitle = "This patient's data was updated by somewhere else; please refresh data via the home page";
      }
      else {
        subTitle = error;
      }
      this.showAlert(title, subTitle);
    });
  }

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertController.create({
      header: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }
} 
