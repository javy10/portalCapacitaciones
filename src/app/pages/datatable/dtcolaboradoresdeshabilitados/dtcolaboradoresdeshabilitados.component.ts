import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtcolaboradoresdeshabilitados',
  templateUrl: './dtcolaboradoresdeshabilitados.component.html',
  styleUrls: ['./dtcolaboradoresdeshabilitados.component.css']
})
export class DtcolaboradoresdeshabilitadosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  listaColaborador:any=[];
  selectedRow: any;
  Id = '';
  isLoading = false;

  constructor(private _colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.Id = localStorage.getItem('id')!;
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "15%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "15%", "targets": 3 },
        { "width": "25%", "targets": 4 },
        { "width": "10%", "targets": 5 },
        { "width": "25%", "targets": 6 }
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadColaborador()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadColaborador() {
    this.isLoading = true;
    this._colaboradorService.getCollaboratorDeshabilitados().subscribe((data: any) => {
      this.listaColaborador = data.dataDB;
      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 1000);
    });
  }

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
