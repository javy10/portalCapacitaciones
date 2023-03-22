
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public _colaboradorService: ColaboradorService,
  ) {
  }
  
  logout() {
    this._colaboradorService.logout().subscribe((data: any) => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
