import { Component, OnDestroy, OnInit } from '@angular/core';
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

  listaDocumentos:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  isLoading = false;


  constructor(private documentosService: DocumentoService) {}

  ngOnInit(): void {
    //this.Id = localStorage.getItem('id')!;
    this.dtOptions = {
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
    this.loadDocumentos();
    this.isLoading = false;
  }
 
  async loadDocumentos() {
    this.isLoading = true;
    return  await new Promise(resolve => resolve( this.documentosService.getListaDocumentos().subscribe((data: any) => {
      this.listaDocumentos = data.dataDB;
      console.log(this.listaDocumentos)
      this.dtTrigger.next(0);
      
    })));
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
        })));
        this.loadDocumentos();
      }
    });
  }
}
