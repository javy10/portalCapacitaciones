import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  token = localStorage.getItem('token');

  

  // COLABORADOR ***********************************************************************************************************************************************
  getCollaborator(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url+'/colaboradores', { headers });
  }
  getCollaboratorDeshabilitados(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url+'/colaboradoresDeshabilitados', { headers });
  }

  saveColaborador(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(datos)
    // return this.http.post(this.url+'/register', datos);
    return this.http.post(this.url+'/colaborador', datos, { headers });
    //return datos;
  }
  eliminar(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    //console.log(id)
    return this.http.get<any>(this.url +'/eliminarcolaborador/'+id, { headers })
  }

  getColaboradorID(id: number) {
    console.log(this.token)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/colaborador/'+id, { headers })
  }

  getobtenerColaboradorID(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/obtenerColaboradorID/'+id, { headers })
  }

  getColaboradorClave(datos: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.post<any>(this.url +'/buscarPorClave', datos, { headers })
  }

  editarColaborador(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(datos)
    return this.http.post(this.url+'/editarcolaborador', datos, { headers });
  }

  desbloquear(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    //console.log(id)
    return this.http.get<any>(this.url +'/desbloquear/'+id, { headers })
  }

  getFotoURL(datos: any): Observable<any> {
    console.log(datos)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get(this.url+'/fotoURL/'+datos, { responseType: 'blob', headers });
  }

  editarPassword(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(datos)
    return this.http.post(this.url+'/editPassword', datos, { headers });
  }
  

  // login ***********************************************************************************************************************************************
  login(formData: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.post(this.url+'/login', formData, { headers })
  }
  logout() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.post(this.url+'/logout', {headers})
  }
  getColaboradorDui(dui: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/login/'+dui, { headers })
  }
  editarIntentos(dui: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/editarintentos/'+dui, { headers })
  }
  editarIntentosEquivocados (dui: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/editarIntentosEquivocados/'+dui, { headers })
  }
  reestablecerClave(data: any): Observable<any>  {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(data)
    return this.http.post<any>(this.url +'/recover-password', data, { headers })
  }

  editarEntrada(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(datos)
    return this.http.post(this.url+'/editarEntrada', datos, { headers });
  }

  editarSalida(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(datos)
    return this.http.post(this.url+'/editarSalida', datos, { headers });
  }

  cambiarClaveNueva(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(datos)
    return this.http.post(this.url+'/editPassword', datos, { headers });
  }

  obtenerUsersPorEmail(email: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(email)
    return this.http.get(this.url+'/obtenerUsersPorEmail/'+email, { headers });
  }




  //AGENCIA ***********************************************************************************************************************************************
  getAgencia(): Observable<Agencia> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<Agencia>(this.url+'/agencias', { headers })
  }
  getAgenciaId(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/agencia/'+id, { headers })
  }


  //DEPARTAMENTO ***********************************************************************************************************************************************
  getDepartamento(): Observable<Departamento> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<Departamento>(this.url+'/departamentos', { headers });
  }
  getDepartamentoId(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/departamento/'+id, { headers })
  }


  //CARGO ***********************************************************************************************************************************************
  postDeptCargo(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    //console.log(id)
    return this.http.get<any>(this.url +'/cargos/'+id, { headers })
  }
  getCargoId(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url +'/cargo/'+id, { headers })
  }

  getCargo(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<any>(this.url+'/cargos', { headers });
  }

  saveCargo(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    console.log(datos)
    // return this.http.post(this.url+'/register', datos);
    return this.http.post(this.url+'/guardarCargo', datos, { headers });
    //return datos;
  }







}
