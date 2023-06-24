import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.component.html',
  styleUrls: ['./cambiarclave.component.css']
})
export class CambiarclaveComponent implements OnInit{

  

  formUser!: FormGroup;
  
  constructor(public fb:FormBuilder, private colaboradorService:ColaboradorService, private router: Router, private activeRoute: ActivatedRoute, private toastr: ToastrService) {
    this.formUser = this.fb.group({
      'clave': ['', Validators.required],
      'claveActual': ['', Validators.required],
      
      // 'foto': ['']
    })
  }

  ngOnInit(): void {
    const log = document.getElementById('signupLogo') as HTMLInputElement;
    log.src = "https://s3-us-west-2.amazonaws.com/shipsy-public-assets/shipsy/SHIPSY_LOGO_BIRD_BLUE.png";
  }

  get clave() {
    return this.formUser.get('clave') as FormControl;
  }
  get claveActual() {
    return this.formUser.get('claveActual') as FormControl;
  }

  guardar(){
    const id = localStorage.getItem('id');
    const password = document.getElementById("password") as HTMLInputElement;
    const claveActual = document.getElementById("claveActual") as HTMLInputElement;
    const confirm_password = document.getElementById("confirmPassword") as HTMLInputElement;

    console.log(claveActual.value)
    console.log(password.value)
    console.log(confirm_password.value)

    const formData = new FormData();
    formData.append('clave', claveActual.value)
    formData.append('colaborador_id', id!)

    this.colaboradorService.getColaboradorClave(formData).subscribe((response) => {
      console.log(response.success)

      if(response.success) {
        if(password.value == confirm_password.value) {
          const formData = new FormData();
          formData.append('clave', password.value)
          formData.append('colaborador_id', id!)
      
          Swal.fire({
            title: 'Seguro/a que quieres cambiar la contraseña?',
            //text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, de acuerdo!',
            cancelButtonText: 'Mejor no!',
          }).then((result) => {
            if (result.isConfirmed) {
              new Promise(resolve => resolve(this.colaboradorService.editarPassword(formData).subscribe((response) => {
                console.log(response);
                this.toastr.success('Contraseña actualizada... Ya puedes iniciar sesión con la nueva contraseña', 'Éxito!');
                setTimeout(() => {
                  this.logout();
                }, 1000);
              })));
            }
          })
        } else {
          this.toastr.error('Las contraseñas no coinciden... Inténtalo nuevamente', 'Error!');
        }
      } else {
        this.toastr.error('La contraseña actual esta incorrecta', 'Error!');
      }


    });

    

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('logeado');
    this.router.navigate(['/login']);
  }






  
}
