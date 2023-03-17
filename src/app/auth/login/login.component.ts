import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { SHA256 } from 'crypto-js';
import Swal from 'sweetalert2';
// import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmited = false;
  cont = 0;
  loginForm: FormGroup;
  
  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private colaboradorService: ColaboradorService, 
    private http: HttpClient,
    private cookieService: CookieService
  ) { 
    this.loginForm = this.fb.group({
      dui: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  year = new Date().getFullYear();

  async login() {
    
    let clave;
    let intentos;
    let duiIngresado = document.getElementById('dui') as HTMLInputElement;
    let claveIngresada = document.getElementById('clave') as HTMLInputElement;
    let botonLogin = document.getElementById('login') as HTMLInputElement;

    const formData = new FormData();
    formData.append('dui', duiIngresado.value),
    formData.append('password', claveIngresada.value)

    
    await new Promise(resolve => resolve(this.colaboradorService.getColaboradorDui(duiIngresado.value).subscribe((response) => {
      //console.log(response.dataDB);
      this.cont = response.dataDB[0].intentos;
      

      if(response.dataDB == '') {
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
        if(this.cont <= 0){
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
        else {
          new Promise(resolve => resolve(this.colaboradorService.login(formData).subscribe((response: any) => {
            //console.log(response.dataDB.original.access_token);
            if(response.success == true) {
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
                  localStorage.setItem('token', response.dataDB.original.access_token);
                  this.router.navigate(['']);
                  //this.cookieService.set('token', response.dataDB.original.access_token);                  
                  //this.router.navigate(['/']);
                }
              });
            } 
            else 
            {
              new Promise(resolve => resolve(this.colaboradorService.editarIntentosEquivocados(duiIngresado.value).subscribe((response) => {
                if(this.cont != 0) {
                  this.cont = this.cont - response.dataDB;
                } else {
                  this.cont
                }
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  text: 'Usuario Incorrecto! Te quedan '+ this.cont +' intentos restantes',
                  footer: '<h5 href="">Verifica que tengas las credenciales correctas</h5>',
                });
                //console.log(response.dataDB);
              })));
            }
          })));
        } 
      }
    })));
  }

  ////validamos campo de DUI
  validateFormat(event: any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
     if (this.loginForm.value.dui.length === 8) {
          let dui = document.getElementById('dui') as HTMLInputElement;
          dui.value += '-';
        }
  }
}
