import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styles: [
  ]
})
export class EvaluationComponent {
  
  constructor(public fb:FormBuilder) {}

  formEvaluation = this.fb.group({
    'titulo': ['', Validators.required],
    'descripcion': ['', Validators.required],
    'calificacion': ['', Validators.required],
    'intentos': ['', Validators.required],
    'minutos': ['', Validators.required],
    'rdbSi': ['', Validators.required],
    'rdbNo': ['', Validators.required],
  })

  get titulo() {
    return this.formEvaluation.get('titulo') as FormControl;
  }
  get descripcion() {
    return this.formEvaluation.get('descripcion') as FormControl;
  }
  get calificacion() {
    return this.formEvaluation.get('calificacion') as FormControl;
  }
  get intentos() {
    return this.formEvaluation.get('intentos') as FormControl;
  }
  get minutos() {
    return this.formEvaluation.get('minutos') as FormControl;
  }
  get rdbSi() {
    return this.formEvaluation.get('rdbSi') as FormControl;
  }
  get rdbNo() {
    return this.formEvaluation.get('rdbNo') as FormControl;
  }
}
