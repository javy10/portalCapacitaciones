import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmited = false;

  public loginForm = this.fb.group({
    dui: ['00000000-0', Validators.required],
    clave: ['1234', Validators.required]
  });

  constructor(private router: Router, private fb: FormBuilder, private colaboradorService: ColaboradorService) { }
  year = new Date().getFullYear();

  login() {
    console.log(this.loginForm.value)
    this.router.navigateByUrl('/');

    // this.colaboradorService.login( this.loginForm.value )
    // .subscribe( resp => {
    //   console.log(resp);
    // }, (err) => {
    //   console.log('Error');
    // });


  }
}
