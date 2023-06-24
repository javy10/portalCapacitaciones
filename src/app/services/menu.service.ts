import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  url = 'http://127.0.0.1:8000/api';
  datos: any;

  savePermisos(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/configuracion', datos);
  }

  getDetallePermiso(datos:any): Observable<any> {
    console.log(datos)
    return this.http.post<any>(this.url+'/detallePermisosMenu', datos);
  }

  getDetallePermisoConfiguracion(datos:any): Observable<any> {
    console.log(datos)
    return this.http.post<any>(this.url+'/detallePermisosMenuConfiguracion', datos);
  }

  getObtenerDetalle(): Observable<any> {
    return this.http.get<any>(this.url+'/obtenerDetalle');
  }

  editarPermisos(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/editarconfiguracion', datos);
  }

  getMenus(): Observable<any> {
    return this.http.get<any>(this.url+'/menus');
  }

  getDetallePermisosMenu(id:any): Observable<any> {
    return this.http.get<any>(this.url+'/detallePermisosMenu/'+id);
  }

  editarDetallePermisoMenu(datos: any): Observable<any> {
    console.log(datos)
    return this.http.post(this.url+'/editarDetallePermisosMenu', datos);
  }


}
