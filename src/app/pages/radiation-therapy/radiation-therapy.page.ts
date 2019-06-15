import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { RadiationTherapy } from 'src/app/models/radiation-therapy';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { RadiationFieldEnum } from 'src/app/enums/radiation-field-enum';
import { RadiationFieldTreated } from 'src/app/models/radiation-field-treated';
import { Events, NavController } from '@ionic/angular';
import { RadiationService } from 'src/app/services/radiation.service';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-radiation-therapy',
  templateUrl: './radiation-therapy.page.html',
  styleUrls: ['./radiation-therapy.page.scss'],
})
export class RadiationTherapyPage implements OnInit {
  patientId: string;
  radiationTherapyId: string;
  patient: Patient;
  radiationTherapy: RadiationTherapy
  radiationFieldOther: string;
  radiationFields = [
    { val: RadiationFieldEnum.ChestWall, isChecked: false },
    { val: RadiationFieldEnum.WholeBreast, isChecked: false },
    { val: RadiationFieldEnum.PartialBreast, isChecked: false },
    { val: RadiationFieldEnum.Axilla, isChecked: false },
    { val: RadiationFieldEnum.Superclav, isChecked: false },
    { val: RadiationFieldEnum.InternalMammary, isChecked: false },
    { val: RadiationFieldEnum.Spine2Field, isChecked: false },
    { val: RadiationFieldEnum.SpinePosterior, isChecked: false },
    { val: RadiationFieldEnum.WholeBrain, isChecked: false },
    { val: RadiationFieldEnum.Other, isChecked: false },
  ];

  constructor(public route: ActivatedRoute,
    public patientSvc: PatientService,
    public radiationSvc: RadiationService,
    public events: Events,
    public navCtrl: NavController,
    public dateUtils: DateUtils) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.radiationTherapyId = this.route.snapshot.paramMap.get('radiationTherapyId');
    this.patientSvc.getPatient(this.patientId).then(patient => {
      this.patient = patient;
      if (this.radiationTherapyId != null) {
        this.radiationTherapy = this.patient.radiationTherapies.find(r => {
          return r.id === this.radiationTherapyId
        });
        // prepopulate fields treated
        for (let r of this.radiationTherapy.fieldsTreated) {
          this.radiationFields.find(f => {return f.val === r.field}).isChecked = true;
          if (r.field === RadiationFieldEnum.Other) {
            this.radiationFieldOther = r.fieldOther;
          }
        }
      }
      else {
        this.radiationTherapy = new RadiationTherapy();
        this.radiationTherapy.fieldsTreated = [];
      }
    });
  }

  updateProjectedEndDate() {
    if (this.radiationTherapy != null) {
      // calculate projected end date
      // TODO: factor in weekends and holidays
      this.radiationTherapy.projectedEndDate = this.dateUtils.addDays(
        this.radiationTherapy.startDate, this.radiationTherapy.numTreatments - 1);
    }
  }

  save() {
    // add checked radiation fields
    let checkedRadiationFields = this.radiationFields.filter(f => f.isChecked);
    for (let f of checkedRadiationFields) {
      let fieldTreated = this.radiationTherapy.fieldsTreated.find(r => {return r.field === f.val});
      if (fieldTreated == null) {
        let fieldTreated = new RadiationFieldTreated();
        fieldTreated.field = f.val;
        if (fieldTreated.field === RadiationFieldEnum.Other) {
          fieldTreated.fieldOther = this.radiationFieldOther;
        }
        this.radiationTherapy.fieldsTreated.push(fieldTreated);
      }
    }

    // remove unchecked radiation fields
    let uncheckedRadiationFields = this.radiationFields.filter(f => !f.isChecked);
    for (let f of uncheckedRadiationFields) {
      let findIndex = this.radiationTherapy.fieldsTreated.findIndex(r => {return r.field === f.val});
      if (findIndex != -1) {
        this.radiationTherapy.fieldsTreated.splice(findIndex, 1);
      }
    }

    // now save to db
    this.radiationSvc.saveRadiationTherapy(this.radiationTherapy, this.patient).then(id => {
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('patient/' + this.patientId);
    })
  }
}
