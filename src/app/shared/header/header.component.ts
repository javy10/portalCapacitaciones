
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router, public colaboradorService: ColaboradorService) {
    this.eliminarSesion();
  }

  private sessionTimeoutInMinutes = 5;
  private timeoutHandle: any;

  nombre = '';
  apellido = '';
  agencia = 0;
  cargo = 0;
  id = localStorage.getItem('id');

  ngOnInit(): void {
    this.eliminarSesion();
    const Id = localStorage.getItem('id');
    new Promise(resolve => resolve(this.colaboradorService.getColaboradorID(parseInt(Id!)).subscribe((res) => {
      console.log(res.dataDB);
      this.nombre = res.dataDB.nombres.split(' ')[0];
      this.apellido = res.dataDB.apellidos.split(' ')[0];
      new Promise(resolve => resolve(this.colaboradorService.getAgenciaId(res.dataDB.agencia_id).subscribe((resp) => {
        //console.log(resp)
        this.agencia = resp.dataDB.codAgencia;
      })));
      new Promise(resolve => resolve(this.colaboradorService.getCargoId(res.dataDB.cargo_id).subscribe((resp) => {
        console.log(resp)
        this.cargo = resp.dataDB.nombre;
      })));
    })));
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('logeado');
    this.router.navigate(['/login']);
    // this._colaboradorService.logout().subscribe((data: any) => {
    // });
  }
  eliminarSesion() {
    setTimeout(() => {
      localStorage.removeItem('token');
      window.location.reload();
    }, 6 * 60 * 60 * 1000); // 6 horas en milisegundos
  }

  perfil(){
    //[routerLink]="['/dashboard/collaborator', item.id]"
    this.router.navigate(['/dashboard/tabperfil/'+ this.id]);
  }





}
