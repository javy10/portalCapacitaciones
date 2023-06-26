import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http:HttpClient) { }
    url = 'http://127.0.0.1:8000/api';
    datos: any;

    token = localStorage.getItem('token');

    public sharedDataDoc: any;
    public sharedDataPer: any;

    //TIPODOCUMENTO ***********************************************************************************************************************************************
    getTipoDocumentos(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
        return this.http.get<any>(this.url+'/tipoDocumentos', { headers })
    }

    getBuscarTipoDocumentos(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
        return this.http.post<any>(this.url+'/buscarTipoDocumentos', datos, { headers })
    }

    getTiposDocumentos(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
        return this.http.get<any>(this.url+'/tiposDocumentos', { headers })
    }

    getTipoDocumentoID(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
        return this.http.get<any>(this.url+'/tipoDocumentos/'+id, { headers })
    }

    getDocumentos(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url+'/documentos', { headers });
    }

    getDocumentosPorDatos(datos:any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post<any>(this.url+'/documentosList', datos, { headers });
    }

    getListaDocumentos(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url+'/listaDocumentos', { headers });
    }

    getDocumentoURL(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.get(this.url+'/documentos/'+datos, { responseType: 'blob', headers });
    }

    eliminar(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url +'/eliminardocumentos/'+id, { headers })
    }

    eliminarDetalledocumentos(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url +'/eliminarDetalledocumentos/'+id, { headers })
    }

    eliminarTipoDocumento(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url +'/eliminarTipoDocumento/'+id, { headers })
    }

    eliminarDetallePermiso(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url +'/eliminarDetallePermiso/'+id, { headers })
    }

    desbloquear(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      //console.log(id)
      return this.http.get<any>(this.url +'/desbloquear/'+id, { headers })
    }

    savePermiso(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/guardarPermiso', datos, { headers });
    }

    saveDocumentos(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/documentos', datos, { headers });
    }

    saveDetalleDocumentos(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/guardarDetalle', datos, { headers });
    }

    editarDocumentos(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/editarDocumento', datos, { headers });
    }

    editarPermiso(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/editarPermiso', datos, { headers });
    }

    editarDetallePermiso(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/editarDetallePermiso', datos, { headers });
    }

    editarDetalleDocumentos(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/editarDetalleDocumento', datos, { headers });
    }

    saveTipoDocumento(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/tipoDocumento', datos, { headers });
    }

    editarTipoDocumento(datos: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(datos)
      return this.http.post(this.url+'/editar', datos, { headers });
    }

    getDocumentoID(id: any) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(id)
      return this.http.get<any>(this.url +'/documentoID/'+id, { headers })
    }

    getDocumentoDeshabilitadosID(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(id)
      return this.http.get<any>(this.url +'/documentoDeshabilitadosID/'+id, { headers })
    }

    getDetalleDocumentoID(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(id)
      return this.http.get<any>(this.url +'/detalleDoc/'+id, { headers })
    }

    getDocumentoDetalleID(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(id)
      return this.http.get<any>(this.url +'/detalleDocumento/'+id, { headers })
    }


    // PERMISOS*****
    getPermisos(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url+'/permisos', { headers })
    }

    getDetallePermisosID(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(id)
      return this.http.get<any>(this.url +'/detallePermisos/'+id, { headers })
    }

    getBuscarColaboradoresPermisos(id: any) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(id)
      return this.http.get<any>(this.url +'/buscarColaboradoresPermisos/'+id, { headers })
    }

    // detalleID(id: number) {
    //   console.log(id)
    //   return this.http.get<any>(this.url +'/detalleID/'+id)
    // }

    getObtenerDetallePermiso() {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url +'/obtenerDetallePermiso', { headers })
    }

    getDetalleID(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      console.log(id)
      return this.http.get<any>(this.url +'/detalleID/'+id, { headers })
    }

    // MENUS
    getMenus(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      return this.http.get<any>(this.url+'/menus', { headers })
  }







}
