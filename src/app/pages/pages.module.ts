
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { listCollaboratorComponent } from './listCollaborator/listcollaborator.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { DatatableComponent } from './datatable/datatable.component';
import { ListdocumentosComponent } from './listdocumentos/listdocumentos.component';
import { DtdocumentosComponent } from './datatable/dtdocumentos/dtdocumentos.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { TabdocumentoComponent } from './tabs/tabdocumento/tabdocumento.component';
import { DtarchivodocumentosComponent } from './datatable/dtarchivodocumentos/dtarchivodocumentos.component';
import { DtpermisodocumentosComponent } from './datatable/dtpermisodocumentos/dtpermisodocumentos.component';
import { ArchivoComponent } from './archivo/archivo.component';
import { BlankComponent } from './blank/blank.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CambiarclaveComponent } from './cambiarclave/cambiarclave.component';
import { TabperfilComponent } from './tabs/tabperfil/tabperfil.component';
import { ListevaluacionComponent } from './listevaluacion/listevaluacion.component';
import { DtevaluacionesComponent } from './datatable/dtevaluaciones/dtevaluaciones.component';
import { TabevaluacionesComponent } from './tabs/tabevaluaciones/tabevaluaciones.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { DtpreguntasComponent } from './datatable/dtpreguntas/dtpreguntas.component';
import { DtgruposComponent } from './datatable/dtgrupos/dtgrupos.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { ListtipodocumentoComponent } from './listtipodocumento/listtipodocumento.component';
import { DttipodocumentosComponent } from './datatable/dttipodocumentos/dttipodocumentos.component';
import { DtcolaboradoresdeshabilitadosComponent } from './datatable/dtcolaboradoresdeshabilitados/dtcolaboradoresdeshabilitados.component';
import { ListcolaboradoresdeshabilitadosComponent } from './listcolaboradoresdeshabilitados/listcolaboradoresdeshabilitados.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ListconfiguracionComponent } from './listconfiguracion/listconfiguracion.component';
import { DtconfiguracionComponent } from './datatable/dtconfiguracion/dtconfiguracion.component';
import { PermisosComponent } from './permisos/permisos.component';
import { ListpermisosComponent } from './listpermisos/listpermisos.component';
import { DtpermisosComponent } from './datatable/dtpermisos/dtpermisos.component';
import { GrupoComponent } from './grupo/grupo.component';
import { ListgrupoComponent } from './listgrupo/listgrupo.component';
import { DtgrupoComponent } from './datatable/dtgrupo/dtgrupo.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { QuizComponent } from './quiz/quiz.component';
import { DtevaluacionesdeshabilitadasComponent } from './datatable/dtevaluacionesdeshabilitadas/dtevaluacionesdeshabilitadas.component';
import { ListevaluacionesdeshabilitadosComponent } from './listevaluacionesdeshabilitados/listevaluacionesdeshabilitados.component';
import { ListcolaboradoresintentosComponent } from './listcolaboradoresintentos/listcolaboradoresintentos.component';
import { DtcolaboradoresintentosComponent } from './datatable/dtcolaboradoresintentos/dtcolaboradoresintentos.component';
import { ListresultadosevaluacionComponent } from './listresultadosevaluacion/listresultadosevaluacion.component';
import { DtresultadosevaluacionComponent } from './datatable/dtresultadosevaluacion/dtresultadosevaluacion.component';
import { UserGuardGuardChild } from '../Guard/user-guard-child.guard';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
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
    DtresultadosevaluacionComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
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
