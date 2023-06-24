import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dttipodocumentos',
  templateUrl: './dttipodocumentos.component.html',
  styleUrls: ['./dttipodocumentos.component.css']
})
export class DttipodocumentosComponent implements OnInit {

  listaTipoDocumentos:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  isLoading = false;

  constructor(private documentosService: DocumentoService) {}

  ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "20%", "targets": 1 },
        { "width": "10%", "targets": 2 },
        { "width": "6%", "targets": 3 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadTipoDocumentos();
  }

  async loadTipoDocumentos() {
    this.isLoading = true;
    return  await new Promise(resolve => resolve( this.documentosService.getTiposDocumentos().subscribe((data: any) => {
      this.listaTipoDocumentos = data;
      console.log(this.listaTipoDocumentos)
      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 1000);
    })));
  }

  eliminarDocumento(datos: any) {
    console.log(datos)
    Swal.fire({
      title: 'Estás seguro de eliminar éste tipo documento?',
      text: "El tipo de documento ya no se mostrará!",
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
        new Promise(resolve => resolve(this.documentosService.eliminarTipoDocumento(datos.id).subscribe((response) => {
          Swal.fire(
            'Deshabilitado!',
            'Tipo documento deshabilitado con éxito.',
            'success'
          )
          setTimeout(() => {
            this.loadTipoDocumentos();
            window.location.reload();
          }, 2000);
        })));
      }
    });
  }

  desbloquear(id: number) {
    Swal.fire({
      title: 'Quieres desbloquear éste tipo de documento?',
      text: "El colaborador correspondiente lo podrá ver!",
      icon: 'info',
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
        new Promise(resolve => resolve(this.documentosService.desbloquear(id).subscribe((response) => {
          Swal.fire(
            'Desbloqueado!',
            'Tipo de documento desbloqueado con exito.',
            'success'
          )
          setTimeout(() => {
            this.loadTipoDocumentos();
            window.location.reload();
          }, 2000);
        })));
      }
    });
  }




}
