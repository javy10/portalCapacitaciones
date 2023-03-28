import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-resetclave',
  templateUrl: './resetclave.component.html',
  styleUrls: ['./resetclave.component.css']
})
export class ResetclaveComponent implements OnInit{

  constructor(private router: Router, private colaboradorService: ColaboradorService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  year = new Date().getFullYear();

  form: FormGroup;
  message!: string;

  ngOnInit(): void {
    if(this.verificarLogin()){
      this.router.navigate(['']);
    }
  }

  verificarLogin(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  onSubmit(){
    // const email = this.form.get('email')!.value;
    // this.colaboradorService.reestablecerClave(email.value).subscribe(
    //   response => {
    //     this.message = response.message;
    //   },
    //   error => {
    //     this.message = error.error;
    //   }
    // );

    const correo = document.getElementById('email') as HTMLInputElement;
    //this.colaboradorService.reestablecerClave(correo.value).subscribe((response: any) => {
    new Promise(resolve => resolve(this.colaboradorService.reestablecerClave(correo.value).subscribe((res) => {
      console.log(res);
    })));
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  // reestablecerClave() {
  //   const correo = document.getElementById('email') as HTMLInputElement;
  //   new Promise(resolve => resolve(this.colaboradorService.reestablecerClave(correo.value).subscribe((response: any) => {
  //     console.log(response);
  //   })));
  // }
}
