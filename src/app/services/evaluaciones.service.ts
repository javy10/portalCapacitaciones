import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {

  constructor(private http:HttpClient) { }
  url = 'http://127.0.0.1:8000/api';

  saveGrupo(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/crearGrupo', datos);
  }

  saveDetalleGrupo(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/crearDetalleGrupo', datos);
  }



}
