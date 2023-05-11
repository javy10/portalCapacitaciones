import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listdocumentos',
  templateUrl: './listdocumentos.component.html',
  styleUrls: ['./listdocumentos.component.css']
})
export class ListdocumentosComponent implements OnInit {

  formTipo!: FormGroup;

  @Input()
  idTipo:any;

  constructor(private fb:FormBuilder, private documentoService: DocumentoService, private router: Router) {
    this.formTipo = this.fb.group({
      'tipo': ['', Validators.required],
    });
  }

  get tipo() {
    return this.formTipo.get('tipo') as FormControl;
  }

  ngOnInit(): void {
    
  }

  cancelar(){
    const tipo = document.getElementById('tipo') as HTMLInputElement;
    tipo.value = "";
  }

  async guardar(){
    const formData = new FormData();
    formData.append('tipo', this.formTipo.value.tipo),

    console.log(formData)
    await new Promise(resolve => resolve(this.documentoService.saveTipoDocumento(formData).subscribe((response) => {
      console.log(response);
      Swal.fire({
        //position: 'center',
        icon: 'success',
        title: 'Tipo de documento registrado con exito',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/dashboard']);
      window.location.reload();
  })));
  }
}
