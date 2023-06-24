import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  @Input()
  idTipo:any;


  /**
   * Esta es una función constructora que toma un DocumentoService como parámetro.
   * @param {DocumentoService} documentosService - El parámetro "documentosService" es una instancia de
   * la clase "DocumentoService" que se está inyectando en el constructor de la clase actual. Esta es
   * una práctica común en las aplicaciones de Angular, donde los servicios se utilizan para
   * proporcionar una funcionalidad que se puede compartir entre varios componentes. Al inyectar el
   * servicio en el constructor.
   */
  constructor(private documentosService: DocumentoService, private fb:FormBuilder, private documentoService: DocumentoService, private router: Router) {
    this.formTipo = this.fb.group({
      'tipo': ['', Validators.required],
    });
  }

  get tipo() {
    return this.formTipo.get('tipo') as FormControl;
  }

  /**
   * La función inicializa las opciones de DataTable y carga documentos mientras establece el indicador
   * isLoading en falso.
   */

  ngOnInit(): void {
    //this.Id = localStorage.getItem('id')!;
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

  /**
   * Esta función carga una lista de documentos y establece una bandera para indicar que se está
   * cargando actualmente.
   * @returns La función `loadDocumentos()` devuelve una Promesa que resuelve el resultado de la
   * llamada al método `subscribe()` en el observable `documentosService.getListaDocumentos()`. El
   * método `subscribe()` se usa para escuchar los datos emitidos por el observable y ejecutar la
   * función de devolución de llamada pasada como argumento. En este caso, la función de devolución de
   * llamada está actualizando la propiedad `listaDocumentos` con los datos
   */
  async loadDocumentos() {
    this.isLoading = true;
    return  await new Promise(resolve => resolve( this.documentosService.getListaDocumentos().subscribe((data: any) => {
      this.listaDocumentos = data.dataDB;
      //console.log(this.listaDocumentos)
      this.isLoading = false;

      if(this.listaDocumentos.length != 0) {
        setTimeout(() => {
            this.dtTrigger.next(0);
        }, 1000);
      }
    })));
  }
  /**
   * Esta función solicita al usuario que confirme la eliminación de un documento y luego llama a un
   * servicio para eliminarlo si se confirma.
   * @param {any} datos - El parámetro "datos" es de tipo "cualquiera", lo que significa que puede ser
   * cualquier tipo de dato. Se está pasando como argumento a la función "eliminarDocumento".
   */
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
