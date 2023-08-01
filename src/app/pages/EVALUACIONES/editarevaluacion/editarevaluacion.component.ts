import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarevaluacion',
  templateUrl: './editarevaluacion.component.html',
  styleUrls: ['./editarevaluacion.component.css']
})
export class EditarevaluacionComponent implements OnInit {

  ocultarBoton: any = false;
  ocultarBotonEdit: any = false;
  ocultarCard: any = true;
  preguntasRespuestas: any[] = [];
  contador = 1;
  cardCounter = 0;
  listaTipoPregunta: any;
  ngSelect: any;
  VF: any = false;

  constructor(private toastr: ToastrService,
    private evaluacionesService: EvaluacionesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.ocultarBoton = false;
    this.ocultarBotonEdit = true;
    
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ocultarCard = false;
      console.log(id);
      //console.log(nombre);

      const titulo = document.getElementById('title');
      //titulo!.innerHTML = 'Editar Preguntas';

      window.addEventListener('DOMContentLoaded', () => {
        const btnEdit = document.getElementById('btnEditarPreguntas') as HTMLButtonElement;
        btnEdit.hidden = false;
      });

      this.activeRoute.params.subscribe(e => {
        let id = e['id'];
        console.log(id);
        if (id) { 

          this.evaluacionesService.getObtenerPreguntasRespuestas(id).subscribe((response) => {
            console.log(response)
            const cardContainer = document.getElementById('card-container') as HTMLInputElement;

            // Crear un conjunto para almacenar los valoresPregunta únicos
            const valorPreguntasProcesadas = new Set<string>();
  
            // Iterar sobre los datos de respuesta 
            for (let index = 0; index < response.dataDB.length; index++) {
              const pregunta = response.dataDB[index];
              console.log(response.dataDB[index].tipoPregunta_id)
              if (response.dataDB[index].tipoPregunta_id == '1' || response.dataDB[index].tipoPregunta_id == '2') {

                // Verificar si el valorPregunta ya se ha procesado
                if (!valorPreguntasProcesadas.has(pregunta.valorPregunta)) {
                  valorPreguntasProcesadas.add(pregunta.valorPregunta);

                  // Crear la card y configurar su contenido
                  const card = document.createElement('div');
                  card.classList.add('card', 'm-4');
                  const cardBody = document.createElement('div');
                  cardBody.classList.add('card-body');
                  const cardText = document.createElement('h5');
                  cardText.classList.add('card-title');
                  cardText.textContent = pregunta.valorPregunta;
                  cardBody.appendChild(cardText);
                  const closeButton = document.createElement('button');
                  closeButton.setAttribute('type', 'button');
                  closeButton.classList.add('btn-close');
                  closeButton.addEventListener('click', () => {
                    cardContainer.removeChild(card);
                    if (cardContainer.childElementCount === 0) {
                      this.ocultarBotonEdit = false;
                    }
                  });

                  // Filtrar las respuestas correspondientes al valorPregunta actual
                  const respuestas = response.dataDB.filter((respuesta: any) => respuesta.valorPregunta === pregunta.valorPregunta);

                  // Crear elementos para cada respuesta y agregarlos a la card
                  respuestas.forEach((respuesta: any) => {
                    const radioGroupName = 'group-' + this.cardCounter;
                    const radioDiv = document.createElement('div');
                    const option1 = document.createElement('input');
                    option1.type = 'radio';
                    option1.name = radioGroupName;
                    option1.value = this.cardCounter.toString();
                    option1.id = this.cardCounter.toString();
                    option1.classList.add('ms-2');
                    const label1 = document.createElement('label');
                    label1.htmlFor = 'option1';
                    label1.textContent = respuesta.valorRespuesta;
                    label1.classList.add('ms-1');
                    radioDiv.appendChild(option1);
                    radioDiv.appendChild(label1);
                    cardBody.appendChild(radioDiv);

                    // Disable the checkbox
                    option1.disabled = true;
                  });

                  // Add event listener to the card element
                  card.addEventListener('click', () => {
                    //console.log(`id: ${pregunta.id}, valorPregunta: ${pregunta.valorPregunta}, id: ${pregunta.respuesta_id}, valorPregunta: ${pregunta.valorRespuesta}`);
                    let preguntaInput = document.getElementById("pregunta") as HTMLInputElement;
                    let idInput = document.getElementById("id") as HTMLInputElement;
                    idInput.value = pregunta.id;
                    preguntaInput.value = pregunta.valorPregunta;
                  });

                  // Agregar los elementos creados a la card y la card al contenedor
                  card.appendChild(closeButton);
                  card.appendChild(cardBody);
                  cardContainer.appendChild(card);

                  this.VF = false;
                  this.ngSelect = 0;
                  const input = document.getElementById('pregunta') as HTMLInputElement;
                  //input.value = '';
                }

              } else if (response.dataDB[index].tipoPregunta_id == '3') {
                console.log(response.dataDB[index].tipoPregunta_id)
                // Verificar si el valorPregunta ya se ha procesado
                if (!valorPreguntasProcesadas.has(pregunta.valorPregunta)) {
                  valorPreguntasProcesadas.add(pregunta.valorPregunta);

                  // Crear la card y configurar su contenido
                  const card = document.createElement('div');
                  card.classList.add('card', 'm-4');
                  const cardBody = document.createElement('div');
                  cardBody.classList.add('card-body');
                  const cardText = document.createElement('h5');
                  cardText.classList.add('card-title');
                  cardText.textContent = pregunta.valorPregunta;
                  cardBody.appendChild(cardText);
                  const closeButton = document.createElement('button');
                  closeButton.setAttribute('type', 'button');
                  closeButton.classList.add('btn-close');
                  closeButton.addEventListener('click', () => {
                    this.deshabilitar(pregunta);
                    //cardContainer.removeChild(card);
                    if (cardContainer.childElementCount === 0) {
                      this.ocultarBotonEdit = false;
                    }
                  });

                  // Filtrar las respuestas correspondientes al valorPregunta actual
                  const respuestas = response.dataDB.filter((respuesta: any) => respuesta.valorPregunta === pregunta.valorPregunta);
                  console.log(respuestas)
                  // Crear elementos para cada respuesta y agregarlos a la card
                  respuestas.forEach((respuesta: any) => {
                    const checkboxDiv = document.createElement('div');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'checkbox-' + this.cardCounter;
                    checkbox.value = respuesta.valorRespuesta;
                    checkbox.id = 'checkbox-' + this.cardCounter;
                    checkbox.classList.add('ms-2');
                    const label = document.createElement('label');
                    label.htmlFor = 'checkbox-' + this.cardCounter;
                    label.textContent = respuesta.valorRespuesta;
                    label.classList.add('ms-1');
                    checkboxDiv.appendChild(checkbox);
                    checkboxDiv.appendChild(label);
                    cardBody.appendChild(checkboxDiv);

                    // Disable the checkbox
                    checkbox.disabled = true;
                  });

                   // Add event listener to the card element
                   card.addEventListener('click', () => {
                    console.log(`id: ${pregunta.id}, valorPregunta: ${pregunta.valorPregunta}, id: ${pregunta.respuesta_id}, valorRespuesta: ${pregunta.valorRespuesta}`);

                    let preguntaInput = document.getElementById("pregunta") as HTMLInputElement;
                    let idInput = document.getElementById("id") as HTMLInputElement;
                    idInput.value = pregunta.id;
                    preguntaInput.value = pregunta.valorPregunta;
                  });

                  // Agregar los elementos creados a la card y la card al contenedor
                  card.appendChild(closeButton);
                  card.appendChild(cardBody);
                  cardContainer.appendChild(card);

                  this.VF = false;
                  this.ngSelect = 0;
                  const input = document.getElementById('pregunta') as HTMLInputElement;
                  //input.value = '';

                }
              }
            }
          });
        }
      });
    }
    else {
      const btnEdit = document.getElementById('btnEditarPreguntas');
      //btnEdit!.hidden = true;
    }
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
    
    console.log(item)

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
