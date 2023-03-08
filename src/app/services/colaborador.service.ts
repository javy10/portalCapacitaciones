import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agencia } from '../interfaces/agencia';
import { Colaborador } from '../interfaces/colaborador';
import { Departamento } from '../interfaces/departamento';


@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  url = 'http://127.0.0.1:8000/api';
  constructor(private http:HttpClient) { }

  listCollaborator: Colaborador[] = [
    {position: 1, foto: 'Hydrogen', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 2, foto: 'Helium', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 3, foto: 'Lithium', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 4, foto: 'Beryllium', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 5, foto: 'Boron', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 6, foto: 'Carbon', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 7, foto: 'Nitrogen', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 8, foto: 'Oxygen', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 9, foto: 'Fluorine', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
    {position: 10, foto: 'Neon', oficina: 'Oficina central', departamento: 'Staff', cargo: 'Analista de programacion', ultimoIngreso: '06/03/2023'},
  ];

  getCollaborator() {
    // devuelve una copia del listado collaborator
    return this.listCollaborator.slice();
  }

  getAgencia(): Observable<Agencia> {
    return this.http.get<Agencia>(this.url+'/agencias');
  }
  getDepartamento(): Observable<Departamento> {
    return this.http.get<Departamento>(this.url+'/departamentos');
  }

}
