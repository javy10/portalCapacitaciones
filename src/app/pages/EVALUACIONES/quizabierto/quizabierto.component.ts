
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-quizabierto',
  templateUrl: './quizabierto.component.html',
  styleUrls: ['./quizabierto.component.css']
})
export class QuizabiertoComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;
  listadoPreguntas: any[] = [];
  listadoRespuestas: any[] = [];
  colaborador_id: any = localStorage.getItem('id');
  datos: any;
  datosCheckbox: any;
  evaluacion_id: any;
  pregunta_id: any[] = [];
  resultado: any[] = [];
  resultadoCheck: any[] = [];
  seleccionadas: any[] = [];
  seleccionadasCheck: any[] = [];
  radios: any[] = [];
  respuestasRadios:any[] = [];

  isLoading = false;
  intento:any;
  tituloEvaluacion:any;
  testAbierto:any;

  apertura:any;
  cierre:any;

  constructor(
    private evaluacionService: EvaluacionesService, 
    private toastr: ToastrService, 
    private router: Router, 
    private location: Location, 
    private route: ActivatedRoute,
    ) {

  }

  ngOnInit(): void {
    this.loadPreguntas();
  }

  async loadPreguntas() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    console.log(this.colaborador_id)
    const formData = new FormData();
    formData.append('colaborador_id', this.colaborador_id),
    formData.append('evaluacion_id', id!)

    const data = await this.evaluacionService.obtenerPreguntas(formData).toPromise();
      console.log(data.dataDB)
      this.apertura = data.dataDB[0].apertura;
      this.cierre = data.dataDB[0].cierre;

      console.log(this.apertura)
      console.log(this.cierre)

      const startDate = new Date(this.apertura);
      const endDate = new Date(this.cierre);
      const diff = endDate.getTime() - startDate.getTime();

      // Almacenar el contexto actual en una variable 
      const self = this;
      
      function updateTimer() {
        const now = new Date();
        const remaining = diff - (now.getTime() - startDate.getTime());
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);

        if (remaining <= 0) {
          self.evaluacionService.eliminarEvaluacion(id).subscribe((data: any) => {
            console.log(data.success)
          });
          clearInterval(timerInterval);
          Swal.fire({
            title: 'Tiempo agotado',
            text: "¡¡Se término el tiempo para responder ésta evaluación!!",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              self.router.navigate(['dashboard']);
              setTimeout(() => {
                window.location.reload();
              }, 1000)
            }
          });
          return;
        }
        
        document.getElementById('days')!.textContent = days.toString();
        document.getElementById('hours')!.textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes')!.textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds')!.textContent = seconds.toString().padStart(2, '0');
      }
      
      const timerInterval = setInterval(updateTimer, 1000);

      this.tituloEvaluacion = data.dataDB[0].nombre;
      this.testAbierto = data.dataDB[0].evaluada;
      const preguntasUnicas = data.dataDB.reduce((acc: any, pregunta: any) => {
        const preguntaExistente = acc.find((p: any) => p.valorPregunta === pregunta.valorPregunta);
        if (preguntaExistente) {
          this.evaluacion_id = pregunta.evaluacion_id;
 
          preguntaExistente.valorRespuestas.push(pregunta.valorRespuesta);
          preguntaExistente.respuesta_id.push(pregunta.respuesta_id);
        } else {
          acc.push({
            pregunta_id: pregunta.id,
            valorPregunta: pregunta.valorPregunta,
            valorRespuestas: [pregunta.valorRespuesta],
            respuesta_id: [pregunta.respuesta_id],
            tipoPregunta_id: pregunta.tipoPregunta_id,
            selectedAnswers: []
          });
        }   
        return acc;
      }, []);
 
      console.log(preguntasUnicas);
      this.listadoPreguntas = preguntasUnicas;
      console.log(this.listadoPreguntas);
      //console.log(this.evaluacion_id);
  }

  respuestas: any[] = [];

  guardarRespuesta(preguntaId: number, preguntaNombre: string, respuestaId: number, valorRespuesta: string) {
    const respuesta = {
      colaborador_id: this.colaborador_id,
      evaluacion_id: this.route.snapshot.paramMap.get('id'),
      pregunta_id: preguntaId,
      preguntaNombre: preguntaNombre,
      respuesta_id: respuestaId,
      valorRespuesta: valorRespuesta
    };
    //console.log(respuesta);
    this.respuestas.push(respuesta);
    //console.log(this.respuestas);
  }

  async guardarRespuestas() {
      
    // console.log(this.respuestas)

    // const lastObjects = this.respuestas.reduce((acc, obj) => {
    //   const respuesta_id = obj.pregunta_id[0];
    //   acc[respuesta_id] = obj;
    //   return acc;
    // }, {});
    // console.log(lastObjects)
    // const objetos = Object.values(lastObjects);
    // const newData = objetos.map((obj:any) => {
    //   const respuesta_id = obj.pregunta_id[0];
    //   return { ...obj, respuesta_id };
    // });
    
    // console.log(newData);

    // Creamos un objeto para almacenar el último valorRespuesta para cada pregunta_id
    const datos:any = [];
    // Recorremos el array y almacenamos el último valorRespuesta para cada pregunta_id
    this.respuestas.forEach((item) => {
      console.log(item)
      const preguntaId = item.pregunta_id;
      const valorRespuesta = item.valorRespuesta;
      const colaborador_id = item.colaborador_id;
      const evaluacion_id = item.evaluacion_id;
      if (preguntaId !== undefined && valorRespuesta !== undefined) {
        let objeto = {
          preguntaId: preguntaId,
          valorRespuesta: valorRespuesta,
          colaborador_id: colaborador_id,
          evaluacion_id: evaluacion_id
        }
        datos.push(objeto)
      }
    });
    console.log(datos);
    // Creamos un objeto para almacenar los últimos objetos para cada preguntaId
    const lastObjectsByPreguntaId: { [key: number]: any } = {};
    // Recorremos el array y almacenamos los últimos objetos para cada preguntaId
    datos.forEach((item:any) => {
      const preguntaId = item.preguntaId;
      lastObjectsByPreguntaId[preguntaId] = item;
    });
    // Extraemos los últimos objetos de cada preguntaId en un nuevo array
    const lastObjectsArray = Object.values(lastObjectsByPreguntaId);
    console.log(lastObjectsArray);


    let success = false;
    for (let i = 0; i < lastObjectsArray.length; i++) {

      console.log(lastObjectsArray[i]);
      const result = await this.evaluacionService.saveResultadosPreguntasAbiertas(lastObjectsArray[i]).toPromise()
      console.log(result.success)
      success = result.success;
    }
    if(success == true) {
      Swal.fire({ 
        title: '¡FELICIDADES!',
        text: "¡¡Haz realizado la evaluación con éxito!!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['dashboard']);
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
      });
    }

  }

  
  
 
}

