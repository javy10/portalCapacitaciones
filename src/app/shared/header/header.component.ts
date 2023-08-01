

import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  
  private sessionTimeoutInMinutes = 5;
  private timeoutHandle: any;
  @Input() datosUsuario: any;
  
  nombre = '';
  apellido = '';
  agencia:any;
  cargo = 0;
  cargos:any[] = [];
  id = localStorage.getItem('id');
  foto: any;
  imgTamanio:any;
  avatar = '../../../assets/img/avatar1.png';
  logs:any;
  
  constructor(private router: Router, public colaboradorService: ColaboradorService, private datePipe: DatePipe) {
    //this.eliminarSesion();
    
  }
  
  ngOnInit(): void {
    const Id = localStorage.getItem('id');
    setTimeout(() => {
      //console.log(this.datosUsuario)
      this.foto = this.datosUsuario[0].foto;
      this.nombre = this.datosUsuario[0].nombres.split(' ')[0];
      this.apellido = this.datosUsuario[0].apellidos.split(' ')[0];
      this.agencia = this.datosUsuario[0].codAgencia;
      for(let i=0 ;i<this.datosUsuario.length;i++){
        this.cargos.push(this.datosUsuario[i].Cargo)
      }
      const spanElementos = document.getElementById('elementos');
      for (const elemento of this.cargos) {
        const span = document.createElement('span');
        span.textContent = elemento;
        spanElementos!.appendChild(span);
        spanElementos!.appendChild(document.createElement('br'));
      }
      if(this.foto) {
        this.colaboradorService.getFotoURL(this.foto).subscribe((data: any) => {
          setTimeout(() => {
            const imagenPrevisualizacion = document.querySelector("#img") as HTMLInputElement;
            this.imgTamanio = data.size;
            let binaryData = [];
            binaryData.push(data); 
            let foo = URL.createObjectURL(new Blob(binaryData, {type: 'image/jpeg'}));
            this.imgTamanio == 13 ? imagenPrevisualizacion.src = this.avatar : imagenPrevisualizacion.src = foo;
          }, 100);
        });
      }
    }, 2500);
      

    // ocultar el sidebar con menu hamburguesa - toggle
    const ocuultar = document.getElementById("ocuultar") as HTMLInputElement;
    let cont = 0;
    ocuultar.addEventListener("click", function() {
      if (cont == 0) {
        document.body.classList.add('toggle-sidebar');
        cont = 1;
      } else {
        document.body.classList.remove('toggle-sidebar');
        cont = 0;
      }
    });

    // Escucha eventos de actividad del usuario para restablecer el temporizador de sesión
    // document.addEventListener('mousemove',  this.eliminarSesion);
    // document.addEventListener('keydown',  this.eliminarSesion);
    // document.addEventListener('click',  this.eliminarSesion);
  }

  async obtenerColaboradorID(){
    
  }
  
  logout() {

    this.logsSalida();

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('logeado');
    this.router.navigate(['/login']);

  }

  eliminarSesion() {
    setTimeout(() => {
      this.logsSalida();
      localStorage.removeItem('token');
      window.location.reload();
    // }, 6 * 60 * 60 * 1000); // 6 horas en milisegundos
    }, 4 * 3600000); // 4 horas en milisegundos
  }

  perfil(){
    //[routerLink]="['/dashboard/collaborator', item.id]"
    this.router.navigate(['/dashboard/tabperfil/'+ this.id]);
  }

  logsSalida() {
    let fechaFormateadaHoy = '';
    let today = new Date();
    const fechaISO = today.toISOString();
    let fechaHoy = new Date(fechaISO)
    fechaFormateadaHoy = this.datePipe.transform(fechaHoy, 'yyyy-MM-dd HH:mm:ss')!;

    this.logs = {
      'colaborador_id': localStorage.getItem('id'),
      'fechaSalida': fechaFormateadaHoy,
    }

    this.colaboradorService.editarSalida(this.logs).subscribe((respuest) => {
      //console.log(respuest)
    });
  }



}
