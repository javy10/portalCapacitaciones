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

    getBuscarTipoDocumentos(datos: any): Observable<any> {
        return this.http.post<any>(this.url+'/buscarTipoDocumentos', datos)
    }

    getTiposDocumentos(): Observable<any> {
        return this.http.get<any>(this.url+'/tiposDocumentos')
    }

    getTipoDocumentoID(id: number): Observable<any> {
        return this.http.get<any>(this.url+'/tipoDocumentos/'+id)
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

    eliminarTipoDocumento(id: number): Observable<any> {
      return this.http.get<any>(this.url +'/eliminarTipoDocumento/'+id)
    }

    desbloquear(id: number): Observable<any> {
      //console.log(id)
      return this.http.get<any>(this.url +'/desbloquear/'+id)
    }

    saveDocumentos(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/documentos', datos);
    }

    saveTipoDocumento(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/tipoDocumento', datos);
    }

    editarTipoDocumento(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/editar', datos);
    }

    getDocumentoID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/documentoID/'+id)
    }

    getDetalleDocumentoID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/detalleDoc/'+id)
    }

    // PERMISOS*****
    getPermisos(): Observable<any> {
      return this.http.get<any>(this.url+'/permisos')
    }

    getDetallePermisosID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/detallePermisos/'+id)
    }
    getDetalleID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/detalleID/'+id)
    }








}
