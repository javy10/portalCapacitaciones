import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configdepartamentocargo',
  templateUrl: './configdepartamentocargo.component.html',
  styleUrls: ['./configdepartamentocargo.component.css']
})
export class ConfigdepartamentocargoComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();

  formDepartamento: FormGroup;
  formCargos: FormGroup;

  listaDepartamentos:any=[];
  listaCargos:any=[];

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  departamento_id:any;
  Id:any;

  datosUsuario: any;


  constructor(public fb:FormBuilder, private colaboradorService:ColaboradorService, private toastr: ToastrService, ) {
    
    this.formDepartamento = this.fb.group({
      'nombre': ['', Validators.required],
    });
    this.formCargos = this.fb.group({
      'nombreC': ['', Validators.required],
    });
  }

  get nombre() {
    return this.formDepartamento.get('nombre') as FormControl;
  }
  get nombreC() {
    return this.formCargos.get('nombreC') as FormControl;
  }


  ngOnInit(): void {
    
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      //processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "2%", "targets": 1 },
        { "width": "15%", "targets": 2 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };

    this.dtOptions1 = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      //processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "2%", "targets": 1 },
        { "width": "15%", "targets": 2 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };

    this.loadDepartamentos();
  }

  loadDepartamentos() {
    this.colaboradorService.getDepartamento().subscribe((data: any) => {
      //console.log(data)
      this.listaDepartamentos = data
      //console.log(this.listaDepartamentos)
    });
  }

  obtenerValorFila(item: any) {

    const boton = document.getElementById('btnAgregarCargo') as HTMLButtonElement;
    boton!.disabled = false;

    if(item) {
      this.datosUsuario = this.colaboradorService.getDatos();
      this.Id = this.datosUsuario[0].cargo_id;
      //console.log(this.datosUsuario)
      
      this.departamento_id = item.id;
      this.colaboradorService.postDeptCargo(item.id).subscribe((response) => {
        //console.log(response.dataDB)
        this.listaCargos = [];
        this.listaCargos = response.dataDB;
  
        if (this.datatableElement.dtInstance) {
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            //this.dtTrigger1.next(0);
            this.listaCargos = [];
          });
        }
      });
    }

  }

  guardar() {
    const nombre = this.formDepartamento.value.nombre;
    const nombreMayuscula = nombre.toUpperCase();

    const formData = new FormData();
    formData.append('nombre', nombreMayuscula)

    this.colaboradorService.saveDepartamento(formData).subscribe((response) => {
      console.log(response.success)
      if(response.success) {
        this.toastr.success('Departamento registrado con éxito!', 'Éxito!');
        this.loadDepartamentos();
        // setTimeout(() => {
        //   location.reload();
        // }, 1000);
      }
    });

  }

  guardarC() {
    const nombre = this.formCargos.value.nombreC;
    const nombreMayuscula = nombre.toUpperCase();

    const formData = new FormData();
    formData.append('nombre', nombreMayuscula)
    formData.append('departamento_id', this.departamento_id)

    this.colaboradorService.saveCargo(formData).subscribe((response) => {
      console.log(response.success)
      if(response.success) {
        this.toastr.success('Cargo registrado con éxito!', 'Éxito!');
        //this.listaCargos
        // setTimeout(() => {
        //   location.reload();
        // }, 1000);
      }
    });
  }

  resetForm() {
    this.formDepartamento.reset();
    this.formCargos.reset();
  }

  eliminarCargo(id:any) {

    //console.log(id)
    Swal.fire({
      title: 'Estás seguro de deshabilitar éste cargo?',
      text: "El cargo ya no aparecera en el Portal de Capacitaciones!",
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
        this.colaboradorService.eliminarCargo(id).subscribe((response) => {
          if(response.success) {
            this.toastr.success('Cargo deshabilitado con éxito.!', 'Éxito!');
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });
      }
    });
  }
  


}
