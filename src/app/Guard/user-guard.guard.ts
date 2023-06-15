import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { ColaboradorService } from '../services/colaborador.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

  constructor( private router: Router, private menuService: MenuService,  public colaboradorService: ColaboradorService, ) {

  }

  departamento_id: any;
  listaDetalle:any=[];
  idCargo:any;
  idDepar:any;
  idUser:any;
  idMenu:any;


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie: string = localStorage.getItem('token')!;

    let retorna = false;
    if(!cookie){
      retorna = false;
      this.router.navigate(['/login']);
    } else {
      retorna = true;
    }
    return retorna;
  }


 




}
