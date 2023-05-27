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

  saveEvaluacion(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/crearEvaluacion', datos);
  }

  editarEvaluacionDetalleGrupo(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/editarEvalaucionDetalleGrupo', datos);
  }

  editarCantidadPreguntas(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/editarCantidadPreguntas', datos);
  }

  getObtenerGrupo(): Observable<any> {
    return this.http.get(this.url+'/obtenerGrupo');
  }

  getEvaluaciones(): Observable<any> {
    return this.http.get(this.url+'/obtenerEvaluaciones');
  }

  getTipoPregunta(): Observable<any> {
    return this.http.get(this.url+'/obtenerTipoPregunta');
  }
 
  savePreguntas(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/crearPreguntas', datos);
  }

  saveRespuestas(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/crearRespuestas', datos);
  }

  getConteoPreguntas(id: number): Observable<any> {
    return this.http.get<any>(this.url +'/conteoPreguntas/'+id)
  }

  getEvaluacionId(id: number): Observable<any> {
    return this.http.get<any>(this.url+'/obtenerEvaluacionID/'+id)
  }

  editarEvaluacion(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/editarEvaluacion', datos);
  }

  eliminarEvaluacion(id: number): Observable<any> {
    return this.http.get<any>(this.url +'/eliminarEvaluacion/'+id)
  }

  getGrupoId(id: number): Observable<any> {
    console.log(id)
    return this.http.get<any>(this.url+'/obtenerGrupoID/'+id)
  }

  obtenerColaboradoresGrupoID(id: number): Observable<any> {
    console.log(id)
    return this.http.get<any>(this.url+'/obtenerColaboradoresGrupoID/'+id)
  }


}
