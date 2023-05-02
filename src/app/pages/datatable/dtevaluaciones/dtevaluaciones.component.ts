import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtevaluaciones',
  templateUrl: './dtevaluaciones.component.html',
  styleUrls: ['./dtevaluaciones.component.css']
})
export class DtevaluacionesComponent implements OnInit {

  /* Estas son propiedades de la clase `DtdocumentosComponent` en una aplicación Angular. */
  listaEvaluaciones:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  isLoading = false;


  /**
   * Esta es una función constructora que toma un DocumentoService como parámetro.
   * @param {DocumentoService} documentosService - El parámetro "documentosService" es una instancia de
   * la clase "DocumentoService" que se está inyectando en el constructor de la clase actual. Esta es
   * una práctica común en las aplicaciones de Angular, donde los servicios se utilizan para
   * proporcionar una funcionalidad que se puede compartir entre varios componentes. Al inyectar el
   * servicio en el constructor.
   */
  constructor(private evaluacionesService: EvaluacionesService) {}

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
        { "width": "20%", "targets": 2 },
        { "width": "15%", "targets": 3 },
        { "width": "15%", "targets": 4 },
        { "width": "10%", "targets": 5 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadEvaluaciones();
  }

  async loadEvaluaciones() {
    // this.isLoading = true;
    // return  await new Promise(resolve => resolve( this.evaluacionesService.getListaDocumentos().subscribe((data: any) => {
    //   this.listaDocumentos = data.dataDB;
    //   this.isLoading = false;
    //   setTimeout(() => {
    //       this.dtTrigger.next(0);
    //   }, 1000);
    // })));
  }

  eliminarDocumento(datos: any) {
    // console.log(datos)
    // Swal.fire({
    //   title: 'Estás seguro de eliminar éste documento?',
    //   text: "El Documento ya no aparecera en el Portal de Capacitaciones!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   cancelButtonText: 'Cancelar',
    //   confirmButtonText: 'Si, seguro!',
    //   showClass: {
    //     popup: 'animate__animated animate__fadeInDown'
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__fadeOutUp'
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     new Promise(resolve => resolve(this.evaluacionesService.eliminar(datos.id).subscribe((response) => {
    //       Swal.fire(
    //         'Deshabilitado!',
    //         'Documento deshabilitado con éxito.',
    //         'success'
    //       )
    //     })));
    //     this.loadDocumentos();
    //   }
    // });
  }

}
