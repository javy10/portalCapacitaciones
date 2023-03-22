import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formSubmited = false;
  loginForm: FormGroup;
  year = new Date().getFullYear();
  id = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private colaboradorService: ColaboradorService,
  ) {
    this.loginForm = this.fb.group({
      dui: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    if(this.verificarLogin()){
      this.router.navigate(['']);
    }
  }

  async login() {

    let duiIngresado = document.getElementById('dui') as HTMLInputElement;
    let claveIngresada = document.getElementById('clave') as HTMLInputElement;

    if(duiIngresado.value.length > 0 && claveIngresada.value.length > 0){

      console.log(duiIngresado.value);
      console.log(claveIngresada.value);

      const formData = new FormData();
      formData.append('dui', duiIngresado.value),
      formData.append('password', claveIngresada.value)

      await new Promise(resolve => resolve(this.colaboradorService.getColaboradorDui(duiIngresado.value).subscribe((res) => {
        console.log(res.dataDB);
        if(res.dataDB == '') {
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
        }
          else {
            this.id = res.dataDB[0].id;
            new Promise(resolve => resolve(this.colaboradorService.login(formData).subscribe((response: any) => {
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
                    localStorage.setItem('logeado', response.success);
                    this.router.navigate(['']);
                  }
                });
              }
              else
              {
                //console.log(res.dataDB[0].intentos - 1);
                if(res.dataDB[0].intentos > 0)
                {

                  new Promise(resolve => resolve(this.colaboradorService.editarIntentosEquivocados(duiIngresado.value).subscribe((response) => {
                    if((res.dataDB[0].intentos - 1) != 0) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        },
                        text: 'Usuario Incorrecto! Te quedan '+ (res.dataDB[0].intentos - 1)  +' intentos restantes',
                        footer: '<h5 href="">Verifica que tengas las credenciales correctas</h5>',
                      });
                    } else {
                      Swal.fire({
                        title: 'El usuario se ha bloqueado...',
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
                  })));
                } else {
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
              }
            })));
          }
      })));
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
        text: 'Los campos no pueden estar vacios!!!',
        footer: '<h5 href="">Ingresa las credenciales correctas</h5>',
      });
    }
  }

  verificarLogin(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
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

  reset() {
    this.router.navigate(['/reset'])
  }
}
