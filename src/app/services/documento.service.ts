import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http:HttpClient) { }
    url = 'http://127.0.0.1:8000/api';
    datos: any;

    public sharedDataDoc: any;
    public sharedDataPer: any;

    //TIPODOCUMENTO ***********************************************************************************************************************************************
    getTipoDocumentos(): Observable<any> {
        return this.http.get<any>(this.url+'/tipoDocumentos')
    }

    getDocumentos(): Observable<any> {
      return this.http.get<any>(this.url+'/documentos');
    }

    getListaDocumentos(): Observable<any> {
      return this.http.get<any>(this.url+'/listaDocumentos');
    }

    getDocumentoURL(datos: any): Observable<any> {
      console.log(datos)
      return this.http.get(this.url+'/documentos/'+datos, { responseType: 'blob' });
    }

    eliminar(id: number): Observable<any> {
      return this.http.get<any>(this.url +'/eliminardocumentos/'+id)
    }

    saveDocumentos(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/documentos', datos);
    }

    // PERMISOS*****
    getPermisos(): Observable<any> {
      return this.http.get<any>(this.url+'/permisos')
    }








}
