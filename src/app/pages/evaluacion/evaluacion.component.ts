import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit{

  datosGrupo: any;
  datosPregunta: any;
  formEvaluacion!: FormGroup;

  constructor(public fb:FormBuilder, private evaluacionesServices: EvaluacionesService) {
    this.formEvaluacion = this.fb.group({
      'tituloE': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'calificacion': ['', Validators.required],
      'intentos': ['', Validators.required]
      //'minutos': ['', Validators.required],
    })
  }

  get tituloE() {
    return this.formEvaluacion.get('tituloE') as FormControl;
  }
  get descripcion() {
    return this.formEvaluacion.get('descripcion') as FormControl;
  }
  get calificacion() {
    return this.formEvaluacion.get('calificacion') as FormControl;
  }
  get intentos() {
    return this.formEvaluacion.get('intentos') as FormControl;
  }

  ngOnInit(): void {
    
  }

  pasarDatosGrupo(datos:any) {
    console.log(datos)
    this.datosGrupo = datos;
    console.log(this.datosGrupo)
  }

  pasarDatosPregunta(datos:any){
    console.log(datos)
    this.datosPregunta = datos;
    console.log(this.datosPregunta)
  }

  guardarEvaluacion(){
    console.log(this.datosPregunta)
    console.log(this.datosGrupo)

    const formData = new FormData();
    formData.append('tituloE' , this.formEvaluacion.value.tituloE),
    formData.append('descripcion' , this.formEvaluacion.value.descripcion),
    formData.append('calificacion' , this.formEvaluacion.value.calificacion),
    formData.append('colaborador_id' , localStorage.getItem('id')!)

    









  }










}
