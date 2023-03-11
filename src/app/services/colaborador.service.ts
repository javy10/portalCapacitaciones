import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Agencia } from '../interfaces/agencia';
import { Colaborador } from '../interfaces/colaborador';
import { Departamento } from '../interfaces/departamento';
import { LoginForm } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http:HttpClient) { }

  url = 'http://127.0.0.1:8000/api';


  getCollaborator(): Observable<Colaborador> {
    return this.http.get<Colaborador>(this.url+'/colaboradores');
  }

  getAgencia(): Observable<Agencia> {
    return this.http.get<Agencia>(this.url+'/agencias');
  }
  getDepartamento(): Observable<Departamento> {
    return this.http.get<Departamento>(this.url+'/departamentos');
  }
  postDeptCargo(id: number): Observable<any> {
    //console.log(id)
    return this.http.get<any>(this.url +'/cargos/'+id)
  }

  saveColaborador(datos: any): Observable<any> {
    return this.http.post(this.url+'/colaborador', datos);
    //return datos;
  }

  // login
  login(formData: LoginForm) {
    return this.http.post(this.url+'/login', formData)
  }

}
