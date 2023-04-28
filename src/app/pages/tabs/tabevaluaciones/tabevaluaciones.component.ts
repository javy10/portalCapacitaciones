import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabevaluaciones',
  templateUrl: './tabevaluaciones.component.html',
  styleUrls: ['./tabevaluaciones.component.css']
})
export class TabevaluacionesComponent implements OnInit{


  @Output()
  eventoEnviarDataGrupo = new EventEmitter<any>()
  @Output()
  eventoEnviarDataPregunta = new EventEmitter<any>()

  ngOnInit(): void {
    
  }


  enviarDatos(datos:any ) {
    console.log(datos);
    this.eventoEnviarDataGrupo.emit(datos);
  }

  pasarDatos(datos:any) {
    console.log(datos);
    this.eventoEnviarDataPregunta.emit(datos);
  }
















}

