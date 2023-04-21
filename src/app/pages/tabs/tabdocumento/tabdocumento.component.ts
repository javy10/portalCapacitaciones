import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabdocumento',
  templateUrl: './tabdocumento.component.html',
  styleUrls: ['./tabdocumento.component.css']
})
export class TabdocumentoComponent implements OnInit {

  constructor() {  }

  @Output()
  eventoEnviarDataPer = new EventEmitter<any>()
  @Output()
  eventoEnviarDataDoc = new EventEmitter<any>()

  arreglo = [];

  ngOnInit(): void {
    console.log(this.arreglo);
  }

  pasarDatos(datos:any) {
    console.log(datos);
    this.eventoEnviarDataPer.emit(datos);
  }
  enviarDatos(datos:any ) {
    console.log(datos);
    this.eventoEnviarDataDoc.emit(datos);
  }


}
