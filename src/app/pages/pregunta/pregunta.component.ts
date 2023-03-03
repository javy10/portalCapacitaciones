import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styles: [
  ]
})
export class PreguntaComponent {
  constructor(public fb:FormBuilder) {}

  formPregunta = this.fb.group({
    'pregunta': ['', Validators.required],
    'respuesta': ['', Validators.required],
  })

  get pregunta() {
    return this.formPregunta.get('pregunta') as FormControl;
  }
  get respuesta() {
    return this.formPregunta.get('respuesta') as FormControl;
  }
}
