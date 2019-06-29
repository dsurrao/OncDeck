import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiopsyStatusComponent } from './biopsy-status/biopsy-status.component';
import { CompletedBiopsyComponent } from './completed-biopsy/completed-biopsy.component';
import { CompletedBiopsyReceptorsComponent } from './completed-biopsy-receptors/completed-biopsy-receptors.component';
import { CompletedBiopsyFeaturesComponent } from './completed-biopsy-features/completed-biopsy-features.component';
import { ScheduledBiopsyComponent } from './scheduled-biopsy/scheduled-biopsy.component';

const routes: Routes = [
    // TODO: try using loadChildren
    // { path: '', component: BiopsyPage },
    // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: '', component: BiopsyStatusComponent },
    { path: 'biopsy-status', component: BiopsyStatusComponent },
    { path: 'completed-biopsy', component: CompletedBiopsyComponent },
    { path: 'completed-biopsy/:completedBiopsyId', component: CompletedBiopsyComponent },
    { path: 'completed-biopsy/:completedBiopsyId/receptors', component: CompletedBiopsyReceptorsComponent },
    { path: 'completed-biopsy/:completedBiopsyId/features', component: CompletedBiopsyFeaturesComponent },
    { path: 'scheduled-biopsy', component: ScheduledBiopsyComponent }
  ];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);