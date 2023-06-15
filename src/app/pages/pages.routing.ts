
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
import { ListgrupoComponent } from './listgrupo/listgrupo.component';
import { GrupoComponent } from './grupo/grupo.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { QuizComponent } from './quiz/quiz.component';
import { ListevaluacionesdeshabilitadosComponent } from './listevaluacionesdeshabilitados/listevaluacionesdeshabilitados.component';
import { ListcolaboradoresintentosComponent } from './listcolaboradoresintentos/listcolaboradoresintentos.component';
import { ListresultadosevaluacionComponent } from './listresultadosevaluacion/listresultadosevaluacion.component';
import { UserGuardGuardChild } from '../Guard/user-guard-child.guard';

const routes: Routes = [
    
    {
        
        path: 'dashboard', 
        component: PagesComponent, 
        canActivate: [UserGuardGuard], 
        //canActivateChild: [UserGuardGuardChild],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'blank', component: BlankComponent},
          { path: 'perfil/:id', component: PerfilComponent },
          { path: 'tabperfil/:id', component: TabperfilComponent },
          { path: 'list-collaborator', component: listCollaboratorComponent },
          { path: 'collaborator', component: CollaboratorComponent },
          { path: 'collaborator/:id', component: CollaboratorComponent },
          { path: 'list-documentos', component: ListdocumentosComponent},
          { path: 'documentos', component: DocumentosComponent},
          { path: 'documentos/:id', component: DocumentosComponent},
          { path: 'archivo/:nombre', component: ArchivoComponent},
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
          { path: 'list-grupos', component: ListgrupoComponent},
          { path: 'grupo', component: GrupoComponent},
          { path: 'grupo/:id', component: GrupoComponent},
          { path: 'list-evaluaciones', component: ListevaluacionComponent},
          { path: 'evaluacion', component: EvaluacionComponent},
          { path: 'evaluacion/:id', component: EvaluacionComponent},
          { path: 'evaluacion/:idG/:id', component: EvaluacionComponent},
          { path: 'pregunta/:id', component: PreguntasComponent},
          { path: 'pregunta', component: PreguntasComponent},
          { path: 'quiz', component: QuizComponent},
          { path: 'quiz/:id', component: QuizComponent},
          { path: 'evaluaciones-deshabilitadas', component: ListevaluacionesdeshabilitadosComponent},
          { path: 'list-intentos', component: ListcolaboradoresintentosComponent},
          { path: 'list-resultados-evaluacion', component: ListresultadosevaluacionComponent},
        ]
    },
    //{ path: '', component: DashboardComponent },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

