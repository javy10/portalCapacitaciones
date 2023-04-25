
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
})
export class PagesModule { }
