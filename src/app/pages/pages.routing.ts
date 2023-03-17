
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { listCollaboratorComponent } from './listCollaborator/listcollaborator.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { ListevaluationComponent } from './listevaluation/listevaluation.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { UserGuardGuard } from '../Guard/user-guard.guard';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent, canActivate: [UserGuardGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'list-collaborator', component: listCollaboratorComponent },
          { path: 'collaborator', component: CollaboratorComponent },
          { path: 'collaborator/:id', component: CollaboratorComponent },
          { path: 'list-evaluation', component: ListevaluationComponent },
          { path: 'evaluation', component: EvaluationComponent },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

