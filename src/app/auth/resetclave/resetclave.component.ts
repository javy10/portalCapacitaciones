import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-resetclave',
  templateUrl: './resetclave.component.html',
  styleUrls: ['./resetclave.component.css']
})
export class ResetclaveComponent implements OnInit{

  constructor(private router: Router, private colaboradorService: ColaboradorService, private fb: FormBuilder, private toastr: ToastrService,) {
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

  // onSubmit(){
  //   // const email = this.form.get('email')!.value;
  //   // this.colaboradorService.reestablecerClave(email.value).subscribe(
  //   //   response => {
  //   //     this.message = response.message;
  //   //   },
  //   //   error => {
  //   //     this.message = error.error;
  //   //   }
  //   // );

  //   const correo = document.getElementById('email') as HTMLInputElement;
  //   //this.colaboradorService.reestablecerClave(correo.value).subscribe((response: any) => {
  //   new Promise(resolve => resolve(this.colaboradorService.reestablecerClave(correo.value).subscribe((res) => {
  //     console.log(res);
  //   })));
  // }

  get email() {
    return this.form.get('email') as FormControl;
  }

  reestablecerClave() {
    const correo = document.getElementById('email') as HTMLInputElement;

    const formData = new FormData();
    formData.append('email', correo.value)


    this.colaboradorService.reestablecerClave(formData).subscribe((response: any) => {
      console.log(response);
      if(response.success) {
        this.toastr.success(response.message, 'Éxito!');

        this.colaboradorService.obtenerUsersPorEmail(correo.value).subscribe((resp: any) => {
          console.log(resp.dataDB)
          localStorage.setItem('idUserResetPass', resp.dataDB[0].id)
        });

      }
    });
  }
}
