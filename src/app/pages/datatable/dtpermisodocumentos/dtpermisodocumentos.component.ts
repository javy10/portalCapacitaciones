import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-dtpermisodocumentos',
  templateUrl: './dtpermisodocumentos.component.html',
  styleUrls: ['./dtpermisodocumentos.component.css']
})
export class DtpermisodocumentosComponent implements OnInit{
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaDepartamento:any=[];
  listaColaborador:any=[];
  selectedOption!: any;
  formPermiso!: FormGroup;
  listaPermisos: any = [];
  permiso: any;
  ngSelectD: any;
  ngSelectC: any;

  @Output()
  eventoEnviarDataPer = new EventEmitter<any>()

  constructor(private documentoService:DocumentoService, private colaboradorService: ColaboradorService, private fb:FormBuilder) {
    this.formPermiso = this.fb.group({
      'departamento': ['', Validators.required],
      'colaborador': ['', Validators.required],
      'departamentoSelect': ['', Validators.required],
      'colaboradorSelect': ['', Validators.required],
    });
  }

  get departamento() {
    return this.formPermiso.get('departamento') as FormControl;
  }
  get colaborador() {
    return this.formPermiso.get('colaborador') as FormControl;
  }
  get departamentoSelect() {
    return this.formPermiso.get('departamentoSelect') as FormControl;
  }
  get colaboradorSelect() {
    return this.formPermiso.get('colaboradorSelect') as FormControl;
  }

  ngOnInit(): void {
    
    const departamento = document.getElementById("departamento") as HTMLInputElement;
    const colaborador = document.getElementById("colaborador") as HTMLInputElement;
    const colab = document.getElementById("colaboradorSelect") as HTMLInputElement;
    const depart = document.getElementById("departamentoSelect") as HTMLInputElement;
    
    this.loadDepartamento();
    this.loadColaboradores();

    colab.disabled = true;
    depart.disabled = true;
    this.ngSelectD = 0;
    this.ngSelectC = 0;

    departamento.addEventListener("click", function() {
      colab.disabled = true;
      depart.disabled = false;
      //this.ngSelectC = 0;
    });
    colaborador.addEventListener("click", function() {
      depart.disabled = true;
      colab.disabled = false;
      //this.ngSelectD = 0;
    });

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
        { "width": "20%", "targets": 3 },
        { "width": "15%", "targets": 4 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
  }

  async loadDepartamento() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getDepartamento().subscribe((data: any) => {
      this.listaDepartamento = data;
    })));
  }
  async loadColaboradores() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaborador = data.dataDB;
    })));
  }

  cancelar() {
    const myForm = document.getElementById("form") as HTMLFormElement;
    const colab = document.getElementById("colaboradorSelect") as HTMLInputElement;
    const depart = document.getElementById("departamentoSelect") as HTMLInputElement;
    colab.disabled = true;
    depart.disabled = true;
    this.ngSelectD = 0;
    this.ngSelectC = 0;
    this.selectedOption = null;
    myForm.reset();
  }

  cargar() 
  {
    let today = new Date().toLocaleString();
    const tipo = document.querySelector('input[name="tipo"]:checked') as HTMLInputElement;
    let nombreDepar = '', idDepar = 0;
    let nombreColab = '', idColab = 0;

    if(tipo.value == '1') {
      const combo = document.getElementById('departamentoSelect') as HTMLSelectElement;
      const nombreCombo = combo.options[combo.selectedIndex].text;
      nombreDepar = nombreCombo;
      idDepar = this.formPermiso.value.departamentoSelect;
    } else if(tipo.value == '2') {
      const comboC = document.getElementById('colaboradorSelect') as HTMLSelectElement;
      const nombreComboC = comboC.options[comboC.selectedIndex].text;
      nombreColab = nombreComboC;
      idColab = this.formPermiso.value.colaboradorSelect;
    }

    this.permiso = {
      'tipoPermiso_id': tipo.value,
      'nombre': nombreDepar == '' ? nombreColab : nombreDepar,
      'departamento_id': idDepar,
      'colaborador_id': idColab,
      'fechaRegistro': today,
    }
    this.listaPermisos.push(this.permiso);
    
    console.log(this.listaPermisos)
    this.permiso = {};
    //this.dtTrigger.next(0);
    this.cancelar();
    console.log(this.listaPermisos)
    this.pasarDatos(this.listaPermisos);
    
  }

  pasarDatos(listaPermisos:any) {
    console.log(listaPermisos)
    this.eventoEnviarDataPer.emit(listaPermisos);
  }

  eliminar(item: any) {
    // Eliminar el elemento con valor 3 sin modificar el array original
    // Eliminar el elemento con valor 3
    const indice = this.listaPermisos.indexOf(item);
    if (indice !== -1) {
      this.listaPermisos.splice(indice, 1);
    }
    console.log(this.listaPermisos);
  }
  
}
