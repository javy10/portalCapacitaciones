import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  ngSelect: any;

  constructor(
    public fb:FormBuilder,
    private evaluacionesServices: EvaluacionesService, 
    private activeRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private router: Router
    ) {
    this.formEvaluacion = this.fb.group({
      'nombre': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'calificacionMinima': ['', Validators.required],
      'intentos': ['', Validators.required]
      //'minutos': ['', Validators.required],
    })
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

  ngOnInit(): void {
    this.ngSelect = 0;

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

  










}
