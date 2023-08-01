import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtdocumentos',
  templateUrl: './dtdocumentos.component.html',
  styleUrls: ['./dtdocumentos.component.css']
})
export class DtdocumentosComponent implements OnInit {

  /* Estas son propiedades de la clase `DtdocumentosComponent` en una aplicación Angular. */
  listaDocumentos:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  isLoading = false;

  formTipo!: FormGroup;
  id:any;

  @Input()
  idTipo:any;

  constructor(private documentosService: DocumentoService, private fb:FormBuilder, private documentoService: DocumentoService, private router: Router, private toastr: ToastrService) {
    this.formTipo = this.fb.group({
      'tipo': ['', Validators.required],
    });
  }

  get tipo() {
    return this.formTipo.get('tipo') as FormControl;
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id')!;
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "20%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "12%", "targets": 3 },
        { "width": "6%", "targets": 4 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadDocumentos();
  }

  loadDocumentos() {
    this.isLoading = true;
    this.documentosService.getListaDocumentos().subscribe((data: any) => {
      this.listaDocumentos = data.dataDB;
      console.log(this.listaDocumentos)
      this.isLoading = false;

      if(this.listaDocumentos.length != 0) {
        setTimeout(() => {
            this.dtTrigger.next(0);
        }, 10);
      }
    });
  }

  eliminarDocumento(datos: any) {
    console.log(datos)
    Swal.fire({
      title: 'Estás seguro de eliminar éste documento?',
      text: "El Documento ya no aparecera en el Portal de Capacitaciones!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, seguro!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        new Promise(resolve => resolve(this.documentosService.eliminar(datos.id).subscribe((response) => {
          Swal.fire(
            'Deshabilitado!',
            'Documento deshabilitado con éxito.',
            'success'
          )
          setTimeout(() => {
            this.loadDocumentos();
            window.location.reload();
          }, 2000);
        })));
      }
    });
  }

  cancelar(){
    const tipo = document.getElementById('tipo') as HTMLInputElement;
    tipo.value = "";
  }

  async guardar(){
    const formData = new FormData();
    formData.append('tipo', this.formTipo.value.tipo),

    //console.log(formData)
    await new Promise(resolve => resolve(this.documentoService.saveTipoDocumento(formData).subscribe((response) => {
      //console.log(response);
      this.toastr.success('Tipo de documento registrado con éxito!', 'Éxito!');
      this.router.navigate(['/dashboard']);
      setTimeout(() => {
        window.location.reload();
      }, 100);
  })));
  }




}
