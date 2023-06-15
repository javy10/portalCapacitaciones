import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnDestroy, OnInit {

  /* Estas son propiedades declaradas en la clase `DatatableComponent`. */
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  listaColaborador:any=[];
  selectedRow: any;
  Id = '';
  isLoading = false;

  constructor(private _colaboradorService: ColaboradorService) {}

  /**
   * La función ngOnInit inicializa el componente y establece las opciones para un DataTable.
   */
  ngOnInit(): void {
    this.Id = localStorage.getItem('id')!;
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      responsive: true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "20%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "20%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "10%", "targets": 5 },
        { "width": "8%", "targets": 6 }
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadColaborador()
  }

  /**
   * La función ngOnDestroy cancela la suscripción de dtTrigger.
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadColaborador() {
    this.isLoading = true;
    this._colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaborador = data.dataDB;
      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 1000);
    });
  }

  /**
   * Esta función solicita al usuario que confirme la desactivación de un colaborador y luego llama a
   * un servicio para eliminar el colaborador si se confirma.
   * @param {number} id - El ID del colaborador que necesita ser deshabilitado.
   */
  eliminarColaborador(id: number) {
    //console.log(id)
    Swal.fire({
      title: 'Estás seguro de deshabilitar a éste colaborador?',
      text: "El colaborador ya no aparecera en el Portal de Capacitaciones!",
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
        new Promise(resolve => resolve(this._colaboradorService.eliminar(id).subscribe((response) => {
          Swal.fire(
            'Deshabilitado!',
            'Colaborador deshabilitado con exito.',
            'success'
          )
        })));
        this.loadColaborador();
      }
    });
  }

  /**
   * Esta función muestra un mensaje de confirmación y llama a un servicio para desbloquear a un
   * colaborador.
   * @param {number} id - number - representa la ID del colaborador que necesita ser desbloqueado.
   */
  desbloquear(id: number) {
    Swal.fire({
      title: 'Quieres desbloquear a éste colaborador?',
      text: "El colaborador podra ingresar al Portal de Capacitaciones!",
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
        new Promise(resolve => resolve(this._colaboradorService.desbloquear(id).subscribe((response) => {
          Swal.fire(
            'Desbloqueado!',
            'Colaborador desbloqueado con exito.',
            'success'
          )
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })));
      }
    });
  }


}
