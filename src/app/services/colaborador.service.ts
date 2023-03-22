import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  datos: any;

  // COLABORADOR ***********************************************************************************************************************************************
  getCollaborator(): Observable<Colaborador> {
    return this.http.get<Colaborador>(this.url+'/colaboradores');
  }
  saveColaborador(datos: any): Observable<any> {
    return this.http.post(this.url+'/register', datos);
    //return datos;
  }
  eliminar(id: number): Observable<any> {
    //console.log(id)
    return this.http.get<any>(this.url +'/eliminarcolaborador/'+id)
  }
  getColaboradorID(id: number) {
    return this.http.get<any>(this.url +'/colaborador/'+id)
  }

  editarColaborador(id: any, datos: any ): Observable<any> {
    return this.http.put(this.url+'/editarcolaborador/'+ id, datos);
  }

  desbloquear(id: number): Observable<any> {
    //console.log(id)
    return this.http.get<any>(this.url +'/desbloquear/'+id)
  }

  // login ***********************************************************************************************************************************************
  login(formData: any) {
    return this.http.post(this.url+'/login', formData)
  }
  logout() {
    return this.http.post(this.url+'/logout', {})
  }
  getColaboradorDui(dui: any) {
    return this.http.get<any>(this.url +'/login/'+dui)
  }
  editarIntentos(dui: any) {
    return this.http.get<any>(this.url +'/editarintentos/'+dui)
  }
  editarIntentosEquivocados (dui: any) {
    return this.http.get<any>(this.url +'/editarIntentosEquivocados/'+dui)
  }
  reestablecerClave(data: any) {
    return this.http.post<any>(this.url +'/password/reset', data)
  }

  //AGENCIA ***********************************************************************************************************************************************
  getAgencia(): Observable<Agencia> {
    return this.http.get<Agencia>(this.url+'/agencias')
  }
  getAgenciaId(id: number): Observable<any> {
    return this.http.get<any>(this.url +'/agencia/'+id)
  }


  //DEPARTAMENTO ***********************************************************************************************************************************************
  getDepartamento(): Observable<Departamento> {
    return this.http.get<Departamento>(this.url+'/departamentos');
  }
  getDepartamentoId(id: number): Observable<any> {
    return this.http.get<any>(this.url +'/departamento/'+id)
  }


  //CARGO ***********************************************************************************************************************************************
  postDeptCargo(id: number): Observable<any> {
    //console.log(id)
    return this.http.get<any>(this.url +'/cargos/'+id)
  }
  getCargoId(id: number): Observable<any> {
    return this.http.get<any>(this.url +'/cargo/'+id)
  }


}
