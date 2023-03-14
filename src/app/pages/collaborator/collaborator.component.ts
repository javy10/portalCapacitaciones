
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/interfaces/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {

  listaAgencia:any=[];
  listaDepartamento:any=[];
  listaCargo:any=[];
  colaborador!: Colaborador;
  formUser: FormGroup;

  constructor(public fb:FormBuilder, private colaboradorService:ColaboradorService, private router: Router, private activeRoute: ActivatedRoute) {

    this.formUser = this.fb.group({
      'dui': ['', Validators.required],
      'nombres': ['', Validators.required],
      'apellidos': ['', Validators.required],
      'agencia': ['', Validators.required],
      'departamento': ['', Validators.required],
      'cargo': ['', Validators.required],
      'telefono': ['', Validators.required],
      'correo': ['', [Validators.required, Validators.email]],
      'foto': []
    })

  }

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
  get correo() {
    return this.formUser.get('correo') as FormControl;
  }
  get foto() {
    return this.formUser.get('foto') as FormControl;
  }

  ngOnInit(): void {
    this.loadAgencia();
    this.loadDepartamento();
    this.cargar();
  }

  async loadAgencia() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getAgencia().subscribe((data: any) => {
      this.listaAgencia = data;
      //console.log(data)
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
    })));
  }

  async guardar() {

    const colaborador: Colaborador = {
      nombres: this.formUser.value.nombres!,
      apellidos: this.formUser.value.apellidos!,
      dui: this.formUser.value.dui!,
      clave: '1234',
      telefono: this.formUser.value.telefono!,
      correo: this.formUser.value.correo!,
      agencia: this.formUser.value.agencia!,
      departamento: this.formUser.value.departamento!,
      cargo: this.formUser.value.cargo!,
      foto: this.formUser.value.foto!,
      habilitado: 'S',
      ultimoIngreso: ''
    }
    await new Promise(resolve => resolve(this.colaboradorService.saveColaborador(JSON.parse(JSON.stringify(colaborador))).subscribe((response) => {
        console.log(response);
        Swal.fire({
          //position: 'center',
          icon: 'success',
          title: 'Colaborador registrado con exito',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/dashboard/list-collaborator']);
    })));
  }

  cargar() {


    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(id) {
      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar colaborador';

      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = true;

      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false;

      this.activeRoute.params.subscribe( e => {
        let id = e['id'];
        if(id) {
          new Promise(resolve => resolve(this.colaboradorService.getColaboradorID(id).subscribe((response) => {
            this.colaborador = response;
            this.formUser.patchValue(this.colaborador);

            // this.colaboradorService.getAgenciaId(response.agencia_id).subscribe((res: any) => {
            //   console.log(res)
            //   this.listaAgencia = res;
            // });
            // this.colaboradorService.getDepartamentoId(response.departamento_id).subscribe((res) => {
            //   this.listaDepartamento = res;
            // });
            // this.colaboradorService.getCargoId(response.cargo_id).subscribe((res) => {
            //   this.listaCargo = res;
            // });
          })));

        }
      });
    } else {
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = true;
    }

  }

  async editar() {
    const colaborador: Colaborador = {
      nombres: this.formUser.value.nombres!,
      apellidos: this.formUser.value.apellidos!,
      dui: this.formUser.value.dui!,
      clave: '1234',
      telefono: this.formUser.value.telefono!,
      correo: this.formUser.value.correo!,
      agencia: this.formUser.value.agencia!,
      departamento: this.formUser.value.departamento!,
      cargo: this.formUser.value.cargo!,
      foto: this.formUser.value.foto!,
      habilitado: 'S',
      ultimoIngreso: ''
    }

    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id);
    console.log(colaborador);

    await new Promise(resolve => resolve(this.colaboradorService.editarColaborador(id, colaborador).subscribe((response) => {
      console.log(response);
      Swal.fire({
        //position: 'center',
        icon: 'success',
        title: 'Colaborador actualizado con exito',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/dashboard/list-collaborator']);
    })));
  }
}


