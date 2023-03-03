import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private router: Router) { }

  year = new Date().getFullYear();

  login() {
    this.router.navigateByUrl('/');
  }
}
