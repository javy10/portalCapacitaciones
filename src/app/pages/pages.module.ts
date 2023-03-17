
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { listCollaboratorComponent } from './listCollaborator/listcollaborator.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { DatatableComponent } from './datatable/datatable.component';
import { ListevaluationComponent } from './listevaluation/listevaluation.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { TabsComponent } from './tabs/tabs.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    listCollaboratorComponent,
    CollaboratorComponent,
    DatatableComponent,
    ListevaluationComponent,
    EvaluationComponent,
    TabsComponent,
    PreguntaComponent,
    
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
  // providers: [
  //   CookieService,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true
  //   }
  // ],
})
export class PagesModule { }
