import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit{

  datosGrupo: any;
  datosPregunta: any;
  formEvaluacion!: FormGroup;
  formGrupos: FormGroup;
  ngSelect: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();

  isLoading = false;
  listaColaboradores:any;
  selectedCheckboxCount = 0;

  datosEvaluacion: any;
  grupoDatos: any;
  public datos: any[] = [];
  listaGrupos:any = [];
  listaUsuariosPorGrupo:any = [];

  @ViewChild(DataTableDirective, { static: true })
  datatableElement!: DataTableDirective;

  constructor(
    public fb:FormBuilder,
    private evaluacionesServices: EvaluacionesService, 
    private activeRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private router: Router,
    private _colaboradorService: ColaboradorService, 
    private datePipe: DatePipe,
    ) {
    this.formEvaluacion = this.fb.group({
      'nombre': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'calificacionMinima': ['', Validators.required],
      'intentos': ['', Validators.required]
      //'minutos': ['', Validators.required],
    });

    this.formGrupos = this.fb.group({
      'nombreG': ['', Validators.required],
      'apertura': ['', Validators.required],
      'cierre': ['', Validators.required],
      'check': ['', Validators.required],
    });
  }

  get nombre() {
    return this.formEvaluacion.get('nombre') as FormControl;
  }
  get descripcion() {
    return this.formEvaluacion.get('descripcion') as FormControl;
  }
  get calificacionMinima() {
    return this.formEvaluacion.get('calificacionMinima') as FormControl;
  }
  get intentos() {
    return this.formEvaluacion.get('intentos') as FormControl;
  }

  get nombreG() {
    return this.formGrupos.get('nombreG') as FormControl;
  }
  get apertura() {
    return this.formGrupos.get('apertura') as FormControl;
  }
  get cierre() {
    return this.formGrupos.get('cierre') as FormControl;
  }
  get check() {
    return this.formGrupos.get('check') as FormControl;
  }

  ngOnInit(): void {
    this.ngSelect = 0;

    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "30%", "targets": 1 },
        { "width": "30%", "targets": 2 },
        { "width": "30%", "targets": 3 },
        { "width": "10%", "targets": 4 },
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
      processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "30%", "targets": 1 },
        { "width": "30%", "targets": 2 },
        { "width": "30%", "targets": 3 },
        { "width": "10%", "targets": 4 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadColaborador();
    this.cargar();

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

  loadColaborador() {
    this.isLoading = true;
    this._colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaboradores = data.dataDB;
      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 10);
    });
  }
  

  guardarEvaluacion(){
    console.log(this.datosPregunta)
    console.log(this.datosGrupo)

    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id)

    const formData = new FormData();
    formData.append('nombre' , this.formEvaluacion.value.nombre),
    formData.append('descripcion' , this.formEvaluacion.value.descripcion),
    formData.append('calificacionMinima' , this.formEvaluacion.value.calificacionMinima),
    formData.append('intentos' , this.formEvaluacion.value.intentos),
    formData.append('grupo_id' , id!.toString())

    this.evaluacionesServices.saveEvaluacion(formData).subscribe((response) => {
      if(response.success == true) {
        this.evaluacionesServices.editarEvaluacionDetalleGrupo(formData).subscribe((resp) => {
          if(resp.success) {
            this.toastr.success('Evaluación creada con éxito!', 'Éxito!');
            
          }
          setTimeout(() => {
            this.router.navigate(['/dashboard/list-evaluaciones']);
        }, 1000);
        });
      } else {
        this.toastr.error('A ocurrido un error no controlado...', 'Error!');
      }
    });
  }

  cargar() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id)
    const nombre = this.activeRoute.snapshot.paramMap.get('idG');
    console.log(nombre)

    if(id && !nombre){
      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar evaluación';

      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = true;

      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false;

      this.activeRoute.params.subscribe( e => {
        let id = e['id'];
        if(id) {
          this.evaluacionesServices.getEvaluacionId(id).subscribe((response) => {
            this.formEvaluacion.patchValue(response.dataDB);
          });
        }
      });
    } else {
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = true;
    }
  }

  editar() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    //console.log(id)

    const formData = new FormData();
    formData.append('nombre' , this.formEvaluacion.value.nombre),
    formData.append('descripcion' , this.formEvaluacion.value.descripcion),
    formData.append('calificacionMinima' , this.formEvaluacion.value.calificacionMinima),
    formData.append('intentos' , this.formEvaluacion.value.intentos),
    formData.append('evaluacion_id' , id!)

    this.evaluacionesServices.editarEvaluacion(formData).subscribe((response) => {
      if(response.success == true) {
        this.toastr.success('Evaluación actualizada con éxito!', 'Éxito!');
        setTimeout(() => {
          this.router.navigate(['/dashboard/list-evaluaciones']);
        }, 1000);
      } else {
        this.toastr.error('A ocurrido un error no controlado...', 'Error!');
      }
    });

  }

  // Función que se ejecuta cuando se produce un cambio en el estado del checkbox
  handleCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCheckboxCount++;
    } else {
      this.selectedCheckboxCount--;
    }
  }

  guardar() {

    console.log(this.datosEvaluacion)

    
    // if(this.selectedCheckboxCount > 0 && this.datosEvaluacion != undefined) {
    //   let fechaFormateadaA = '';
    //   let fechaFormateadaC = '';
    //   const apertura = document.querySelector("#apertura") as HTMLInputElement;
    //   const cierre = document.querySelector("#cierre") as HTMLInputElement;
    //   let fechaObjA = new Date(apertura.value);
    //   fechaFormateadaA = this.datePipe.transform(fechaObjA, 'yyyy-MM-dd HH:mm:ss')!;
    //   let fechaObjC = new Date(cierre.value);
    //   fechaFormateadaC = this.datePipe.transform(fechaObjC, 'yyyy-MM-dd HH:mm:ss')!;

    //   const formData = new FormData();
    //   formData.append('nombre' , this.formGrupos.value.nombre),
    //   formData.append('apertura' , fechaFormateadaA),
    //   formData.append('cierre' , fechaFormateadaC)
    //   formData.append('intentos' , this.formEvaluacion.value.intentos)

    //   console.log(this.formGrupos.value.nombre)
    //   console.log(fechaFormateadaA)
    //   console.log(fechaFormateadaC)

    //   this.evaluacionesServices.saveGrupo(formData).subscribe((response) => {
    //     if(response.success == true) {

    //       const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
    //       const userCells = document.querySelectorAll('table td.user');
    //       const checkedUsers: string[] = [];
          
    //       checkboxes.forEach((checkbox, index) => {
    //         if (checkbox.checked) {
    //           const userCell = userCells[index];
    //           const userName = userCell.textContent?.trim();
    //           if (userName) {
    //             checkedUsers.push(userName);
    //           }
    //         }
    //       });
    //       console.log(checkedUsers);

    //       this.evaluacionesServices.saveEvaluacion(this.datosEvaluacion).subscribe((res) => {
    //         if(res.success == true) {
    //           console.log(this.datosEvaluacion)
              
    //           for (let index = 0; index < checkedUsers.length; index++) {
    //             const element = checkedUsers[index];
    //             console.log(element)
    //             formData.append('colaborador_id' , element)
    //             this.evaluacionesServices.saveDetalleGrupo(formData).subscribe((response) => {
    //             });
    //           }
              
    //           this.toastr.success('Grupo de evaluación creado con éxito!', 'Éxito!');
    //           setTimeout(() => {
    //             this.router.navigate(['dashboard/list-grupos']);
    //           }, 1000);

    //           this.datosEvaluacion = {}
    //         }
    //       });


    //     }
    //   });

    // } else {
    //   this.toastr.warning('Debes seleccionar al menos un colaborador o verifica si agregaste una evaluación!', 'Advertencia!');
    // }


  }

  cancelar() {}

  recargar() {
    if (sessionStorage.getItem('reloaded') === 'true') {
      sessionStorage.setItem('reloaded', 'false');
    } else {
      sessionStorage.setItem('reloaded', 'true');
      location.reload();
    }
  }

  eliminarEvaluacion(item:any) {

  }

  reset() {
    console.log(this.selectedItems)
    this.formGrupos.reset();
    this.selectedItems = []
    console.log(this.selectedItems)
  }



  selectedItems: any[] = [];
  isSelected(item: any) {
    //console.log(this.selectedItems)
    this.selectedItems.some((selectedItem) => selectedItem.id === item.id);
    //console.log(this.selectedItems)
  }

  onCheckboxChange(item: any) {
    //console.log(this.selectedItems)
    const index = this.selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
    //console.log(this.selectedItems)
    if (index > -1) {
      // Si el elemento ya estaba seleccionado, se elimina de la matriz selectedItems
      this.selectedItems.splice(index, 1);
    } else {
      // Si el elemento no estaba seleccionado, se agrega a la matriz selectedItems
      this.selectedItems.push(item.id);
      console.log(this.selectedItems)
    }
  }

  agregar() {

    let fechaFormateadaA = '';
    let fechaFormateadaC = '';
    const apertura = document.querySelector("#apertura") as HTMLInputElement;
    const cierre = document.querySelector("#cierre") as HTMLInputElement;
    let fechaObjA = new Date(apertura.value);
    fechaFormateadaA = this.datePipe.transform(fechaObjA, 'yyyy-MM-dd HH:mm:ss')!;
    let fechaObjC = new Date(cierre.value);
    fechaFormateadaC = this.datePipe.transform(fechaObjC, 'yyyy-MM-dd HH:mm:ss')!;

    this.grupoDatos = {
      'nombre': this.formGrupos.value.nombreG,
      'apertura': fechaFormateadaA,
      'cierre': fechaFormateadaC,
      'intentos': this.formEvaluacion.value.intentos,
    }

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
    //this.listaUsuariosPorGrupo.push(checkedUsers)
    console.log(checkedUsers);
    console.log(this.selectedItems)
    this.grupoDatos.usuarios = this.selectedItems;
    this.selectedItems = []
    //console.log(this.grupoDatos)
    this.listaGrupos.push(this.grupoDatos)
    console.log( this.listaGrupos)

    setTimeout(() => {
      this.dtTrigger1.next(0);
    }, 10);

    const cardGrupo = document.getElementById('cardGrupo');
    cardGrupo!.hidden = false;

    this.datatableElement.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });

  }





}
