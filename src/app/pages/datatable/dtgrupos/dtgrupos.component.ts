import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtgrupos',
  templateUrl: './dtgrupos.component.html',
  styleUrls: ['./dtgrupos.component.css']
})
export class DtgruposComponent implements OnInit{


  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  
  isLoading = false;
  listaGrupos: any = [];
  grupos:any;
  listaColaboradores: any = [];
  formGrupos: FormGroup;
  @Output()
  eventoEnviarDataGrupo = new EventEmitter<any>()

  constructor(
    private fb:FormBuilder, 
    private _colaboradorService: ColaboradorService, 
    private evaluacionService: EvaluacionesService,
    private toastr: ToastrService,
    ){
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
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "20%", "targets": 1 },
        { "width": "12%", "targets": 2 },
        { "width": "12%", "targets": 3 },
        { "width": "12%", "targets": 4 },
        { "width": "12%", "targets": 5 },
        { "width": "12%", "targets": 6 },
        { "width": "8%", "targets": 7 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadGrupos();
    
  }

  loadGrupos() {
    this.isLoading = true;
    this.evaluacionService.getObtenerGrupo().subscribe((data: any) => {
      this.listaGrupos = data.dataDB;
      console.log(this.listaGrupos)
      this.isLoading = false;
      if(this.listaGrupos.length != 0) {
        setTimeout(() => {
            this.dtTrigger.next(0);
        }, 1000);
      }
    });
  }

  eliminar(datos: any) {
    console.log(datos)
    Swal.fire({
      title: 'Estás seguro de eliminar éste grupo?',
      text: "El grupo ya no aparecera en el Portal de Capacitaciones!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, seguro!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        new Promise(resolve => resolve(this.evaluacionService.eliminar(datos.grupo_id).subscribe((response) => {
          if(response.success == true) {
            this.toastr.success('Grupo eliminado con éxito!', 'Éxito!');
          }
          setTimeout(() => {
            this.loadGrupos();
            window.location.reload();
          }, 2000);
        })));
      }
    });
  }

  cargar() {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
    const userCells = document.querySelectorAll('table td.user');
    
    const checkedUsers: string[] = [];
    
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const userCell = userCells[index];
        const userName = userCell.textContent?.trim();
        if (userName) {
          checkedUsers.push(userName);
        }
      }
    });
    
    console.log(checkedUsers);
    let cantidad;
    for (let index = 0; index < checkedUsers.length; index++) {
      cantidad = checkedUsers.filter((item:any) => item).length;
    }
    console.log(cantidad);
    let today = new Date().toLocaleString();
    this.grupos = {
      'nombre': this.formGrupos.value.nombre,
      'apertura': this.formGrupos.value.inicia,
      'cierre': this.formGrupos.value.termina,
      'colaboradores': cantidad + ' colaboradores',
      'colaboradores_id': checkedUsers,
      'ultimaModificacion': today,
      'fechaRegistro': today,
    }
    this.listaGrupos.push(this.grupos);
    this.grupos = '';
    console.log(this.listaGrupos)
    this.enviarDatos(this.listaGrupos);
  }

  enviarDatos(listaGrupo:any) {
    console.log(listaGrupo)
    this.eventoEnviarDataGrupo.emit(listaGrupo);
  }



}

