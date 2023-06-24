import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ColaboradorService } from './services/colaborador.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pcFrontEnd';
  logs:any;
  cont:any = 0;
  conteo:any = 0;

  private inactivityTime: number = 0;
  private readonly MAX_INACTIVITY_TIME: number = 300000; // 5 minutes in milliseconds
  
  constructor(private datePipe: DatePipe,  private colaboradorService: ColaboradorService, private router: Router, private toastr: ToastrService,) {
   
  }

  @HostListener('window:mousemove')
  @HostListener('window:click')
  @HostListener('window:keydown')
  resetInactivityTimer() {
    this.inactivityTime = 0;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initInactivityTimer();
    this.eliminarSesion();
  }
  
  // private initInactivityTimer() {
    
  //   console.log(this.inactivityTime)
  //   setInterval(() => {
  //       console.log(this.inactivityTime)
  //       this.inactivityTime += 1800000;
  //       if (this.inactivityTime >= this.MAX_INACTIVITY_TIME) {
  //         if(this.conteo == 0) {
  //           this.conteo = 1;
  //           this.toastr.info('Tiempo de inactividad excedido. Cerrando sesión...!', 'Información!');
  //           this.logout();
  //         }
  //       } 
  //   }, 1800000);
    
  // }

  private initInactivityTimer() {
    console.log(this.inactivityTime);
    setInterval(() => {
      console.log(this.inactivityTime);
      this.inactivityTime += 1800000;
      if (this.inactivityTime >= this.MAX_INACTIVITY_TIME) {
        if (this.conteo == 0) {
          this.conteo = 1;
          this.toastr.info(
            'Tiempo de inactividad excedido. Cerrando sesión...!',
            'Información!'
          );
          this.logout();
        }
      }
    }, 1800000);
  
    // Add event listeners to reset inactivityTime
    document.addEventListener('mousemove', () => {
      this.inactivityTime = 0;
    });
    document.addEventListener('click', () => {
      this.inactivityTime = 0;
    });
  }




  logout() {

    this.logsSalida();

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('logeado');
    localStorage.removeItem('idUserResetPass');
    this.router.navigate(['/login']);

  }

  eliminarSesion() {
    setTimeout(() => {
      this.logsSalida();
      localStorage.removeItem('token');
      window.location.reload();
    }, 4 * 3600000); // 4 horas en milisegundos
  }

  logsSalida() {
    if(this.cont == 0) {
      this.cont = 1;
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
        console.log(respuest)
      });
    }
  }




}
