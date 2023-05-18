
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
import { BlankComponent } from './blank/blank.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TabperfilComponent } from './tabs/tabperfil/tabperfil.component';
import { ListevaluacionComponent } from './listevaluacion/listevaluacion.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { ListtipodocumentoComponent } from './listtipodocumento/listtipodocumento.component';
import { ListcolaboradoresdeshabilitadosComponent } from './listcolaboradoresdeshabilitados/listcolaboradoresdeshabilitados.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ListconfiguracionComponent } from './listconfiguracion/listconfiguracion.component';
import { PermisosComponent } from './permisos/permisos.component';
import { ListpermisosComponent } from './listpermisos/listpermisos.component';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent, canActivate: [UserGuardGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'blank', component: BlankComponent },
          { path: 'perfil/:id', component: PerfilComponent },
          { path: 'tabperfil/:id', component: TabperfilComponent },
          { path: 'list-collaborator', component: listCollaboratorComponent },
          { path: 'collaborator', component: CollaboratorComponent },
          { path: 'collaborator/:id', component: CollaboratorComponent },
          { path: 'list-documentos', component: ListdocumentosComponent},
          { path: 'documentos', component: DocumentosComponent},
          { path: 'documentos/:id', component: DocumentosComponent},
          { path: 'archivo/:nombre', component: ArchivoComponent},
          { path: 'list-evaluaciones', component: ListevaluacionComponent},
          { path: 'evaluacion', component: EvaluacionComponent},
          { path: 'tipo-documento', component: TipodocumentoComponent},
          { path: 'tipo-documento/:id', component: TipodocumentoComponent},
          { path: 'list-tipo-documentos', component: ListtipodocumentoComponent},
          { path: 'list-colaboradores-deshabilitados', component: ListcolaboradoresdeshabilitadosComponent},
          { path: 'configuracion', component: ConfiguracionComponent},
          { path: 'configuracion/:id/:idC/:idD/:idCa', component: ConfiguracionComponent},
          { path: 'list-configuracion', component: ListconfiguracionComponent},
          { path: 'permisos/:id', component: PermisosComponent},
          { path: 'permisos/:id/:idD/:idP', component: PermisosComponent},
          { path: 'list-permisos', component: ListpermisosComponent},
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

