
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { listCollaboratorComponent } from './listCollaborator/listcollaborator.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { UserGuardGuard } from '../Guard/user-guard.guard';
import { ListdocumentosComponent } from './listdocumentos/listdocumentos.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ArchivoComponent } from './archivo/archivo.component';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent, canActivate: [UserGuardGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'list-collaborator', component: listCollaboratorComponent },
          { path: 'collaborator', component: CollaboratorComponent },
          { path: 'collaborator/:id', component: CollaboratorComponent },
          { path: 'list-documentos', component: ListdocumentosComponent},
          { path: 'documentos', component: DocumentosComponent},
          { path: 'archivo/:nombre', component: ArchivoComponent},
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

