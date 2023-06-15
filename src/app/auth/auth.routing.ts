import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetclaveComponent } from './resetclave/resetclave.component';
import { CambiarclaveComponent } from './cambiarclave/cambiarclave.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'reset', component: ResetclaveComponent },
    { path: 'cambiar-clave', component: CambiarclaveComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
