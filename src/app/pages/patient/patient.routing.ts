import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PatientPage } from './patient.page';

const routes: Routes = [
  { path: '', component: PatientPage },
  { path: ':selectedTab', component: PatientPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class routing {
}