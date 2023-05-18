import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtpermisos',
  templateUrl: './dtpermisos.component.html',
  styleUrls: ['./dtpermisos.component.css']
})
export class DtpermisosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaPermisos:any=[];
  isLoading = false;

  constructor(public documentacionService: DocumentoService) {}

  ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      columnDefs: [
        { "width": "2%", "targets": 0, className: "text-center" },
        { "width": "25%", "targets": 1, className: "text-center" },
        { "width": "15%", "targets": 2, className: "text-center", defaultContent: "N/A" },
        { "width": "15%", "targets": 3, className: "text-center", defaultContent: "N/A" },
        { "width": "5%", "targets": 4 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadPermisos();
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  loadPermisos() {
    this.isLoading = true;
    this.documentacionService.getObtenerDetallePermiso().subscribe((res) => {
      console.log(res.dataDB)
      this.listaPermisos = res.dataDB
      this.isLoading = false;

      setTimeout(() => {
        this.dtTrigger.next(0);
    }, 1000);
    });
  }

  eliminar(id:any) {
    Swal.fire({
      title: 'Estás seguro de deshabilitar éste permiso?',
      text: "Ya no tedrá acceso a los documentos asignados",
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
        new Promise(resolve => resolve(this.documentacionService.eliminarDetallePermiso(id).subscribe((response) => {
          if(response.success == true) {
            Swal.fire(
              'Deshabilitado!',
              'Permiso deshabilitado con exito.',
              'success'
            )
          } else {
            Swal.fire(
              'Error!',
              'Ha ocurrido un error no controlado',
              'error'
            )
          }
        })));
        
      }
    });
  }







}
