import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

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
  tituloEvaluacion:any;
  testAbierto:any;
  resultados: any[] = [];

  apertura:any;
  cierre:any;

  constructor(
    private evaluacionService: EvaluacionesService, 
    private toastr: ToastrService, 
    private router: Router, 
    private location: Location, 
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadPreguntas();
    
  }

  loadPreguntas() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    console.log(this.colaborador_id)
    const formData = new FormData();
    formData.append('colaborador_id', this.colaborador_id),
    formData.append('evaluacion_id', id!)
 
    this.evaluacionService.obtenerPreguntas(formData).subscribe((data: any) => {
      console.log(data.dataDB)

      this.apertura = data.dataDB[0].apertura;
      this.cierre = data.dataDB[0].cierre;

      console.log(this.apertura)
      console.log(this.cierre)

      const startDate = new Date(this.apertura);
      const endDate = new Date(this.cierre);
      const diff = endDate.getTime() - startDate.getTime();
      console.log(diff)

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
      console.log(this.evaluacion_id);


 
    });
  }

  data:any = {};
  guardarRespuestas() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })


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

       ///***********************OBTENER DATOS PARA GUARDAR EN LA DB ***************************************/
       console.log(nota)
     
       const nuevoArray = Object.values(nuevoObjeto);
       this.data = {
         'colaborador_id': this.colaborador_id,
         'evaluacion_id': this.evaluacion_id,
         'resultado': nota
       }
       console.log(this.data)
       if(nota >= response.dataDB.calificacionMinima){
         this.isLoading = false;
         //setTimeout(() => {
          console.log(this.data)
          let nuevoArreglo = [this.data, ...nuevoArray];
          console.log(nuevoArreglo);
          // Función para convertir elementos de tipo string a tipo number
          const convertirStringANumber = (elemento: string) => parseInt(elemento, 10);
          // Recorrer el arreglo y aplicar la función de conversión en cada elemento
          const arregloConvertido = nuevoArreglo.map((objeto:any) => {
            if (objeto.respuestaSeleccionada && Array.isArray(objeto.respuestaSeleccionada)) {
              return {
                ...objeto,
                respuestaSeleccionada: objeto.respuestaSeleccionada.map(convertirStringANumber)
              };
            }
            return objeto;
          });
          console.log(arregloConvertido);
          // Obtiene el primer objeto del arreglo
          const primerObjeto = arregloConvertido[0];
          // Elimina el primer objeto del arreglo original
          arregloConvertido.shift();
          // Agrega los objetos como subarreglos dentro del primer objeto
          primerObjeto['subArreglos'] = arregloConvertido;
          // Ahora el arreglo principal contiene solo el primer objeto con los subarreglos
          console.log(primerObjeto);
          console.log(arregloConvertido.length)
          this.evaluacionService.saveResultadopreguntas(primerObjeto).subscribe((resp: any) => {
            console.log(resp)
            if(resp.success == true) {
              Swal.fire({
                title: 'ÉXITO',
                text: "¡¡FELICIDADES HAZ APROBADO!!",
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
    
              const boton = document.getElementById('btnGuardarQuiz') as HTMLButtonElement;
              const formulario = document.getElementById('myForm') as HTMLFormElement;
              const inputs = formulario.querySelectorAll('input');
              boton.disabled = true;
              inputs.forEach(input => {
                input.disabled = true;
              });
            }
          });

         //}, 1000);
       } else {
         
         this.intento--;
         // if(this.intento == 0) {
         //   this.isLoading = false;
         //   setTimeout(() => {
         //   this.toastr.error(`Lo sentimos... Haz reprobado éste examen!!!`, 'REPROBADO!', {
         //     timeOut: 0,
         //   });
         //   const boton = document.getElementById('btnGuardarQuiz') as HTMLButtonElement;
         //   const formulario = document.getElementById('myForm') as HTMLFormElement;
         //   const inputs = formulario.querySelectorAll('input');
         //   boton.disabled = true;
         //   inputs.forEach(input => {
         //     input.disabled = true;
         //   });
         // }, 1000);
         // } else {
        
         console.log(this.data)
         this.evaluacionService.editarIntentosEvaluacion(this.data).subscribe((res: any) => {
           this.intento = res.dataDB.intentos;
           console.log(this.intento)
           if(this.intento == 0) {
             this.isLoading = false;
 
               Swal.fire({
                 title: 'REPROBADO',
                 text: "Lo sentimos... Haz reprobado éste examen!!!",
                 icon: 'error',
                 showCancelButton: false,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'OK'
               }).then((result) => {
                 if (result.isConfirmed) {
                   this.router.navigate(['dashboard']);
                   setTimeout(() => {
                     window.location.reload();
                   }, 500);
                 }
               });
 
           } else {
             this.isLoading = false;
 
               Swal.fire({
                 //position: 'center',
                 icon: 'warning',
                 title: 'REPROBADO!',
                 showClass: {
                   popup: 'animate__animated animate__fadeInDown'
                 },
                 hideClass: {
                   popup: 'animate__animated animate__fadeOutUp'
                 },
                 showConfirmButton: true,
                 timer: 1500,
                 didOpen: () => {
                   Swal.showLoading()
                 },
                 willClose: () => {
       
                   swalWithBootstrapButtons.fire({
                     title: `Te queda ${res.dataDB.intentos} intento más.`,
                     text: "",
                     icon: 'info',
                     showCancelButton: false,
                     confirmButtonText: 'Ok',
                     //cancelButtonText: 'No, ya no!',
                     reverseButtons: true
                   }).then((result) => {
                     if (result.isConfirmed) {
                       
                       this.router.navigate(['dashboard']);
                       setTimeout(() => {
                         window.location.reload();
                       }, 1000);
                     }
                   })
                 }
               });
             //}, 1000);
             
           }
         });
         //}
       }
      includedCount = 0;
      notIncludedCount = 0;
      this.resultado = [];
      this.data = {};
    });

  }


}

