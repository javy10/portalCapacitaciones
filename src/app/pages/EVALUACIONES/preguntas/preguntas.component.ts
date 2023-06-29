import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {


  formPregunta!: FormGroup;
  ngSelect: any;
  VF: any = false;
  ocultarBoton: any = false;
  ocultarBotonEdit: any = false;
  ocultarCard: any = true;
  preguntasRespuestas: any[] = [];
  contador = 1;
  cardCounter = 0;
  listaTipoPregunta: any;

  constructor(
    public fb: FormBuilder,
    private toastr: ToastrService,
    private evaluacionesService: EvaluacionesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formPregunta = this.fb.group({
      'pregunta': ['', Validators.required],
      'tipo': ['', Validators.required],
    })
  }

  get pregunta() {
    return this.formPregunta.get('pregunta') as FormControl;
  }
  get tipo() {
    return this.formPregunta.get('tipo') as FormControl;
  }

  ngOnInit(): void {
    this.ngSelect = 0;
    this.loadTipoPregunta();

    this.cargar();


  }

  loadTipoPregunta() {
    this.evaluacionesService.getTipoPregunta().subscribe((data: any) => {
      this.listaTipoPregunta = data.dataDB;
      console.log(data)
    });

  }

  agregarInput() {

    const combobox = document.getElementById('tipo') as HTMLSelectElement;
    const selectedValue = combobox.value;

    if (selectedValue == '1' || selectedValue == '2') {
      this.contador++;

      // Crea un nuevo elemento div para contener el input-group
      const nuevoDiv = document.createElement('div');
      nuevoDiv.className = 'input-group mb-3';

      // Crea un nuevo input
      const nuevoInput = document.createElement('input');
      nuevoInput.type = 'text';
      nuevoInput.id = 'pregunta' + this.contador;
      nuevoInput.className = 'form-control';
      nuevoInput.placeholder = 'Ingresa la respuesta';
      nuevoInput.required = true;

      // Crea un nuevo div para el input-group-text
      const nuevoInputGroupTextDiv = document.createElement('div');
      nuevoInputGroupTextDiv.className = 'input-group-text';

      // Crea un nuevo checkbox
      const nuevoRadioButton = document.createElement('input') as HTMLInputElement;

      nuevoRadioButton.type = 'radio';
      nuevoRadioButton.className = 'form-check-input mt-0';
      nuevoRadioButton.name = 'radioGroup';
      nuevoRadioButton.addEventListener('click', this.desactivarOtrosRadios);

      // Crea un elemento de icono de basura
      const iconoBasura = document.createElement('span');
      iconoBasura.classList.add('icono-basura');
      iconoBasura.innerHTML = '&times;';

      // Agrega el input y el checkbox a los elementos correspondientes
      nuevoDiv.appendChild(nuevoInput);
      nuevoInputGroupTextDiv.appendChild(nuevoRadioButton);
      nuevoDiv.appendChild(nuevoInputGroupTextDiv);

      // Agrega un evento de clic al icono de basura para eliminar el input
      iconoBasura.addEventListener('click', () => {
        nuevoInput.remove();
        nuevoInputGroupTextDiv.remove();
        nuevoDiv.remove();
        iconoBasura.classList.add('oculto');
        iconoBasura.style.display = 'none';
        nuevoRadioButton.classList.add('oculto');
        nuevoRadioButton.style.display = 'none';
        nuevoInputGroupTextDiv.classList.add('oculto');
        nuevoInputGroupTextDiv.style.display = 'none';
      });

      // Obtiene el contenedor principal
      const contenedorPrincipal = document.getElementById('inputContainer') as HTMLInputElement;

      // Agrega el nuevo input-group al contenedor principal
      contenedorPrincipal.appendChild(iconoBasura);
      contenedorPrincipal.appendChild(nuevoDiv);

      const btnCrearCard = document.getElementById('btnCrearCard') as HTMLInputElement;
      btnCrearCard.addEventListener('click', () => {
        nuevoInput.remove();
        nuevoInputGroupTextDiv.remove();
        nuevoDiv.remove();
        iconoBasura.classList.add('oculto');
        iconoBasura.style.display = 'none';
        nuevoRadioButton.classList.add('oculto');
        nuevoRadioButton.style.display = 'none';
        nuevoInputGroupTextDiv.classList.add('oculto');
        nuevoInputGroupTextDiv.style.display = 'none';
      });

    } else if (selectedValue == '3') {
      this.contador++;

      // Crea un nuevo elemento div para contener el input-group
      const nuevoDiv = document.createElement('div');
      nuevoDiv.className = 'input-group mb-3';

      // Crea un nuevo input
      const nuevoInput = document.createElement('input');
      nuevoInput.type = 'text';
      nuevoInput.id = 'pregunta' + this.contador;
      nuevoInput.className = 'form-control';
      nuevoInput.placeholder = 'Ingresa la respuesta';
      nuevoInput.required = true;

      // Crea un nuevo div para el input-group-text
      const nuevoInputGroupTextDiv = document.createElement('div');
      nuevoInputGroupTextDiv.className = 'input-group-text';

      // Crea un nuevo checkbox
      const nuevoRadioButton = document.createElement('input') as HTMLInputElement;

      nuevoRadioButton.type = 'checkbox';
      nuevoRadioButton.className = 'form-check-input mt-0';
      nuevoRadioButton.addEventListener('click', this.desactivarOtrosRadios);

      // Crea un elemento de icono de basura
      const iconoBasura = document.createElement('span');
      iconoBasura.classList.add('icono-basura');
      iconoBasura.innerHTML = '&times;';

      // Agrega el input y el checkbox a los elementos correspondientes
      nuevoDiv.appendChild(nuevoInput);
      nuevoInputGroupTextDiv.appendChild(nuevoRadioButton);
      nuevoDiv.appendChild(nuevoInputGroupTextDiv);

      // Agrega un evento de clic al icono de basura para eliminar el input
      iconoBasura.addEventListener('click', () => {
        nuevoInput.remove();
        nuevoInputGroupTextDiv.remove();
        nuevoDiv.remove();
        iconoBasura.classList.add('oculto');
        iconoBasura.style.display = 'none';
        nuevoRadioButton.classList.add('oculto');
        nuevoRadioButton.style.display = 'none';
        nuevoInputGroupTextDiv.classList.add('oculto');
        nuevoInputGroupTextDiv.style.display = 'none';
      });

      // Obtiene el contenedor principal
      const contenedorPrincipal = document.getElementById('inputContainer') as HTMLInputElement;

      // Agrega el nuevo input-group al contenedor principal
      contenedorPrincipal.appendChild(iconoBasura);
      contenedorPrincipal.appendChild(nuevoDiv);

      const btnCrearCard = document.getElementById('btnCrearCard') as HTMLInputElement;
      btnCrearCard.addEventListener('click', () => {
        nuevoInput.remove();
        nuevoInputGroupTextDiv.remove();
        nuevoDiv.remove();
        iconoBasura.classList.add('oculto');
        iconoBasura.style.display = 'none';
        nuevoRadioButton.classList.add('oculto');
        nuevoRadioButton.style.display = 'none';
        nuevoInputGroupTextDiv.classList.add('oculto');
        nuevoInputGroupTextDiv.style.display = 'none';
      });
    }



  }

  desactivarOtrosRadios(event: any) {
    const radioSeleccionado: HTMLInputElement = event.target;
    const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name=radioGroup]');

    radios.forEach(radio => {
      if (radio !== radioSeleccionado) {
        radio.checked = false;
      }
    });
  }

  obtenerValoresInputs() {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#inputContainer input[type=text]');
    const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name=radioGroup]');
    const check: NodeListOf<HTMLInputElement> = document.querySelectorAll('#inputContainer input[type=checkbox]');

    const informacion: any[] = [];
    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id)
    //console.log(inputs[0].value)

    let PyR = {}

    const combobox = document.getElementById('tipo') as HTMLSelectElement;
    const selectedValue = combobox.value;

    if (selectedValue == '1' || selectedValue == '2') {
      inputs.forEach((input, index) => {
        informacion.push({
          respuesta: input.value,
          seleccionado: radios[index].checked
        });
      });

      PyR = {
        'evaluacion_id': id,
        'tipoPregunta_id': selectedValue,
        'pregunta': this.formPregunta.value.pregunta,
        'respuestas': informacion
      }

      this.preguntasRespuestas.push(PyR);

      this.crearCard(informacion);

    } else if (selectedValue == '3') {
      inputs.forEach((input, index) => {
        informacion.push({
          respuesta: input.value,
          seleccionado: check[index].checked
        });
      });

      PyR = {
        'evaluacion_id': id,
        'tipoPregunta_id': selectedValue,
        'pregunta': this.formPregunta.value.pregunta,
        'respuestas': informacion
      }

      this.preguntasRespuestas.push(PyR);

      this.crearCard(informacion);
    } else {
      this.toastr.warning('Debes agregar una pregunta con su respuesta', 'Warning!');
    }
    console.log(this.preguntasRespuestas)

  }

  crearCard(datos: any) {

    if (datos.length !== 0) {

      const id = this.activeRoute.snapshot.paramMap.get('id');
      const nombre = this.activeRoute.snapshot.paramMap.get('idN');
      console.log(nombre)
  
      if (id && nombre) {
        this.ocultarBoton = false;
      } else {
        this.ocultarBoton = true;
      }


      this.cardCounter++;

      console.log(datos)
      console.log(datos.length)

      const combobox = document.getElementById('tipo') as HTMLSelectElement;
      const selectedValue = combobox.value;
      console.log(selectedValue)

      const cardContainer = document.getElementById('card-container') as HTMLInputElement;

      if (selectedValue == '1' || selectedValue == '2') {

        //console.log(datos[0].respuesta)  

        // Crear un elemento div para la card
        const card = document.createElement('div');
        card.classList.add('card', 'm-4');

        // Crear un elemento div para el cuerpo de la card
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardText = document.createElement('h5');
        cardText.classList.add('card-title');
        cardText.textContent = this.formPregunta.value.pregunta;
        cardBody.appendChild(cardText);

        // Crear el botón de cerrar
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('btn-close');

        // Agregar el evento de clic al botón de cerrar
        closeButton.addEventListener('click', () => {
          cardContainer.removeChild(card);
          // Verificar si ya no quedan cards
          if (cardContainer.childElementCount === 0) {
            // No quedan cards, realizar alguna acción aquí
            this.ocultarBoton = false;
          }
        });


        for (let index = 0; index < datos.length; index++) {
          //const element = datos;
          console.log(datos[index])

          // Crea el grupo de radio buttons con un nombre único
          const radioGroupName = 'group-' + this.cardCounter;

          // Crear un elemento div para los botones de opción
          const radioDiv = document.createElement('div');

          //Crear dos elementos de radio button
          const option1 = document.createElement('input');
          option1.type = 'radio';
          option1.name = radioGroupName;
          option1.value = this.cardCounter.toString();
          option1.id = this.cardCounter.toString();
          option1.classList.add('ms-2');

          //Crear dos elementos de label
          const label1 = document.createElement('label');
          label1.htmlFor = 'option1';
          label1.textContent = datos[index].respuesta;
          label1.classList.add('ms-1');

          // Añadir los botones de opción al elemento div
          radioDiv.appendChild(option1);
          radioDiv.appendChild(label1);

          // Agregar el elemento div con los botones de opción al cuerpo de la card
          cardBody.appendChild(radioDiv);

          // Agregar el botón de eliminar a la tarjeta
          card.appendChild(closeButton);

          // Agregar el cuerpo de la card al elemento de la card
          card.appendChild(cardBody);

          // Agregar la card al contenedor de la card
          cardContainer.appendChild(card);
          this.VF = false;
          this.ngSelect = 0;
          const input = document.getElementById('pregunta') as HTMLInputElement;
          input.value = '';

        }

      } else if (selectedValue == '3') {
        //this.cardCounter++;
        //console.log(datos[0].respuesta)  

        //const cardContainer = document.getElementById('card-container') as HTMLInputElement;

        // Crear un elemento div para la card
        const card = document.createElement('div');
        card.classList.add('card', 'm-4');

        // Crear un elemento div para el cuerpo de la card
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardText = document.createElement('h5');
        cardText.classList.add('card-title');
        cardText.textContent = this.formPregunta.value.pregunta;
        cardBody.appendChild(cardText);

        // Crear el botón de cerrar
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('btn-close');

        // Agregar el evento de clic al botón de cerrar
        closeButton.addEventListener('click', () => {
          cardContainer.removeChild(card);

          // Verificar si ya no quedan cards
          if (cardContainer.childElementCount === 0) {
            // No quedan cards, realizar alguna acción aquí
            this.ocultarBoton = false;
          }

        });


        for (let index = 0; index < datos.length; index++) {
          const element = datos[index];

          // Crea el grupo de radio buttons con un nombre único
          const radioGroupName = 'group-' + this.cardCounter;

          // Crear un elemento div para los botones de opción
          const radioDiv = document.createElement('div');

          //Crear dos elementos de radio button
          const option1 = document.createElement('input');
          option1.type = 'checkbox';
          option1.name = radioGroupName;
          option1.value = this.cardCounter.toString();
          option1.id = this.cardCounter.toString();
          option1.classList.add('ms-2');

          //Crear dos elementos de label
          const label1 = document.createElement('label');
          label1.htmlFor = 'option1';
          label1.textContent = datos[index].respuesta;
          label1.classList.add('ms-1');

          // Añadir los botones de opción al elemento div
          radioDiv.appendChild(option1);
          radioDiv.appendChild(label1);

          // Agregar el elemento div con los botones de opción al cuerpo de la card
          cardBody.appendChild(radioDiv);

          // Agregar el cuerpo de la card al elemento de la card
          card.appendChild(cardBody);

          // Agregar la card al contenedor de la card
          cardContainer.appendChild(card);
          this.VF = false;
          this.ngSelect = 0;
          const input = document.getElementById('pregunta') as HTMLInputElement;
          input.value = '';

        }
      }

      // const btnGuardarPreguntas = document.getElementById('btnGuardarPreguntas') as HTMLInputElement;
      // btnGuardarPreguntas.addEventListener('click', () => {

      // });
    }

  }

  seleccionTipo() {
    const combobox = document.getElementById('tipo') as HTMLSelectElement;

    const selectedValue = combobox.value;
    //console.log('Valor seleccionado:', selectedValue);

    if (selectedValue == '1') {
      this.VF = true;
    } else {
      this.VF = false;
    }

  }

  guardarPregunta() {
    /*
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.info('Hello world!', 'Toastr fun!');
    this.toastr.warning('Hello world!', 'Toastr fun!');
    this.toastr.error('Hello world!', 'Toastr fun!');
    */
    const id = this.activeRoute.snapshot.paramMap.get('id');

    for (let index = 0; index < this.preguntasRespuestas.length; index++) {
      this.evaluacionesService.savePreguntas(this.preguntasRespuestas[index]).subscribe((response) => { });
    }
    this.toastr.success('Preguntas guardadas correctamente!', 'Éxito!');
    this.preguntasRespuestas = [];

    this.evaluacionesService.getConteoPreguntas(parseInt(id!)).subscribe((data: any) => {
      console.log(data)
      //this.n_preguntas = data.conteo;
      this.evaluacionesService.editarCantidadPreguntas(data.conteo).subscribe((data: any) => {

      });
    });


    setTimeout(() => {
      this.router.navigate(['/dashboard/list-evaluaciones']);
    }, 1000);


  }

  cargar() {

    this.ocultarBoton = false;
    this.ocultarBotonEdit = true;
    
    const id = this.activeRoute.snapshot.paramMap.get('id');
    const nombre = this.activeRoute.snapshot.paramMap.get('idN');
    console.log(nombre)

    if (id && nombre) {
      this.ocultarCard = false;
      // this.isLoading = true;
      // this.guardando = false;
      console.log(id);
      console.log(nombre);

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
                    cardContainer.removeChild(card);
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

  editarPreguntas() {

  }




}
