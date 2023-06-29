import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtcolaboradoresintentos',
  templateUrl: './dtcolaboradoresintentos.component.html',
  styleUrls: ['./dtcolaboradoresintentos.component.css']
})
export class DtcolaboradoresintentosComponent implements OnInit {

  constructor(private evaluacionService: EvaluacionesService,  private toastr: ToastrService, private activeRoute: ActivatedRoute) {}

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = false;
  listaColaboradorIntentos:any=[];

  ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "40%", "targets": 1 },
        { "width": "30%", "targets": 2 },
        { "width": "5%", "targets": 3 },
        { "width": "5%", "targets": 4 }
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadColaborador();
  }

  loadColaborador() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.evaluacionService.getIntentosColaboradores(id).subscribe((data: any) => {
      console.log(data.dataDB)
      this.listaColaboradorIntentos = data.dataDB;
      this.isLoading = false;
      if(this.listaColaboradorIntentos.length != 0) {
        setTimeout(() => {
            this.dtTrigger.next(0);
        }, 1000);
      }
      
    });
  }

  desbloquear(item:any) {
    console.log(item)
    console.log(item.id)
    Swal.fire({
      title: 'Estás seguro de habilitar éste colaborador?',
      text: "El colaborador podrá ver las evaluaciones en el Portal de Capacitaciones nuevamente!",
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
        this.evaluacionService.habilitarIntentosEvaluacion(item.id).subscribe((data: any) => {
          console.log(data.dataDB)
          if(data.success == true) {
            this.toastr.success('Colaborador habilitado con éxito!', 'Éxito!');
            this. loadColaborador();
          } else {
            this.toastr.error('A ocurrido un error no controlado!', 'Error!');
          }
        });
      }
    });
  }
 

 

}
