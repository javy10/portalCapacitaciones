import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-dtgrupos',
  templateUrl: './dtgrupos.component.html',
  styleUrls: ['./dtgrupos.component.css']
})
export class DtgruposComponent implements OnInit{


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = false;
  listaGrupos: any = [];
  listaColaboradores: any = [];
  formGrupos: FormGroup;

  constructor(private fb:FormBuilder, private _colaboradorService: ColaboradorService){
    this.formGrupos = this.fb.group({
      'nombre': ['', Validators.required],
      'inicia': ['', Validators.required],
      'termina': ['', Validators.required],
    });
  }

  get nombre() {
    return this.formGrupos.get('nombre') as FormControl;
  }
  get inicia() {
    return this.formGrupos.get('inicia') as FormControl;
  }
  get termina() {
    return this.formGrupos.get('termina') as FormControl;
  }

  ngOnInit(): void {
    this.loadColaborador();
  }

  loadColaborador() {
    this.isLoading = true;
    this._colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaboradores = data.dataDB;
      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 1000);
    });
  }

  cancelar() {
    
  }

  eliminar(item: any) {

  }

  cargar() {

  }




}

