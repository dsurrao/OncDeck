import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'patients', loadChildren: './pages/patients/patients.module#PatientsPageModule' },
  { path: 'login-modal', loadChildren: './pages/login-modal/login-modal.module#LoginModalPageModule' },
  { path: 'logout-modal', loadChildren: './pages/logout-modal/logout-modal.module#LogoutModalPageModule' },
  { path: 'patient/:id', loadChildren: './pages/patient/patient.module#PatientPageModule' },
  { path: 'patient-form', loadChildren: './pages/patient-form/patient-form.module#PatientFormPageModule' },
  { path: 'patient-form/:id', loadChildren: './pages/patient-form/patient-form.module#PatientFormPageModule' },
  { path: 'biopsy-status/:id', loadChildren: './pages/biopsy-status/biopsy-status.module#BiopsyStatusPageModule' },
  { path: 'scheduled-surgery/:patientId', loadChildren: './pages/scheduled-surgery/scheduled-surgery.module#ScheduledSurgeryPageModule' },
  { path: 'scheduled-surgery/:patientId/:surgeryId', loadChildren: './pages/scheduled-surgery/scheduled-surgery.module#ScheduledSurgeryPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'graph', loadChildren: './pages/graph/graph.module#GraphPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'surgical-pathology/:patientId', loadChildren: './pages/surgical-pathology/surgical-pathology.module#SurgicalPathologyPageModule' },
  { path: 'surgical-pathology/:patientId/:pathologyId', loadChildren: './pages/surgical-pathology/surgical-pathology.module#SurgicalPathologyPageModule' },
  //{ path: 'biopsy', loadChildren: './pages/biopsy/biopsy.module#BiopsyPageModule' },
  { path: 'biopsy/:patientId', loadChildren: './pages/biopsy/biopsy.module#BiopsyPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
