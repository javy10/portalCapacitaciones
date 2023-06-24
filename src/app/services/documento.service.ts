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

    getDocumentosPorDatos(datos:any): Observable<any> {
      console.log(datos)
      return this.http.post<any>(this.url+'/documentosList', datos);
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

    eliminarDetalledocumentos(id: number): Observable<any> {
      return this.http.get<any>(this.url +'/eliminarDetalledocumentos/'+id)
    }

    eliminarTipoDocumento(id: number): Observable<any> {
      return this.http.get<any>(this.url +'/eliminarTipoDocumento/'+id)
    }

    eliminarDetallePermiso(id: number): Observable<any> {
      return this.http.get<any>(this.url +'/eliminarDetallePermiso/'+id)
    }

    desbloquear(id: number): Observable<any> {
      //console.log(id)
      return this.http.get<any>(this.url +'/desbloquear/'+id)
    }

    savePermiso(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/guardarPermiso', datos);
    }

    saveDocumentos(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/documentos', datos);
    }

    saveDetalleDocumentos(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/guardarDetalle', datos);
    }

    editarDocumentos(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/editarDocumento', datos);
    }

    editarPermiso(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/editarPermiso', datos);
    }

    editarDetallePermiso(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/editarDetallePermiso', datos);
    }

    editarDetalleDocumentos(datos: any): Observable<any> {
      console.log(datos)
      return this.http.post(this.url+'/editarDetalleDocumento', datos);
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

    getDocumentoDeshabilitadosID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/documentoDeshabilitadosID/'+id)
    }

    getDetalleDocumentoID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/detalleDoc/'+id)
    }

    getDocumentoDetalleID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/detalleDocumento/'+id)
    }


    // PERMISOS*****
    getPermisos(): Observable<any> {
      return this.http.get<any>(this.url+'/permisos')
    }

    getDetallePermisosID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/detallePermisos/'+id)
    }

    getBuscarColaboradoresPermisos(id: any) {
      console.log(id)
      return this.http.get<any>(this.url +'/buscarColaboradoresPermisos/'+id)
    }

    // detalleID(id: number) {
    //   console.log(id)
    //   return this.http.get<any>(this.url +'/detalleID/'+id)
    // }

    getObtenerDetallePermiso() {
      
      return this.http.get<any>(this.url +'/obtenerDetallePermiso')
    }

    getDetalleID(id: number) {
      console.log(id)
      return this.http.get<any>(this.url +'/detalleID/'+id)
    }

    // MENUS
    getMenus(): Observable<any> {
      return this.http.get<any>(this.url+'/menus')
  }







}
