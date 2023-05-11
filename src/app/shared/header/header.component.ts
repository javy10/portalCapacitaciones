
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
  agencia:any;
  cargo = 0;
  id = localStorage.getItem('id');
  foto: any;
  imgTamanio:any;
  avatar = '../../../assets/img/avatar1.png';

  ngOnInit(): void {
    const Id = localStorage.getItem('id');
    new Promise(resolve => resolve(this.colaboradorService.getColaboradorID(parseInt(Id!)).subscribe((res) => {
      this.eliminarSesion();
      console.log(res.dataDB);
      this.foto = res.dataDB.foto;
      console.log(this.foto)
      this.nombre = res.dataDB.nombres.split(' ')[0];
      this.apellido = res.dataDB.apellidos.split(' ')[0];
      new Promise(resolve => resolve(this.colaboradorService.getAgenciaId(res.dataDB.agencia_id).subscribe((resp) => {
        console.log(resp.dataDB)
        this.agencia = resp.dataDB.codAgencia;
        console.log(this.agencia)
      })));
      new Promise(resolve => resolve(this.colaboradorService.getCargoId(res.dataDB.cargo_id).subscribe((resp) => {
        console.log(resp)
        this.cargo = resp.dataDB.nombre;
        console.log(this.cargo)
      })));
      this.colaboradorService.getFotoURL(this.foto).subscribe((data: any) => {
        //this.isLoading = false;
   
        setTimeout(() => {
          const imagenPrevisualizacion = document.querySelector("#img") as HTMLInputElement;
          this.imgTamanio = data.size;
          let binaryData = [];
          binaryData.push(data); 
          let foo = URL.createObjectURL(new Blob(binaryData, {type: 'image/jpeg'}));
          this.imgTamanio == 13 ? imagenPrevisualizacion.src = this.avatar : imagenPrevisualizacion.src = foo;
        }, 100);
      });
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
