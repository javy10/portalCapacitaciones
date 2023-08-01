import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-preguntasabiertas',
  templateUrl: './preguntasabiertas.component.html',
  styleUrls: ['./preguntasabiertas.component.css']
})
export class PreguntasabiertasComponent implements OnInit {


  formPregunta!: FormGroup;
  preguntasRespuestas: any[] = [];
  cardCounter = 0;
  ocultarBoton: any = false;
  ocultarBotonEdit: any = false;

  constructor(
    public fb: FormBuilder,
    private toastr: ToastrService,
    private evaluacionesService: EvaluacionesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formPregunta = this.fb.group({
      'pregunta': ['', Validators.required],
    })
  }

  get pregunta() {
    return this.formPregunta.get('pregunta') as FormControl;
  }

  ngOnInit(): void {
    
  }

  obtenerValoresInputs() {

    if(this.formPregunta.value.pregunta) {

      const informacion: any[] = [];
      const id = this.activeRoute.snapshot.paramMap.get('id');
      let PyR = {}

      informacion.push({
        respuesta: null,
        seleccionado: null
      });
  
      PyR = {
        'evaluacion_id': id,
        'tipoPregunta_id': 4,
        'pregunta': this.formPregunta.value.pregunta,
        'respuestas': informacion
      }
  
      this.preguntasRespuestas.push(PyR);
      console.log(this.preguntasRespuestas);
      this.crearCard(PyR);

      const inputElement = document.getElementById('preguntaAbierta') as HTMLInputElement;
      inputElement.value = '';

    } else {
      this.toastr.warning('Debes digitar una pregunta primero', 'Warning!');
    }

  }

  crearCard(datos: any) {
    console.log(datos)
    
    if (datos.length !== 0) {
      this.cardCounter++;
      this.ocultarBoton = true;
      const cardContainer = document.getElementById('card-container-PA') as HTMLInputElement;
  
      // Crear un elemento div para la card
      const card = document.createElement('div');
      card.classList.add('card', 'm-4');
  
      // Crear un elemento div para el cuerpo de la card
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      // Crear el botón de cerrar
      const closeButton = document.createElement('button');
      closeButton.setAttribute('type', 'button');
      closeButton.classList.add('btn-close', 'float-end', 'mt-2', 'me-2');
  
      // Agregar el evento de clic al botón de cerrar
      closeButton.addEventListener('click', () => {
        cardContainer.removeChild(card);
        // Verificar si ya no quedan cards
        if (cardContainer.childElementCount === 0) {
          // No quedan cards, realizar alguna acción aquí
          this.ocultarBoton = false;
        }
      });
  
      // Agregar el botón de cerrar al cuerpo de la card
      cardBody.appendChild(closeButton);
  
      const cardText = document.createElement('h5');
      cardText.classList.add('card-title');
      cardText.textContent = this.formPregunta.value.pregunta;
      cardBody.appendChild(cardText);
  
      // Agregar el cuerpo de la card a la card
      card.appendChild(cardBody);
  
      // Agregar la card al contenedor de cards
      cardContainer.appendChild(card);
    }

  }

  async guardarPregunta() {

    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.preguntasRespuestas)
    const result = await this.evaluacionesService.savePreguntasAbiertas(this.preguntasRespuestas).toPromise()
    console.log(result.success)

    if(result.success == true){
      this.toastr.success('Preguntas guardadas correctamente!', 'Éxito!');
      this.preguntasRespuestas = [];

      const data = await this.evaluacionesService.getConteoPreguntas(parseInt(id!)).toPromise();
      console.log(data)
        //this.n_preguntas = data.conteo;
      const resp = await this.evaluacionesService.editarCantidadPreguntas(data.conteo).toPromise();
      console.log(resp)

      setTimeout(() => {
        this.router.navigate(['/dashboard/list-evaluaciones']);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 1000);
        
    }
  }

 

}
