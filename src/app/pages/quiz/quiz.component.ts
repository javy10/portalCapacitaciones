import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  listadoPreguntas: any[] = [];
  listadoRespuestas: any[] = [];
  colaborador_id:any = localStorage.getItem('id');
  @ViewChild('container') container!: ElementRef;
  datos:any;

  constructor(private evaluacionService: EvaluacionesService, ) {

  }

  ngOnInit(): void {
    this.loadPreguntas();
  }

  loadPreguntas() {
    
    this.evaluacionService.obtenerPreguntas(this.colaborador_id).subscribe((data: any) => {
      console.log(data.dataDB)

      const preguntasUnicas = data.dataDB.reduce((acc:any, pregunta:any) => {
        const preguntaExistente = acc.find((p:any) => p.valorPregunta === pregunta.valorPregunta);
        if (preguntaExistente) {
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

    });
  }


  
  guardarRespuestas() {

    const containerElement = this.container.nativeElement;
    const cardElements = containerElement.querySelectorAll('.card');
  
    cardElements.forEach((cardElement: HTMLElement, index: number) => {
      const preguntaId = this.listadoPreguntas[index].pregunta_id;
      const tipoPregunta_id = this.listadoPreguntas[index].tipoPregunta_id;
  
      const radioInputs = cardElement.querySelectorAll('input[type="radio"]:checked');
      const radioRespuestasSeleccionadas = Array.from(radioInputs).map((input: Element) => (input as HTMLInputElement).value);
  
      const checkboxInputs = cardElement.querySelectorAll('input[type="checkbox"]:checked');
      const checkboxRespuestasSeleccionadas = Array.from(checkboxInputs).map((input: Element) => (input as HTMLInputElement).value);

      this.datos = {
        'pregunta': preguntaId,
        'tipoPregunta_id': tipoPregunta_id,
        'respuestaSeleccionadaR': radioRespuestasSeleccionadas,
        'respuestaSeleccionadaC': checkboxRespuestasSeleccionadas
      }
      console.log(this.datos)
    });

  }

}

