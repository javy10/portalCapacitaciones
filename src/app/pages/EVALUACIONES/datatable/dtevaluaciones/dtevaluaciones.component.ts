import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  evaluacion:any;
  n_preguntas:any = 0;
  idEvaluacion:any;

  constructor(private evaluacionesService: EvaluacionesService, private toastr: ToastrService,) {}

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
        { "width": "10%", "targets": 4 },
        { "width": "15%", "targets": 5 },
        { "width": "10%", "targets": 6 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadEvaluaciones();
  }

  loadEvaluaciones() {
    //this.obtenerConteo();
    this.isLoading = true;
    this.evaluacionesService.getEvaluaciones().subscribe((data: any) => {
      
      
      for(let item of data.dataDB){
        //console.log(item.id)
        this.evaluacionesService.getConteoPreguntas(item.id).subscribe((data: any) => {
          
        });
      }
      
      this.listaEvaluaciones = data.dataDB;
      console.log(this.listaEvaluaciones)

      this.isLoading = false;
      if(this.listaEvaluaciones.length != 0) {
        setTimeout(() => {
            this.dtTrigger.next(0);
        }, 1000);
      }
    });
  
  }

  // obtenerConteo() {
  //   this.evaluacionesService.getConteoPreguntas(this.idEvaluacion).subscribe((data: any) => {

  //   });
  // }

  eliminarEvaluacion(datos: any) {
    console.log(datos)
    Swal.fire({
      title: 'Estás seguro de eliminar ésta evaluación?',
      text: "La evaluación ya no aparecera en el Portal de Capacitaciones!",
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
        this.evaluacionesService.eliminarEvaluacion(datos.id).subscribe((response) => {
          if(response.success == true) {
            this.toastr.success('Evaluación eliminada con éxito!', 'Éxito!');
            this.loadEvaluaciones();
          }
        });
      }
    });
  }

}
