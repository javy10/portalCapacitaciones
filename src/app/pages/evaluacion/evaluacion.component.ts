import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit{

  datosGrupo: any;
  datosPregunta: any;

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
  }










}
