import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/interfaces/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styles: [
  ]
})
export class CollaboratorComponent implements OnInit {

  constructor(public fb:FormBuilder,  private http: HttpClient, private colaboradorService:ColaboradorService) {}

  listaAgencia:any=[];
  listaDepartamento:any=[];
  listaCargo:any=[];
  // colaborador!: Colaborador;

  formUser = this.fb.group({
    'dui': ['', Validators.required],
    'nombres': ['', Validators.required],
    'apellidos': ['', Validators.required],
    'agencia': ['', Validators.required],
    'departamento': ['', Validators.required],
    'cargo': ['', Validators.required],
    'telefono': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'foto': []
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

  async loadAgencia() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getAgencia().subscribe((data: any) => {
      this.listaAgencia = data;
    })));
  }

  async loadDepartamento() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getDepartamento().subscribe((data: any) => {
      this.listaDepartamento = data;
    })));
  }

  async handleChange() {
    const id = document.getElementById('departamento') as HTMLInputElement;
    const valor = parseInt(id.value, 10);

    await new Promise(resolve => resolve(this.colaboradorService.postDeptCargo(valor).subscribe((response) => {
      this.listaCargo = response.dataDB;
      //console.log(this.listaCargo)
    })));
  }

  async guardar() {
    // console.log(JSON.parse(JSON.stringify(this.formUser.value)))
    // await new Promise(resolve => resolve(this.colaboradorService.saveColaborador(JSON.parse(JSON.stringify(this.formUser.value))).subscribe((response) => {
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     title: 'Colaborador registrado con exito',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   const modal = document.getElementById('ExtralargeModal');
    //   modal!.style.display = 'none';
    // })));
    // console.log(this.formUser.value);

    // console.log(this.formUser.value)

    const colaborador: Colaborador = {
      nombres: this.formUser.value.nombres!,
      apellidos: this.formUser.value.apellidos!,
      dui: this.formUser.value.dui!,
      clave: '1234',
      telefono: this.formUser.value.telefono!,
      correo: this.formUser.value.email!,
      agencia: this.formUser.value.agencia!,
      departamento: this.formUser.value.departamento!,
      cargo: this.formUser.value.cargo!,
      foto: this.formUser.value.foto!,
      habilitado: 'S',
      ultimoIngreso: ''
    }
    //console.log(colaborador);
    await new Promise(resolve => resolve(this.colaboradorService.saveColaborador(JSON.parse(JSON.stringify(colaborador))).subscribe((response) => {
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Colaborador registrado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        const modal = document.getElementById('ExtralargeModal');
        modal!.style.display = 'none';
    })));


  }
}


