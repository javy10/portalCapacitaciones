import { DatePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ColaboradorService } from './services/colaborador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pcFrontEnd';
  logs:any;
  cont:any = 0;

  private inactivityTime: number = 0;
  private readonly MAX_INACTIVITY_TIME: number = 300000; // 5 minutes in milliseconds
  
  constructor(private datePipe: DatePipe,  private colaboradorService: ColaboradorService, private router: Router) {
    this.initInactivityTimer();
    this.eliminarSesion();
  }

  @HostListener('window:mousemove')
  @HostListener('window:click')
  @HostListener('window:keydown')
  resetInactivityTimer() {
    this.inactivityTime = 0;
  }

  private initInactivityTimer() {
    
    setInterval(() => {
        this.inactivityTime += 30 * 60 * 1000;
        if (this.inactivityTime >= this.MAX_INACTIVITY_TIME) {
          this.logout();
        }
    }, 30 * 60 * 1000);
    
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
