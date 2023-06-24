import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-dtresultadosevaluacion',
  templateUrl: './dtresultadosevaluacion.component.html',
  styleUrls: ['./dtresultadosevaluacion.component.css']
})

export class DtresultadosevaluacionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listaResultadoEvaluacion:any=[];
  isLoading = false;
  formResultados: FormGroup;

  constructor(private evaluacionesService: EvaluacionesService, private fb:FormBuilder, private toastr: ToastrService, private datePipe: DatePipe,) {
    this.formResultados = this.fb.group({
      'apertura': ['', Validators.required],
      'cierre': ['', Validators.required],
    });
  }

  get apertura() {
    return this.formResultados.get('apertura') as FormControl;
  }
  get cierre() {
    return this.formResultados.get('cierre') as FormControl;
  }
  
  ngOnInit(): void {
    // this.dtOptions = {
    //   //data: this.loadEvaluacionesDeshabilitadas()!,
    //   lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   columnDefs: [
    //     { "width": "2%", "targets": 0 },
    //     { "width": "25%", "targets": 1 },
    //     { "width": "15%", "targets": 2 },
    //     { "width": "25%", "targets": 3 },
    //     { "width": "10%", "targets": 4 },
    //   ],
    //   language: {
    //     url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
    //   }
    // };
    
  }

  loadEvaluacionesDeshabilitadas() {
    //this.obtenerConteo();

    if(this.formResultados.value.apertura && this.formResultados.value.cierre) {
      let fechaFormateadaA = '';
      let fechaFormateadaC = '';
      const apertura = document.querySelector("#apertura") as HTMLInputElement;
      const cierre = document.querySelector("#cierre") as HTMLInputElement;
      let fechaObjA = new Date(apertura.value);
      fechaFormateadaA = this.datePipe.transform(fechaObjA, 'yyyy-MM-dd HH:mm:ss')!;
      let fechaObjC = new Date(cierre.value);
      fechaFormateadaC = this.datePipe.transform(fechaObjC, 'yyyy-MM-dd HH:mm:ss')!;
  
      const formData = new FormData();
      formData.append('apertura', fechaFormateadaA),
      formData.append('cierre', fechaFormateadaC)
  
      this.isLoading = true;
      this.evaluacionesService.getObtenerResultadosEvaluacion(formData).subscribe((data: any) => {

        this.dtOptions = {
          lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
          pagingType: 'full_numbers',
          pageLength: 5,
          columnDefs: [
            { "width": "2%", "targets": 0 },
            { "width": "25%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "25%", "targets": 3 },
            { "width": "10%", "targets": 4 }
          ],
          language: {
            url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
          }
        };
              
        this.listaResultadoEvaluacion = data.dataDB;
        console.log(this.listaResultadoEvaluacion)
  
        this.isLoading = false;
        if(this.listaResultadoEvaluacion.length != 0) {
          setTimeout(() => {
            this.dtTrigger.next(0);
          }, 1000);
        } 
      });
    } else {
      this.toastr.warning('Debes seleccionar el rango de fechas para ver los resultados!', 'Advertencia!');
    }

  }




}
