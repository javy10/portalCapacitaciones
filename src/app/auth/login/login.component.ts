import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { SHA256 } from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmited = false;
  cont = 0;

  public loginForm = this.fb.group({
    dui: ['', Validators.required],
    clave: ['', Validators.required]
  });

  constructor(private router: Router, private fb: FormBuilder, private colaboradorService: ColaboradorService) { }
  year = new Date().getFullYear();

  async login() {
    let clave;
    let intentos;
    let duiIngresado = document.getElementById('dui') as HTMLInputElement;
    let claveIngresada = document.getElementById('clave') as HTMLInputElement;
    let botonLogin = document.getElementById('login') as HTMLInputElement;
    
    
    await new Promise(resolve => resolve(this.colaboradorService.getColaboradorDui(duiIngresado.value).subscribe((response) => {
      console.log(response.dataDB);
      

      if(response.dataDB == ''){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          text: 'No se ha encontrado ningún usuario con éstas credenciales!',
          footer: '<h5 href="">Verifica que tengas las credenciales correctas</h5>',
        });
      } else {
        clave = response.dataDB[0].clave;
        intentos = response.dataDB[0].intentos;
        const claveEncriptada = SHA256(claveIngresada.value).toString();
        if(intentos == 0){
          Swal.fire({
            title: 'El usuario está bloqueado...',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(../../../assets/img/fondo.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("../../../assets/img/error1.gif")
              left top
              no-repeat
            `
          });
        } 
        else if(claveEncriptada == clave){
          Swal.fire({
            //position: 'center',
            icon: 'success',
            title: 'Colaborador Correcto!!',
            
            timerProgressBar: true,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            showConfirmButton: false,
            timer: 1500,
            didOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              this.router.navigate(['/']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            text: 'Usuario Incorrecto!',
            footer: '<h5 href="">Verifica que tengas las credenciales correctas</h5>',
          });
          this.cont++;
          console.log(this.cont);
        }
      }
      if(this.cont == 4){
        Swal.fire({
          title: 'El usuario se ha bloqueado.',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(../../../assets/img/fondo.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("../../../assets/img/error1.gif")
            left top
            no-repeat
          `
        })
        new Promise(resolve => resolve(this.colaboradorService.editarIntentos(duiIngresado.value).subscribe((response) => {
          console.log(response.dataDB);
        })));
      }
    })));
    //console.log(duiIngresado)
   
    // this.colaboradorService.login( this.loginForm.value )
    // .subscribe( resp => {
    //   console.log(resp);
    // }, (err) => {
    //   console.log('Error');
    // });
  }
}
