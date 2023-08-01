import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-dtresultadosevaluacionabierta',
  templateUrl: './dtresultadosevaluacionabierta.component.html',
  styleUrls: ['./dtresultadosevaluacionabierta.component.css']
})
export class DtresultadosevaluacionabiertaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();

  
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  listaResultadoEvaluacion:any=[];
  isLoading = false;
  ngSelect:any;
  listaEvaluaciones:any=[];
  nombreEvaluacion:any;

  listaEvaluacionesAbiertas:any= [];
  listaEvaluacionesAbiertasRespuestas:any= [];

  constructor(private evaluacionesService: EvaluacionesService, private activeRoute: ActivatedRoute, ) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      responsive: true,
      columnDefs: [
         { "width": "2%", "targets": 0 },
        { "width": "30%", "targets": 1 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.dtOptions1 = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      responsive: true,
      columnDefs: [
         { "width": "2%", "targets": 0 },
        { "width": "30%", "targets": 1 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadEvaluaciones();
  }

  async loadEvaluaciones() {
    this.listaEvaluacionesAbiertas = [];
    const id = this.activeRoute.snapshot.paramMap.get('id');
    const data = await this.evaluacionesService.getEvaluacionesAbiertasId(id).toPromise();
    this.nombreEvaluacion = data.dataDB[0].nombre;
    this.listaEvaluacionesAbiertas = data.dataDB;
    //this.dtTrigger.next(0);
    //this.ngSelect = 0;
    // console.log(this.listaEvaluacionesAbiertas)
    // console.log(this.nombreEvaluacion)
  } 

  obtenerValorFila(item: any) {

    // const boton = document.getElementById('btnAgregarCargo') as HTMLButtonElement;
    // boton!.disabled = false;

    if(item) {
      //console.log(item)
      const id = this.activeRoute.snapshot.paramMap.get('id');
      const formData = new FormData();
      formData.append('pregunta_id', item.id)
      formData.append('evaluacion_id', id!)

      this.evaluacionesService.getObtenerEvaluacionesAbiertasRespuestaId(formData).subscribe((response) => {
        //console.log(response.dataDB)
        this.listaEvaluacionesAbiertasRespuestas = [];
        this.listaEvaluacionesAbiertasRespuestas = response.dataDB;
        //console.log(this.listaEvaluacionesAbiertasRespuestas)

        if (this.datatableElement.dtInstance) {
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            //this.dtTrigger1.next(0);
            this.listaEvaluacionesAbiertasRespuestas = [];
          }); 
        }
      });
    }

  }

  // async onItemSelected(selectedValue: any) {

  //   this.listaEvaluacionesAbiertas = [];
  //   const data = await this.evaluacionesService.getEvaluacionesAbiertasId(selectedValue.target.value).toPromise();
  //   console.log(data.dataDB)
  //   this.listaEvaluacionesAbiertas = data.dataDB;
    
  //   console.log(this.listaEvaluacionesAbiertas.length)
  //   // Destruir la tabla DataTable existente
  //   if (this.datatableElement.dtInstance) {
  //     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.destroy();
  //       this.dtTrigger.next(0);
  //       this.listaEvaluacionesAbiertas = [];
  //     });
  //   } 
  //   // else {
  //   //   // Volver a dibujar la tabla DataTable con los nuevos datos
  //   //   if(this.listaEvaluacionesAbiertas.length != 0) {
  //   //     setTimeout(() => {
  //   //         this.dtTrigger.next(0);
  //   //     }, 1000);
  //   //   }
  //   // }
  // }

}
