import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
// import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _colaboradorService: ColaboradorService,
    private cookieService: CookieService
  ) {
  }
  
  logout() {
    // AuthInterceptor.accessToken = '';
    this._colaboradorService.logout().subscribe((data: any) => {
      //this.cookieService.remove('token');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
