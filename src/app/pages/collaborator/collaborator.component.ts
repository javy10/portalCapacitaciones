import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ColaboradorService } from 'src/app/services/colaborador.service';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styles: [
  ]
})
export class CollaboratorComponent implements OnInit {

  constructor(public fb:FormBuilder, private colaboradorService:ColaboradorService) {}

  listaAgencia:any=[];
  listaDepartamento:any=[];

  formUser = this.fb.group({
    'dui': ['', Validators.required],
    'nombres': ['', Validators.required],
    'apellidos': ['', Validators.required],
    'agencia': ['', Validators.required],
    'departamento': ['', Validators.required],
    'cargo': ['', Validators.required],
    'telefono': ['', Validators.required],
    'email': ['', [
      Validators.required, Validators.email
    ]]
  })

  get dui() {
    return this.formUser.get('dui') as FormControl;
  }
  get nombres() {
    return this.formUser.get('nombres') as FormControl;
  }
  get apellidos() {
    return this.formUser.get('apellidos') as FormControl;
  }
  get agencia() {
    return this.formUser.get('agencia') as FormControl;
  }
  get departamento() {
    return this.formUser.get('departamento') as FormControl;
  }
  get cargo() {
    return this.formUser.get('cargo') as FormControl;
  }
  get telefono() {
    return this.formUser.get('telefono') as FormControl;
  }
  get email() {
    return this.formUser.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.loadAgencia();
    this.loadDepartamento();
  }

  loadAgencia() {
    return this.colaboradorService.getAgencia().subscribe((data: any) => {
      console.log(data)
      this.listaAgencia = data;
    })
  }

  loadDepartamento() {
    return this.colaboradorService.getDepartamento().subscribe((data: any) => {
      console.log(data)
      this.listaDepartamento = data;
    });
  }

}


