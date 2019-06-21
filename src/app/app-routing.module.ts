import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login-modal', loadChildren: './pages/login-modal/login-modal.module#LoginModalPageModule' },
  { path: 'logout-modal', loadChildren: './pages/logout-modal/logout-modal.module#LogoutModalPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'graph', loadChildren: './pages/graph/graph.module#GraphPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'patients', loadChildren: './pages/patients/patients.module#PatientsPageModule' },
  { path: 'patient-form', loadChildren: './pages/patient-form/patient-form.module#PatientFormPageModule' },
  { path: 'patient-form/:id', loadChildren: './pages/patient-form/patient-form.module#PatientFormPageModule' },
  { path: 'patient/:id', loadChildren: './pages/patient/patient.module#PatientPageModule' },
  { path: 'patient/:patientId/scheduled-surgery', loadChildren: './pages/scheduled-surgery/scheduled-surgery.module#ScheduledSurgeryPageModule' },
  { path: 'patient/:patientId/scheduled-surgery/:surgeryId', loadChildren: './pages/scheduled-surgery/scheduled-surgery.module#ScheduledSurgeryPageModule' },
  { path: 'patient/:patientId/surgical-pathology', loadChildren: './pages/surgical-pathology/surgical-pathology.module#SurgicalPathologyPageModule' },
  { path: 'patient/:patientId/surgical-pathology/:pathologyId', loadChildren: './pages/surgical-pathology/surgical-pathology.module#SurgicalPathologyPageModule' },
  { path: 'patient/:patientId/biopsy', loadChildren: './pages/biopsy/biopsy.module#BiopsyPageModule' },
  { path: 'patient/:patientId/radiation-therapy', loadChildren: './pages/radiation-therapy/radiation-therapy.module#RadiationTherapyPageModule' },
  { path: 'patient/:patientId/radiation-therapy/:radiationTherapyId', 
    loadChildren: './pages/radiation-therapy/radiation-therapy.module#RadiationTherapyPageModule' },
  { path: 'clinical-breast-staging/:patientId', loadChildren: './pages/clinical-breast-staging/clinical-breast-staging.module#ClinicalBreastStagingPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
