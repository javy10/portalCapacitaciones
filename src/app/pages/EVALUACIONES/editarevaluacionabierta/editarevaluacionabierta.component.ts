import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarevaluacionabierta',
  templateUrl: './editarevaluacionabierta.component.html',
  styleUrls: ['./editarevaluacionabierta.component.css']
})
export class EditarevaluacionabiertaComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = false;
  listaPreguntas:any=[];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;


  constructor(private evaluacionesService: EvaluacionesService, private activeRoute: ActivatedRoute, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.loadPreguntas();

  }

  loadPreguntas() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id)
    return this.evaluacionesService.getObtenerPreguntasId(id).subscribe((data: any) => {
      this.listaPreguntas = data.dataDB;
      this.dtTrigger.next(0);
      console.log(data.dataDB)
    });
  }
 
  seleccionarFila(index: number) { 
    let id = this.listaPreguntas[index].id;
    let valorPregunta = this.listaPreguntas[index].valorPregunta;
    //console.log('id:', id, 'valorPregunta:', valorPregunta);

    let preguntaInput = document.getElementById("pregunta") as HTMLInputElement;
    let idInput = document.getElementById("id") as HTMLInputElement;
    idInput.value = id;
    preguntaInput.value = valorPregunta;

  }

  async editar() {
    
    let preguntaInput = document.getElementById("pregunta") as HTMLInputElement;
    let idInput = document.getElementById("id") as HTMLInputElement;

    if(idInput.value) {
      const formData = new FormData();    
      formData.append('id', idInput.value);
      formData.append('valorPregunta', preguntaInput.value);
  
      const result = await this.evaluacionesService.editarPregunta(formData).toPromise();
      
      if(result.success == true) {
        this.toastr.success('Pregunta actualizada con éxito!', 'Éxito!');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } else {
      this.toastr.warning('Debes seleccionar una pregunta primero para poder actualizar!', 'Warning!');
    }
  }

  deshabilitar(item:any) {
    
    //console.log(item)

    Swal.fire({
      title: 'Quiéres eliminar ésta pregunta?',
      text: "La pregunta ya no aparecerá en la evaluación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, de acuerdo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluacionesService.deshabilitarPregunta(item.id).subscribe((result) => {
          if(result.success == true) {
            this.toastr.success('Pregunta eliminada con éxito!', 'Éxito!');
            setTimeout(() => {
              window.location.reload(); 
            }, 500);
          }
        });
      }
    })




  }



}