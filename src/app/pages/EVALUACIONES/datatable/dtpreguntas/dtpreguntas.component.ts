
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DocumentoService } from 'src/app/services/documento.service';


@Component({
  selector: 'app-dtpreguntas',
  templateUrl: './dtpreguntas.component.html',
  styleUrls: ['./dtpreguntas.component.css']
})
export class DtpreguntasComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = false;
  listaPreguntas: any = [];
  listaRespuestas: any = [];
  formPregunta!: FormGroup;
  formRespuesta!: FormGroup;
  ngSelectC: any;
  respuestas:any;
  preguntas:any;
  @Output()
  eventoEnviarDataPregunta = new EventEmitter<any>()


  constructor(private documentoService: DocumentoService, private fb:FormBuilder, private http: HttpClient, private datePipe: DatePipe){
    this.formPregunta = this.fb.group({
      'pregunta': ['', Validators.required],
    });
    this.formRespuesta = this.fb.group({
      'respuesta': ['', Validators.required],
      'correcta': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "25%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "15%", "targets": 3 },
        { "width": "15%", "targets": 4 },
        { "width": "15%", "targets": 5 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.ngSelectC = 0;
  }

  get pregunta() {
    return this.formPregunta.get('pregunta') as FormControl;
  }
  get respuesta() {
    return this.formRespuesta.get('respuesta') as FormControl;
  }
  get correcta() {
    return this.formRespuesta.get('correcta') as FormControl;
  }

  
  cargarRespuesta() {
    this.isLoading = true;
    let today = new Date().toLocaleString();
    this.respuestas = {
      'valor': this.formRespuesta.value.respuesta,
      'correcta': this.formRespuesta.value.correcta,
      'ultimaModificacion': today,
      'fechaRegistro': today,
    }
    console.log(this.respuestas)
    this.listaRespuestas.push(this.respuestas);
    console.log(this.listaRespuestas)
    this.respuestas = '';
    this.isLoading = false;
  }

  cargar() {
    let cantidad;
    for (let index = 0; index < this.listaRespuestas.length; index++) {
      cantidad = this.listaRespuestas.filter((item:any) => item.valor).length;
    }
    console.log(cantidad);
    let today = new Date().toLocaleString();
    this.preguntas = {
      'pregunta': this.formPregunta.value.pregunta,
      'opciones': cantidad + ' opciones',
      'ultimaModificacion': today,
      'fechaRegistro': today,
      'respuestas': this.listaRespuestas
    }
    this.listaPreguntas.push(this.preguntas);
    this.preguntas = '';
    this.pasarDatos(this.listaPreguntas);
    console.log(this.listaPreguntas);
  }


  cancelar() {
    
  }

  eliminar(item: any) {

  }

  pasarDatos(listaRespuestas:any) {
    console.log(listaRespuestas)
    this.eventoEnviarDataPregunta.emit(listaRespuestas);
  }





}