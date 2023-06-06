import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtevaluacionesdeshabilitadas',
  templateUrl: './dtevaluacionesdeshabilitadas.component.html',
  styleUrls: ['./dtevaluacionesdeshabilitadas.component.css']
})
export class DtevaluacionesdeshabilitadasComponent implements OnInit {

  listaEvaluacionesDeshabilitadas:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  isLoading = false;

  constructor(private evaluacionesService: EvaluacionesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.dtOptions = {
      //data: this.loadEvaluacionesDeshabilitadas()!,
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
    this.loadEvaluacionesDeshabilitadas();
    
  }

  loadEvaluacionesDeshabilitadas() {
    //this.obtenerConteo();
    this.isLoading = true;
    this.evaluacionesService.getEvaluacionesDeshabilitadas().subscribe((data: any) => {
      
      
      for(let item of data.dataDB){
        //console.log(item.id)
        this.evaluacionesService.getConteoPreguntas(item.id).subscribe((item: any) => {
          
        });
      }
      
      this.listaEvaluacionesDeshabilitadas = data.dataDB;
      console.log(this.listaEvaluacionesDeshabilitadas)

      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 1000);
    });
  
  }

  habilitar(id: number) {
    Swal.fire({
      title: 'Estás seguro de habilitar ésta evaluación?',
      text: "La evaluación aparecerá en el Portal de Capacitaciones nuevamente!",
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
        this.evaluacionesService.habilitarEvaluacion(id).subscribe((res: any) => {
          if(res.success == true) {
            this.toastr.success('Evaluación habilitada con éxito!', 'Éxito!');
            this. loadEvaluacionesDeshabilitadas();
          } else {
            this.toastr.error('A ocurrido un error no controlado!', 'Error!');
          }
        });
      }
    });
  }




}
