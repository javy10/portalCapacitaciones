import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }
  
  logout() {
    // AuthInterceptor.accessToken = '';
    this.router.navigate(['/login']);
  }
}
