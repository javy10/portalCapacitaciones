import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetclaveComponent } from './resetclave/resetclave.component';
import { CambiarclaveComponent } from './cambiarclave/cambiarclave.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetclaveComponent,
    CambiarclaveComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AuthModule { }
