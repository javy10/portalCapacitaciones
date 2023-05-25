import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {


  formPregunta!: FormGroup;
  ngSelect: any;
  VF:any = false;
  ocultarBoton:any = false;
  preguntasRespuestas: any[] = [];

  constructor(public fb:FormBuilder, private toastr: ToastrService) {
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
  }

  contador = 1;

agregarInput() {

  const combobox = document.getElementById('tipo') as HTMLSelectElement;
  const selectedValue = combobox.value;

  if(selectedValue == '1' || selectedValue == '2'){
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
    const nuevoRadioButton  = document.createElement('input') as HTMLInputElement;
  
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
    nuevoInputGroupTextDiv.appendChild(nuevoRadioButton );
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
    
  } else if(selectedValue == '3') {
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
    const nuevoRadioButton  = document.createElement('input') as HTMLInputElement;
  
    nuevoRadioButton.type = 'checkbox';
    nuevoRadioButton.className = 'form-check-input mt-0';
    nuevoRadioButton.addEventListener('click', this.desactivarOtrosRadios);
  
    // Crea un elemento de icono de basura
    const iconoBasura = document.createElement('span');
    iconoBasura.classList.add('icono-basura');
    iconoBasura.innerHTML = '&times;';
  
    // Agrega el input y el checkbox a los elementos correspondientes
    nuevoDiv.appendChild(nuevoInput);
    nuevoInputGroupTextDiv.appendChild(nuevoRadioButton );
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

desactivarOtrosRadios(event:any) {
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
  //console.log(inputs[0].value)

  let PyR = {}

  const combobox = document.getElementById('tipo') as HTMLSelectElement;
  const selectedValue = combobox.value;

  if(selectedValue == '1' || selectedValue == '2') {
    inputs.forEach((input, index) => {
      informacion.push({
        respuesta: input.value,
        radioSeleccionado: radios[index].checked
      });
    });

    PyR = {
      'tipoPregunta': selectedValue,
      'pregunta': this.formPregunta.value.pregunta,
      'respuestas': informacion
    }

    this.preguntasRespuestas.push(PyR);

    this.crearCard(informacion);

  } else if(selectedValue == '3') {
    inputs.forEach((input, index) => {
      informacion.push({
        respuesta: input.value,
        checkSeleccionado: check[index].checked
      });
    });

    PyR = {
      'tipoPregunta': selectedValue,
      'pregunta': this.formPregunta.value.pregunta,
      'respuestas': informacion
    }

    this.preguntasRespuestas.push(PyR);

    this.crearCard(informacion);
  }
  console.log(this.preguntasRespuestas)

}

cardCounter = 0;
crearCard(datos:any) {

  if(datos.length !== 0){
    this.ocultarBoton = true;
    this.cardCounter++;
    
    console.log(datos)
    console.log(datos.length)

    const combobox = document.getElementById('tipo') as HTMLSelectElement;
    const selectedValue = combobox.value;
    console.log(selectedValue)

    const cardContainer = document.getElementById('card-container') as HTMLInputElement;

    if(selectedValue == '1' || selectedValue == '2') {

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

    } else if(selectedValue == '3') {
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

  if(selectedValue == '1'){
    this.VF = true;
  } else {
    this.VF = false;
  }

}

guardarPregunta() {
  this.toastr.success('Hello world!', 'Toastr fun!');
  this.toastr.info('Hello world!', 'Toastr fun!');
  this.toastr.warning('Hello world!', 'Toastr fun!');
  this.toastr.error('Hello world!', 'Toastr fun!');

}





}
