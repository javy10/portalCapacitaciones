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

  getEvaluacionesDeshabilitadas(): Observable<any> {
    return this.http.get(this.url+'/obtenerEvaluacionesDeshabilitadas');
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
  
  editarGrupo(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/editarGrupo', datos);
  }
  
  editarDetalleGrupo(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/editarDetalleGrupo', datos);
  }
  
  eliminar(id: number): Observable<any> {
    return this.http.get<any>(this.url +'/eliminarGrupo/'+id)
  }
  
  // obtenerPreguntas(id: number): Observable<any> {
  //   console.log(id)
  //   return this.http.get<any>(this.url+'/obtenerPreguntasQuiz/'+id)
  // }
  obtenerPreguntas(datos:any): Observable<any> {
    console.log(datos)
    return this.http.post<any>(this.url+'/obtenerPreguntasQuiz', datos)
  }
  
  obtenerRespuestas(id: number): Observable<any> {
    console.log(id)
    return this.http.get<any>(this.url+'/obtenerRespestasQuiz/'+id)
  }
  
  getObtenerRespuestaCorrecta(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/obtenerRespuestaCorrecta', datos);
  }
  
  saveResultadopreguntas(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/guardarResultadoPreguntas', datos);
  }
  
  getObtenerDetalleGrupoEvaluacion(id: number): Observable<any> {
    console.log(id)
    return this.http.get<any>(this.url+'/obtenerDetalleGrupoEvaluacion/'+id)
  }
  
  editarIntentosEvaluacion(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post<any>(this.url+'/editarIntentosEvaluacion', datos)
  }
  
  habilitarEvaluacion(id: any): Observable<any> {
    console.log(id)
    return this.http.get(this.url+'/habilitarEvaluacion/'+id);
  }
  
  getIntentosColaboradores(): Observable<any> {
    return this.http.get(this.url+'/intentosColaboradores');
  }
  
  habilitarIntentosEvaluacion(id: any): Observable<any> {
    console.log(id)
    return this.http.get(this.url+'/habilitarIntentosEvaluacion/'+id);
  }

  getObtenerResultadosEvaluacion(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/obtenerResultadosEvaluacion', datos);
  }


}
