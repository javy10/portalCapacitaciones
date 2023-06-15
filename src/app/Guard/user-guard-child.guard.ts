import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { ColaboradorService } from '../services/colaborador.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuardChild implements CanActivateChild {

  constructor( private router: Router, private menuService: MenuService,  public colaboradorService: ColaboradorService, ) {

  }
  
  departamento_id: any;
  listaDetalle:any=[];
  idCargo:any;
  idDepar:any;
  idUser:any;
  idMenu:any;

  valido:any = false;


  async canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {

    const Id = localStorage.getItem('id');
    //console.log(Id)
    
    this.colaboradorService.getColaboradorID(parseInt(Id!)).subscribe((res) => {
      this.departamento_id = res.dataDB.departamento_id;

      const formData = new FormData();
      formData.append('id', Id!.toString()),
      formData.append('idDepart', this.departamento_id),
      
      //console.log(this.departamento_id)
  
      this.menuService.getDetallePermiso(formData).subscribe((data: any) => {
        this.listaDetalle = data;
        //console.log(this.valido)
        for (let i = 0; i < this.listaDetalle.length; i++) {
          if (this.listaDetalle[i].colaborador_id == Id  || (this.listaDetalle[i].cargo_id == res.dataDB.cargo_id && this.listaDetalle[i].departamento_id == res.dataDB.departamento_id )) 
          {
            this.valido = true;
          } else {
            this.valido = false;
          }
        }
        
      });
    });

    //console.log(this.valido)

    if(this.valido) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
    
  }
  


}
