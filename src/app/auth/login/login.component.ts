import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  logs:any;

  data: any;
  agencia_id:any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private colaboradorService: ColaboradorService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private http: HttpClient
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

    // this.data = []
    // this.http.get<any>('../../../assets/data/general_datosColaborador.json').subscribe(data => {
    //   this.data = data;
    //   console.log(this.data);

    //   for (const objeto of this.data) {
    //     //console.log(objeto)
    //     console.log(objeto.dui, objeto.password, objeto.nombres, objeto.apellidos, objeto.intentos, objeto.agencia_id, objeto.cargo_id, objeto.email, objeto.telefono, objeto.foto, objeto.habilitado, objeto.departamento_id)
        
    //     const nombreClave = objeto.nombres.charAt(0).toUpperCase();
    //     const apellidoClave = objeto.apellidos.split(' ')[0].toLowerCase();
    //     const valorClave = nombreClave+apellidoClave+objeto.agencia_id;
    //     console.log(valorClave)
    
    //     const formData = new FormData();
    //     formData.append('nombres', objeto.nombres),
    //     formData.append('apellidos', objeto.apellidos),
    //     formData.append('dui', objeto.dui),
    //     formData.append('password', valorClave),
    //     formData.append('telefono', objeto.telefono),
    //     formData.append('correo', objeto.email)

    //     if(objeto.agencia_id == 700) {
    //       this.agencia_id = 1;
    //     }
    //     else if(objeto.agencia_id == 701) {
    //       this.agencia_id = 2;
    //     }
    //     else if(objeto.agencia_id == 702) {
    //       this.agencia_id = 3;
    //     }
    //     else if(objeto.agencia_id == 703) {
    //       this.agencia_id = 4;
    //     }
    //     else if(objeto.agencia_id == 704) {
    //       this.agencia_id = 5;
    //     }
    //     else if(objeto.agencia_id == 705) {
    //       this.agencia_id = 6;
    //     }
    //     else if(objeto.agencia_id == 706) {
    //       this.agencia_id = 7;
    //     }
    //     else if(objeto.agencia_id == 707) {
    //       this.agencia_id = 8;
    //     }
    //     else if(objeto.agencia_id == 708) {
    //       this.agencia_id = 9;
    //     }
    //     else if(objeto.agencia_id == 709) {
    //       this.agencia_id = 10;
    //     }
    //     else if(objeto.agencia_id == 710) {
    //       this.agencia_id = 11;
    //     }

    //     formData.append('agencia_id', this.agencia_id),

    //     formData.append('departamento_id', objeto.departamento_id),
    //     formData.append('cargo_id', objeto.cargo_id),
    //     formData.append('foto', ''),
    //     formData.append('habilitado', 'S'),
    //     formData.append('intentos', '5'),
    //     formData.append('ultimoIngreso', '')

    //     setTimeout(() => {
    //       this.colaboradorService.saveColaborador(formData).subscribe((response) => {
    //           console.log(response);
    //       }); 
    //     }, 500);
    //   } 
    //   this.data = []
    // });

      





  }

  async login() {

    let duiIngresado = document.getElementById('txt-input') as HTMLInputElement;
    let claveIngresada = document.getElementById('pwd') as HTMLInputElement;

    if(duiIngresado.value.length > 0 && claveIngresada.value.length > 0){

      console.log(duiIngresado.value);
      console.log(claveIngresada.value);

      const formData = new FormData();
      formData.append('dui', duiIngresado.value),
      formData.append('password', claveIngresada.value)

      await new Promise(resolve => resolve(this.colaboradorService.getColaboradorDui(duiIngresado.value).subscribe((res) => {
        console.log(res.dataDB);
        if(res.dataDB == '') {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   showClass: {
          //     popup: 'animate__animated animate__fadeInDown'
          //   },
          //   hideClass: {
          //     popup: 'animate__animated animate__fadeOutUp'
          //   },
          //   text: 'No se ha encontrado ningún usuario con éstas credenciales!',
          //   footer: '<h5 href="">Verifica que tengas las credenciales correctas</h5>',
          // });
          this.toastr.warning('No se ha encontrado ningún usuario con éstas credenciales!', 'Warning!');
        }
          else {
            this.id = res.dataDB[0].id;
            new Promise(resolve => resolve(this.colaboradorService.login(formData).subscribe((response: any) => {
              if(response.success == true) {
                // Swal.fire({
                //   //position: 'center',
                //   icon: 'success',
                //   title: 'Colaborador Correcto!!',
                //   timerProgressBar: true,
                //   showClass: {
                //     popup: 'animate__animated animate__fadeInDown'
                //   },
                //   hideClass: {
                //     popup: 'animate__animated animate__fadeOutUp'
                //   },
                //   showConfirmButton: false,
                //   timer: 1500,
                //   didOpen: () => {
                //     Swal.showLoading()
                //   },
                //   willClose: () => {
                //     localStorage.setItem('token', response.dataDB.original.access_token);
                //     localStorage.setItem('logeado', response.success);
                //     localStorage.setItem('id', this.id.toString());

                //     let fechaFormateadaHoy = '';
                //     let today = new Date();
                //     const fechaISO = today.toISOString();
                //     let fechaHoy = new Date(fechaISO)
                //     fechaFormateadaHoy = this.datePipe.transform(fechaHoy, 'yyyy-MM-dd HH:mm:ss')!;

                //     this.logs = {
                //       'colaborador_id': this.id,
                //       'fechaEntrada': fechaFormateadaHoy,
                //     }

                //     this.colaboradorService.editarEntrada(this.logs).subscribe((respuest) => {
                //       console.log(respuest)
                //     });

                //     this.router.navigate(['']);
                //   }
                // });

                this.toastr.success('Colaborador Correcto!!', 'Éxito!');
                localStorage.setItem('token', response.dataDB.original.access_token);
                localStorage.setItem('logeado', response.success);
                localStorage.setItem('id', this.id.toString());

                let fechaFormateadaHoy = '';
                let today = new Date();
                const fechaISO = today.toISOString();
                let fechaHoy = new Date(fechaISO)
                fechaFormateadaHoy = this.datePipe.transform(fechaHoy, 'yyyy-MM-dd HH:mm:ss')!;

                this.logs = {
                  'colaborador_id': this.id,
                  'fechaEntrada': fechaFormateadaHoy,
                }

                this.colaboradorService.editarEntrada(this.logs).subscribe((respuest) => {
                  console.log(respuest)
                });

                this.router.navigate(['']);
              }
              else
              {
                //console.log(res.dataDB[0].intentos - 1);
                if(res.dataDB[0].intentos > 0)
                {

                  new Promise(resolve => resolve(this.colaboradorService.editarIntentosEquivocados(duiIngresado.value).subscribe((response) => {
                    if((res.dataDB[0].intentos - 1) != 0) {
                      // Swal.fire({
                      //   icon: 'error',
                      //   title: 'Oops...',
                      //   showClass: {
                      //     popup: 'animate__animated animate__fadeInDown'
                      //   },
                      //   hideClass: {
                      //     popup: 'animate__animated animate__fadeOutUp'
                      //   },
                      //   text: 'Usuario Incorrecto! Te quedan '+ (res.dataDB[0].intentos - 1)  +' intentos restantes',
                      //   footer: '<h5 href="">Verifica que tengas las credenciales correctas</h5>',
                      // });
                      this.toastr.warning('Usuario Incorrecto! Te quedan '+ (res.dataDB[0].intentos - 1)  +' intentos restantes', 'Warning!');
                    } else {
                      // Swal.fire({
                      //   title: 'El usuario se ha bloqueado...',
                      //   width: 600,
                      //   padding: '3em',
                      //   color: '#716add',
                      //   background: '#fff url(../../../assets/img/fondo.png)',
                      //   backdrop: `
                      //     rgba(0,0,123,0.4)
                      //     url("../../../assets/img/error1.gif")
                      //     left top
                      //     no-repeat
                      //   `
                      // });
                      this.toastr.error('El usuario se ha bloqueado...', 'Error!');
                    }
                  })));
                } else {
                  // Swal.fire({
                  //   title: 'El usuario está bloqueado...',
                  //   width: 600,
                  //   padding: '3em',
                  //   color: '#716add',
                  //   background: '#fff url(../../../assets/img/fondo.png)',
                  //   backdrop: `
                  //     rgba(0,0,123,0.4)
                  //     url("../../../assets/img/error1.gif")
                  //     left top
                  //     no-repeat
                  //   `
                  // });
                  this.toastr.error('El usuario está bloqueado...', 'Error!');
                }
              }
            })));
          }
      })));
    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   showClass: {
      //     popup: 'animate__animated animate__fadeInDown'
      //   },
      //   hideClass: {
      //     popup: 'animate__animated animate__fadeOutUp'
      //   },
      //   text: 'Los campos no pueden estar vacios!!!',
      //   footer: '<h5 href="">Ingresa las credenciales correctas</h5>',
      // });
      this.toastr.warning('Los campos no pueden estar vacios!!! --- Ingresa las credenciales correctas! ', 'Warning!');
    }
  }

  verificarLogin(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  ////validamos campo de DUI
  validateFormat(event: any) {
    let key;
    let duiIngresado = document.getElementById('txt-input') as HTMLInputElement;
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
    if (duiIngresado.value.length === 8) {
        let dui = document.getElementById('txt-input') as HTMLInputElement;
        dui.value += '-';
    }
  }

  reset() {
    this.router.navigate(['/reset'])
  }


  // Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only

show() {
  const p = document.getElementById('pwd') as HTMLInputElement;
  p.setAttribute('type', 'text');
}

hide() {
  const p = document.getElementById('pwd') as HTMLInputElement;
  p.setAttribute('type', 'password');
}

pwShown = 0;

seleccionar(){
  
  if (this.pwShown == 0) {
    this.pwShown = 1;
    this.show();
  } else {
      this.pwShown = 0;
      this.hide();
  }
}


}
