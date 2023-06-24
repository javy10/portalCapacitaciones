import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  detallePer: any;
  archivoPer: any;

  nombreDepartamento: any = [];
  nombreColaborador: any = [];

  @Output()
  eventoEnviarDataPer = new EventEmitter<any>();

  @Input()
  idDoc: any;

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

    console.log(this.idDoc)
    this.loadDetallePermisos();
    
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
        { "width": "20%", "targets": 1 },
        { "width": "30%", "targets": 2 },
        { "width": "8%", "targets": 3 },
        { "width": "8%", "targets": 4 },
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

  async loadDetallePermisos() {
    return  await new Promise(resolve => resolve( this.documentoService.getDetallePermisosID(this.idDoc).subscribe((data: any) => {
      console.log(data.dataDB)

      for (let index = 0; index < data.dataDB.length; index++) {

        console.log(data.dataDB[index])
          
        this.detallePer = {
          'id': data.dataDB[index].id,
          'nombre': data.dataDB[index].nombre == null ? data.dataDB[index].nombres +' '+ data.dataDB[index].apellidos : data.dataDB[index].nombre,
          'tipoPermiso_id': data.dataDB[index].departamento_id == null ? 2 : 1,
          'fechaRegistro': data.dataDB[index].created_at,
        }
        
        this.listaPermisos.push(this.detallePer)
        this.detallePer = '';
        console.log(this.listaPermisos)
      }
    })));
  }
 
  filaSeleccionada:any;
  nombre:any;
  idPermiso:any;
  idDetallePermiso:any;

  datosPermisos(id:number, nombre:any){
    console.log(id)
    console.log(nombre)
    this.nombre = nombre;

    this.cancelar();

    const filas = document.querySelectorAll('table tr');

    // Recorre las filas y agrega el evento de clic
    filas.forEach((fila, indice) => {
      fila.addEventListener('click', (event) => {
        // Aquí obtienes el índice de la fila seleccionada
        console.log('Índice de fila seleccionada:', indice);
        //this.filaSeleccionada = indice;
        this.filaSeleccionada = (event.target as HTMLTableRowElement).closest('tr');
      });
    });
    
    
    
    new Promise(resolve => resolve( this.documentoService.getDetalleID(id).subscribe((data: any) => {
      console.log(data.dataDB)
      this.idPermiso = data.dataDB[0].permiso_id
      this.idDetallePermiso = data.dataDB[0].id

      const btnGuardar = document.getElementById('btnAceptarP') as HTMLInputElement;
      btnGuardar!.hidden = true;
      
      const btnEdit = document.getElementById('btnEditarP') as HTMLInputElement;
      btnEdit!.hidden = false;

      if(data.dataDB[0].departamento_id == null) {
        const colabCheck = document.getElementById("colaborador") as HTMLInputElement;
        const dep = document.getElementById("departamento") as HTMLInputElement;
        const colab = document.getElementById("colaboradorSelect") as HTMLInputElement;
        colabCheck.checked = true;
        colab.disabled = false;
        dep.checked = false;
 
        this.colaboradorService.getColaboradorID(data.dataDB[0].colaborador_id).subscribe((res: any) => {
          this.ngSelectC = res.dataDB.id;
        });

      } else {
        const dep = document.getElementById("departamento") as HTMLInputElement;
        const depart = document.getElementById("departamentoSelect") as HTMLInputElement;
        const colabCheck = document.getElementById("colaboradorSelect") as HTMLInputElement;
        dep.checked = true;
        depart.disabled = false;
        colabCheck.checked = false;

        this.colaboradorService.getDepartamentoId(data.dataDB[0].departamento_id).subscribe((res: any) => {
          console.log(res.dataDB)
          this.ngSelectD = res.dataDB.id;
        });
      }

      

    })));
  } 

  editar() {

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

    const celdas = this.filaSeleccionada.querySelectorAll('td');
    console.log(celdas)

    const tipoP = tipo.value;
    const nombre =  nombreDepar == '' ? nombreColab : nombreDepar;
    const fecha = today;

    console.log(tipoP)
    console.log(nombre)

    celdas[1].innerHTML = tipoP == '1' ? 'Departamento' : 'Colaborador';
    celdas[2].innerHTML = nombre;
    celdas[3].innerHTML = fecha;

    
    if(tipoP == '2'){
      const indiceObjeto = this.listaPermisos.findIndex((objeto:any) => objeto.nombre  === this.nombre);
      console.log(indiceObjeto)
      if (indiceObjeto !== -1) {
        this.listaPermisos[indiceObjeto].idDetallePermiso = this.idDetallePermiso;
        this.listaPermisos[indiceObjeto].permiso_id = this.idPermiso;
        this.listaPermisos[indiceObjeto].tipoPermiso_id = tipo.value;
        this.listaPermisos[indiceObjeto].nombre = nombreColab;
        this.listaPermisos[indiceObjeto].departamento_id = idDepar;
        this.listaPermisos[indiceObjeto].colaborador_id = idColab;
        this.listaPermisos[indiceObjeto].fechaRegistro = today;
        
      }
    } else {
      const indiceObjeto = this.listaPermisos.findIndex((objeto:any) => objeto.nombre === this.nombre);

      if (indiceObjeto !== -1) {
        this.listaPermisos[indiceObjeto].idDetallePermiso = this.idDetallePermiso;
        this.listaPermisos[indiceObjeto].permiso_id = this.idPermiso;
        this.listaPermisos[indiceObjeto].tipoPermiso_id = tipo.value;
        this.listaPermisos[indiceObjeto].nombre = nombreDepar;
        this.listaPermisos[indiceObjeto].departamento_id = idDepar;
        this.listaPermisos[indiceObjeto].colaborador_id = idColab;
        this.listaPermisos[indiceObjeto].fechaRegistro = today;
        
      }
    }
    console.log(this.listaPermisos)

    this.pasarDatos(this.listaPermisos);

    
  }
  
  
}
