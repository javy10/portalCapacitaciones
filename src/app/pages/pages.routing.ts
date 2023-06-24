
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './DOCUMENTO/dashboard/dashboard.component';
import { listCollaboratorComponent } from './COLABORADORES/listCollaborator/listcollaborator.component';
import { CollaboratorComponent } from './COLABORADORES/collaborator/collaborator.component';
import { UserGuardGuard } from '../Guard/user-guard.guard';
import { ListdocumentosComponent } from './DOCUMENTO/listdocumentos/listdocumentos.component';
import { DocumentosComponent } from './DOCUMENTO/documentos/documentos.component';
import { ArchivoComponent } from './DOCUMENTO/archivo/archivo.component';
import { BlankComponent } from './DOCUMENTO/blank/blank.component';
import { PerfilComponent } from './COLABORADORES/perfil/perfil.component';
import { TabperfilComponent } from './COLABORADORES/tab/tabperfil/tabperfil.component';
import { ListevaluacionComponent } from './EVALUACIONES/listevaluacion/listevaluacion.component';
import { EvaluacionComponent } from './EVALUACIONES/evaluacion/evaluacion.component';
import { TipodocumentoComponent } from './DOCUMENTO/tipodocumento/tipodocumento.component';
import { ListtipodocumentoComponent } from './DOCUMENTO/listtipodocumento/listtipodocumento.component';
import { ListcolaboradoresdeshabilitadosComponent } from './COLABORADORES/listcolaboradoresdeshabilitados/listcolaboradoresdeshabilitados.component';
import { ConfiguracionComponent } from './MENU/configuracion/configuracion.component';
import { ListconfiguracionComponent } from './MENU/listconfiguracion/listconfiguracion.component';
import { PermisosComponent } from './DOCUMENTO/permisos/permisos.component';
import { ListpermisosComponent } from './DOCUMENTO/listpermisos/listpermisos.component';
import { ListgrupoComponent } from './EVALUACIONES/listgrupo/listgrupo.component';
import { GrupoComponent } from './EVALUACIONES/grupo/grupo.component';
import { PreguntasComponent } from './EVALUACIONES/preguntas/preguntas.component';
import { QuizComponent } from './EVALUACIONES/quiz/quiz.component';
import { ListevaluacionesdeshabilitadosComponent } from './EVALUACIONES/listevaluacionesdeshabilitados/listevaluacionesdeshabilitados.component';
import { ListcolaboradoresintentosComponent } from './COLABORADORES/listcolaboradoresintentos/listcolaboradoresintentos.component';
import { ListresultadosevaluacionComponent } from './EVALUACIONES/listresultadosevaluacion/listresultadosevaluacion.component';
import { UserGuardGuardChild } from '../Guard/user-guard-child.guard';
import { ListdocumentosdeshabilitadosComponent } from './DOCUMENTO/listdocumentosdeshabilitados/listdocumentosdeshabilitados.component';

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
          { path: 'configuracion/:id/:idC/:idD/:idCa/:idM', component: ConfiguracionComponent},
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
          { path: 'pregunta/:idN/:id', component: PreguntasComponent},
          { path: 'pregunta', component: PreguntasComponent},
          { path: 'quiz', component: QuizComponent},
          { path: 'quiz/:id', component: QuizComponent},
          { path: 'evaluaciones-deshabilitadas', component: ListevaluacionesdeshabilitadosComponent},
          { path: 'list-intentos', component: ListcolaboradoresintentosComponent},
          { path: 'list-resultados-evaluacion', component: ListresultadosevaluacionComponent},
          { path: 'list-documentos-deshabilitados', component: ListdocumentosdeshabilitadosComponent},
        ]
    },
    //{ path: '', component: DashboardComponent },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

