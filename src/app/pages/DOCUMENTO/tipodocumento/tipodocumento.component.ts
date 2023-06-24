import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css']
})
export class TipodocumentoComponent implements OnInit{

  formTipo!: FormGroup;

  @Input()
  idTipo:any;

  constructor(private fb:FormBuilder, private documentoService: DocumentoService, private router: Router, private activeRoute: ActivatedRoute, private toastr: ToastrService,) {
    this.formTipo = this.fb.group({
      'tipo': ['', Validators.required],
    });
  }

  get tipo() {
    return this.formTipo.get('tipo') as FormControl;
  }

  ngOnInit(): void {
    this.cargar();
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
      // Swal.fire({
      //   //position: 'center',
      //   icon: 'success',
      //   title: 'Tipo de documento registrado con exito',
      //   showClass: {
      //     popup: 'animate__animated animate__fadeInDown'
      //   },
      //   hideClass: {
      //     popup: 'animate__animated animate__fadeOutUp'
      //   },
      //   showConfirmButton: false,
      //   timer: 1500
      // })

      this.toastr.success('Tipo de documento registrado con éxito!', 'Éxito!');
      this.router.navigate(['/dashboard/list-tipo-documentos']);

      //window.location.reload();
  })));
  }

  cargar(){
    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id)
    if(id){

      console.log(id)

      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar tipo documento';

      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = true;

      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false;

      this.activeRoute.params.subscribe( e => {
        let id = e['id'];
        if(id) {
          console.log(id)
        new Promise(resolve => resolve(this.documentoService.getTipoDocumentoID(id).subscribe((response) => {
          //this.colaborador = response.dataDB;
          console.log(response.dataDB)
          this.formTipo.patchValue(response.dataDB);
        })));
        }
      });
    }
  }

  async editar(){
    const formData = new FormData();
    formData.append('id', this.activeRoute.snapshot.paramMap.get('id')!),
    formData.append('tipo', this.formTipo.value.tipo)

    await new Promise(resolve => resolve(this.documentoService.editarTipoDocumento(formData).subscribe((response) => {
      console.log(response);
      // Swal.fire({
      //   //position: 'center',
      //   icon: 'success',
      //   title: 'Tipo de documento actualizado con éxito',
      //   showClass: {
      //     popup: 'animate__animated animate__fadeInDown'
      //   },
      //   hideClass: {
      //     popup: 'animate__animated animate__fadeOutUp'
      //   },
      //   showConfirmButton: false,
      //   timer: 1500
      // })

      this.toastr.success('Tipo de documento actualizado con éxito!', 'Éxito!');
      this.router.navigate(['/dashboard/list-tipo-documentos']);
    })));
  }



}
