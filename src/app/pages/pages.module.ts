
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './DOCUMENTO/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { listCollaboratorComponent } from './COLABORADORES/listCollaborator/listcollaborator.component';
import { CollaboratorComponent } from './COLABORADORES/collaborator/collaborator.component';
import { DatatableComponent } from './COLABORADORES/datatable/dtcolaboradores/datatable.component';
import { ListdocumentosComponent } from './DOCUMENTO/listdocumentos/listdocumentos.component';
import { DtdocumentosComponent } from './DOCUMENTO/datatable/dtdocumentos/dtdocumentos.component';
import { DocumentosComponent } from './DOCUMENTO/documentos/documentos.component';
import { TabdocumentoComponent } from './DOCUMENTO/tab/tabdocumento/tabdocumento.component';
import { DtarchivodocumentosComponent } from './DOCUMENTO/datatable/dtarchivodocumentos/dtarchivodocumentos.component';
import { DtpermisodocumentosComponent } from './DOCUMENTO/datatable/dtpermisodocumentos/dtpermisodocumentos.component';
import { ArchivoComponent } from './DOCUMENTO/archivo/archivo.component';
import { BlankComponent } from './DOCUMENTO/blank/blank.component';
import { PerfilComponent } from './COLABORADORES/perfil/perfil.component';
import { CambiarclaveComponent } from './COLABORADORES/cambiarclave/cambiarclave.component';
import { TabperfilComponent } from './COLABORADORES/tab/tabperfil/tabperfil.component';
import { ListevaluacionComponent } from './EVALUACIONES/listevaluacion/listevaluacion.component';
import { DtevaluacionesComponent } from './EVALUACIONES/datatable/dtevaluaciones/dtevaluaciones.component';
import { TabevaluacionesComponent } from './EVALUACIONES/tab/tabevaluaciones/tabevaluaciones.component';
import { EvaluacionComponent } from './EVALUACIONES/evaluacion/evaluacion.component';
import { DtpreguntasComponent } from './EVALUACIONES/datatable/dtpreguntas/dtpreguntas.component';
import { DtgruposComponent } from './EVALUACIONES/datatable/dtgrupos/dtgrupos.component';
import { TipodocumentoComponent } from './DOCUMENTO/tipodocumento/tipodocumento.component';
import { ListtipodocumentoComponent } from './DOCUMENTO/listtipodocumento/listtipodocumento.component';
import { DttipodocumentosComponent } from './DOCUMENTO/datatable/dttipodocumentos/dttipodocumentos.component';
import { DtcolaboradoresdeshabilitadosComponent } from './COLABORADORES/datatable/dtcolaboradoresdeshabilitados/dtcolaboradoresdeshabilitados.component';
import { ListcolaboradoresdeshabilitadosComponent } from './COLABORADORES/listcolaboradoresdeshabilitados/listcolaboradoresdeshabilitados.component';
import { ConfiguracionComponent } from './MENU/configuracion/configuracion.component';
import { ListconfiguracionComponent } from './MENU/listconfiguracion/listconfiguracion.component';
import { DtconfiguracionComponent } from './MENU/datatable/dtconfiguracion/dtconfiguracion.component';
import { PermisosComponent } from './DOCUMENTO/permisos/permisos.component';
import { ListpermisosComponent } from './DOCUMENTO/listpermisos/listpermisos.component';
import { DtpermisosComponent } from './DOCUMENTO/datatable/dtpermisos/dtpermisos.component';
import { GrupoComponent } from './EVALUACIONES/grupo/grupo.component';
import { ListgrupoComponent } from './EVALUACIONES/listgrupo/listgrupo.component';
import { DtgrupoComponent } from './EVALUACIONES/datatable/dtgrupo/dtgrupo.component';
import { PreguntasComponent } from './EVALUACIONES/preguntas/preguntas.component';
import { QuizComponent } from './EVALUACIONES/quiz/quiz.component';
import { DtevaluacionesdeshabilitadasComponent } from './EVALUACIONES/datatable/dtevaluacionesdeshabilitadas/dtevaluacionesdeshabilitadas.component';
import { ListevaluacionesdeshabilitadosComponent } from './EVALUACIONES/listevaluacionesdeshabilitados/listevaluacionesdeshabilitados.component';
import { ListcolaboradoresintentosComponent } from './COLABORADORES/listcolaboradoresintentos/listcolaboradoresintentos.component';
import { DtcolaboradoresintentosComponent } from './COLABORADORES/datatable/dtcolaboradoresintentos/dtcolaboradoresintentos.component';
import { ListresultadosevaluacionComponent } from './EVALUACIONES/listresultadosevaluacion/listresultadosevaluacion.component';
import { DtresultadosevaluacionComponent } from './EVALUACIONES/datatable/dtresultadosevaluacion/dtresultadosevaluacion.component';
import { UserGuardGuardChild } from '../Guard/user-guard-child.guard';
import { DtmenuComponent } from './MENU/datatable/dtmenu/dtmenu.component';
import { ListdocumentosdeshabilitadosComponent } from './DOCUMENTO/listdocumentosdeshabilitados/listdocumentosdeshabilitados.component';
import { DtdocumentosdeshabilitadosComponent } from './DOCUMENTO/datatable/dtdocumentosdeshabilitados/dtdocumentosdeshabilitados.component';
import { PreguntasabiertasComponent } from './EVALUACIONES/preguntasabiertas/preguntasabiertas.component';
import { ConfigdepartamentocargoComponent } from './COLABORADORES/configdepartamentocargo/configdepartamentocargo.component';
import { QuizabiertoComponent } from './EVALUACIONES/quizabierto/quizabierto.component';
import { ListresultadosevaluacionabiertaComponent } from './EVALUACIONES/listresultadosevaluacionabierta/listresultadosevaluacionabierta.component';
import { DtresultadosevaluacionabiertaComponent } from './EVALUACIONES/datatable/dtresultadosevaluacionabierta/dtresultadosevaluacionabierta.component';
import { EditarevaluacionabiertaComponent } from './EVALUACIONES/editarevaluacionabierta/editarevaluacionabierta.component';
import { EditarevaluacionComponent } from './EVALUACIONES/editarevaluacion/editarevaluacion.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    listCollaboratorComponent,
    CollaboratorComponent,
    DatatableComponent,
    ListdocumentosComponent,
    DtdocumentosComponent,
    DocumentosComponent,
    TabdocumentoComponent,
    DtarchivodocumentosComponent,
    DtpermisodocumentosComponent,
    ArchivoComponent,
    BlankComponent,
    PerfilComponent,
    CambiarclaveComponent,
    TabperfilComponent,
    ListevaluacionComponent,
    DtevaluacionesComponent,
    TabevaluacionesComponent,
    EvaluacionComponent,
    DtpreguntasComponent,
    DtgruposComponent,
    TipodocumentoComponent,
    ListtipodocumentoComponent,
    DttipodocumentosComponent,
    DtcolaboradoresdeshabilitadosComponent,
    ListcolaboradoresdeshabilitadosComponent,
    ConfiguracionComponent,
    ListconfiguracionComponent,
    DtconfiguracionComponent,
    PermisosComponent,
    ListpermisosComponent,
    DtpermisosComponent,
    GrupoComponent,
    ListgrupoComponent,
    DtgrupoComponent,
    PreguntasComponent,
    QuizComponent,
    DtevaluacionesdeshabilitadasComponent,
    ListevaluacionesdeshabilitadosComponent,
    ListcolaboradoresintentosComponent,
    DtcolaboradoresintentosComponent,
    ListresultadosevaluacionComponent,
    DtresultadosevaluacionComponent,
    DtmenuComponent,
    ListdocumentosdeshabilitadosComponent,
    DtdocumentosdeshabilitadosComponent,
    PreguntasabiertasComponent,
    ConfigdepartamentocargoComponent,
    QuizabiertoComponent,
    ListresultadosevaluacionabiertaComponent,
    DtresultadosevaluacionabiertaComponent,
    EditarevaluacionabiertaComponent,
    EditarevaluacionComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
    UserGuardGuardChild
  ]
})
export class PagesModule { }
