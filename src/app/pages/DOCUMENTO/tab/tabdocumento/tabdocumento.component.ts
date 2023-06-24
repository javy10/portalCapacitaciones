import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  idDoc:any;

  @Input() 
  id: any;

  arreglo = [];

  ngOnInit(): void {
    console.log(this.arreglo);
    console.log(this.id);
    this.idDoc = this.id;
    console.log(this.idDoc)
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
