import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

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

  constructor(private evaluacionService: EvaluacionesService, private toastr: ToastrService,) {

  }

  

  ngOnInit(): void {
    this.loadPreguntas();
  }

  loadPreguntas() {

    this.evaluacionService.obtenerPreguntas(this.colaborador_id).subscribe((data: any) => {
      console.log(data.dataDB)

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
      console.log(this.evaluacion_id);



    });
  }

  guardarRespuestas() {
    this.isLoading = true;
    let includedCount: number = 0;
    let notIncludedCount: number = 0;
    let formData = new FormData();
    const containerElement = this.container.nativeElement;
    const cardElements = containerElement.querySelectorAll('.card');

    cardElements.forEach((cardElement: HTMLElement, index: number) => {
      const preguntaId = this.listadoPreguntas[index].pregunta_id;
      const tipoPregunta_id = this.listadoPreguntas[index].tipoPregunta_id;
      const radioInputs = cardElement.querySelectorAll('input[type="radio"]:checked');
      const radioRespuestasSeleccionadas = Array.from(radioInputs).map((input: Element) => (input as HTMLInputElement).value);
      const checkboxInputs = cardElement.querySelectorAll('input[type="checkbox"]:checked');
      const checkboxRespuestasSeleccionadas = Array.from(checkboxInputs).map((input: Element) => (input as HTMLInputElement).value);

      console.log(this.listadoPreguntas[index].respuesta_id)
      console.log(tipoPregunta_id)

      if (tipoPregunta_id === 1 || tipoPregunta_id === 2) {
        this.datos = {
          'pregunta': preguntaId,
          'tipoPregunta_id': tipoPregunta_id,
          'respuestaSeleccionadaR': radioRespuestasSeleccionadas,
        }
        this.evaluacionService.obtenerRespuestas(preguntaId).subscribe((res: any) => {
          //console.log(res.dataDB)
          for(let data of res.dataDB) {
            console.log(data.respuesta_id)
            this.respuestasRadios.push(data.respuesta_id);
          }
          //console.log( this.respuestasRadios);
           //obtener longuitud de radios seleccionados
          const arregloInicialLength: string[][] = [radioRespuestasSeleccionadas];
          const arregloFiltrado: string[][] = arregloInicialLength.filter(elemento => elemento.length > 0);
          const longitudArreglo: number = arregloFiltrado.length;
          const arregloInicial: string[][] = [radioRespuestasSeleccionadas];
          const arregloFinal: number[] = arregloInicial.flat().map(elemento => Number(elemento));
          this.radios = arregloFinal;

          const arregloInicialString: number[] = this.radios;
          const cadenaFinal: string = arregloInicial.join(', ');
          //console.log(arregloInicialString);
          const arr1: number[] = this.respuestasRadios; //[7, 36, 40];
          const arr2: number[] = arregloInicialString; //[7, 37, 38];

          arr1.forEach((element) => {
            if (arr2.includes(element)) {
              includedCount++;
            } else {
              notIncludedCount++;
            }
          });
          console.log(`Elementos incluidos: ${includedCount}`);
          console.log(`Elementos no incluidos: ${notIncludedCount}`);
        });


      } else {
        this.datosCheckbox = {
          'pregunta': preguntaId,
          'tipoPregunta_id': tipoPregunta_id,
          'respuestaSeleccionadaC': checkboxRespuestasSeleccionadas,
        }
        ///******************************************************************* CHECKBOX ************************************************************************** */
        //console.log(checkboxRespuestasSeleccionadas)
        formData.append('pregunta_id', preguntaId);
        this.evaluacionService.getObtenerRespuestaCorrecta(formData).subscribe((response: any) => {
          //console.log(response.dataDB)
          const arregloObjetos = response.dataDB; //[ { id: 41 }, { id: 43 } ];
          const arregloIds = checkboxRespuestasSeleccionadas; //[ '41', '43' ];
          const incluidos = arregloIds.filter((id) => {
            return arregloObjetos.some((objeto: any) => {
              return objeto.id === parseInt(id);
            });
          });
          const cantidadIncluidos = incluidos.length;
          const cantidadNoIncluidos = arregloIds.length - cantidadIncluidos;
          console.log(`Cantidad incluidos: ${cantidadIncluidos}`);
          console.log(`Cantidad no incluidos: ${cantidadNoIncluidos}`);
          notIncludedCount = notIncludedCount + cantidadNoIncluidos;
          console.log(notIncludedCount)

          const totalPreguntas = this.resultado.length;
          const notaMinima = 0;
          const notaMaxima = 10;
          // Calcular el valor de cada pregunta
          const valorPregunta = (notaMaxima - notaMinima) / totalPreguntas;
          console.log('Valor de cada pregunta:', valorPregunta);
          const puntajeCompleto = valorPregunta; // Puntaje completo de la pregunta
          const opcionesCorrectas = response.dataDB.length; // Número total de opciones correctas
          const opcionesSeleccionadas = cantidadIncluidos; // Número de opciones seleccionadas correctamente
          const puntajeOpcionesBuenas = (puntajeCompleto / opcionesCorrectas) * opcionesSeleccionadas;
          console.log('Puntaje de las opciones buenas:', puntajeOpcionesBuenas);
          let result = (puntajeOpcionesBuenas / valorPregunta);
          console.log(result)
          console.log(includedCount)
          includedCount = includedCount + result;
          console.log(includedCount)
        }); 
        ///******************************************************************* CHECKBOX ************************************************************************** */
      }
      this.resultado.push(this.datos);
      this.resultadoCheck.push(this.datosCheckbox);
      // this.seleccionadas.push(radioRespuestasSeleccionadas);
    });
    
    this.evaluacionService.getEvaluacionId(this.evaluacion_id).subscribe((response: any) => {
      console.log(response.dataDB)
      // console.log(includedCount)
      // console.log(notIncludedCount)

      ///***********************OBTENER DATOS PARA GUARDAR EN LA DB ***************************************/
      console.log(this.resultado)
      console.log(this.resultadoCheck)

      //const newArray = this.resultado.concat(this.resultadoCheck);
      const newArray = this.resultado.concat(this.resultadoCheck).filter((item) => item !== undefined);
      console.log(newArray)

      const nuevoObjeto = newArray.reduce((obj, item) => {
        if (!obj[item.pregunta]) {
          obj[item.pregunta] = {
            pregunta: item.pregunta,
            respuestaSeleccionada: item.respuestaSeleccionadaR || item.respuestaSeleccionadaC,
          };
        } else {
          if (item.respuestaSeleccionadaR !== undefined) {
            obj[item.pregunta].respuestaSeleccionada = item.respuestaSeleccionadaR;
          }
          if (item.respuestaSeleccionadaC !== undefined) {
            obj[item.pregunta].respuestaSeleccionada = item.respuestaSeleccionadaC;
          }
        }
        return obj;
      }, {});
      
      
      const totalPreguntas = this.resultado.length;
      const respuestasCorrectas = includedCount;
      const notaMinima = 0;
      const notaMaxima = 10;
      // Calcula la nota
      const nota = (respuestasCorrectas / totalPreguntas) * (notaMaxima - notaMinima) + notaMinima;
      console.log('Nota:', nota);

      const nuevoArray = Object.values(nuevoObjeto);
      const data = {
        'colaborador_id': this.colaborador_id,
        'evaluacion_id': this.evaluacion_id,
        'resultado': nota
      }
      const nuevoArreglo = [data, ...nuevoArray];
      console.log(nuevoArreglo);
  

      // for (let index = 0; index < nuevoArreglo.length; index++) {
      //   this.evaluacionService.saveResultadopreguntas(nuevoArreglo[index]).subscribe((resp: any) => {
          
      //   });
      // }
       
      ///***********************OBTENER DATOS PARA GUARDAR EN LA DB ***************************************/
      
      if(nota >= response.dataDB.calificacionMinima){
        this.isLoading = false;
        setTimeout(() => {
          this.toastr.success('Tu nota es: '+ nota , 'APROBADO!', {
            timeOut: 0,
          });
          const boton = document.getElementById('btnGuardarQuiz') as HTMLButtonElement;
          const formulario = document.getElementById('myForm') as HTMLFormElement;
          const inputs = formulario.querySelectorAll('input');
          boton.disabled = true;
          inputs.forEach(input => {
            input.disabled = true;
          });
        }, 1000);
      } else {
        
        this.intento--;
        if(this.intento == 0) {
          this.isLoading = false;
          setTimeout(() => {
          this.toastr.error(`Lo siento... Haz reprobado éste examen!!!`, 'REPROBADO!', {
            timeOut: 0,
          });
          const boton = document.getElementById('btnGuardarQuiz') as HTMLButtonElement;
          const formulario = document.getElementById('myForm') as HTMLFormElement;
          const inputs = formulario.querySelectorAll('input');
          boton.disabled = true;
          inputs.forEach(input => {
            input.disabled = true;
          });
        }, 1000);
        } else {
          this.evaluacionService.editarIntentosEvaluacion(data).subscribe((res: any) => {
            this.isLoading = false;
            setTimeout(() => {
              this.toastr.error(`Tu nota es: ${nota}\nTe queda ${res.dataDB} intento más.`, 'REPROBADO!', {
                timeOut: 0,
              });
            }, 1000);

          });
        }

      }
     
      includedCount = 0;
      notIncludedCount = 0;
      this.resultado = [];
    });

  }


}

