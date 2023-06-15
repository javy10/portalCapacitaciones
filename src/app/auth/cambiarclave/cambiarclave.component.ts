import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.component.html',
  styleUrls: ['./cambiarclave.component.css']
})
export class CambiarclaveComponent implements OnInit{

  form: FormGroup;
  
  constructor(private router: Router, private colaboradorService: ColaboradorService, private fb: FormBuilder, private toastr: ToastrService,) {
    this.form = this.fb.group({
      clave: ['', [Validators.required]]
    });
  }

  get clave() {
    return this.form.get('clave') as FormControl;
  }

  ngOnInit(): void {
    
  }

  cambiarClave() {
    console.log(localStorage.getItem('idUserResetPass'));

    if(this.form.value.clave.length >= 4) {
      const formData = new FormData();
      formData.append('clave', this.form.value.clave)
      formData.append('colaborador_id', localStorage.getItem('idUserResetPass')!)
  
      this.colaboradorService.cambiarClaveNueva(formData).subscribe((response: any) => {
        console.log(response.dataDB)
        if(response.success) {
          this.toastr.success('Clave cambiada con éxito', 'Éxito!');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('A ocurrido un error no controlado...', 'Error!');
        }
      });
    } else {
      this.toastr.warning('La clave debe tener mínimo 4 caracteres!', 'Warning!');

    }

  }



}
