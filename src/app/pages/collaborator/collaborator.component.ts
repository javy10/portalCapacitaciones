
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
  ngSelectA: any;
  ngSelectD: any;
  ngSelectC: any;
  img: any;
  imagen: File | null = null;
  codAgencia: any;

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
  async handleChangeAgencia() {
    const id = document.getElementById('agencia') as HTMLInputElement;
    const valor = parseInt(id.value, 10);

    await new Promise(resolve => resolve(this.colaboradorService.getAgenciaId(valor).subscribe((response) => {
      this.codAgencia = response.dataDB.codAgencia;
    })));
  }

  //validamos campo de DUI
  validateFormat(event: any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
     if (this.formUser.value.dui.length === 8) {
          let dui = document.getElementById('dui') as HTMLInputElement;
          dui.value += '-';
        }
  }
  //validamos el telefono
  validateFormatTel(event: any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
     if (this.formUser.value.telefono.length === 4) {
          let telefono = document.getElementById('telefono') as HTMLInputElement;
          telefono.value += '-';
      }
  }

  async guardar() {
      
    // Concatenamos valores para la clave del usuario
    const nombreClave = this.formUser.value.nombres.charAt(0).toUpperCase();
    const apellidoClave = this.formUser.value.apellidos.split(' ')[0].toLowerCase();
    const valorClave = nombreClave+apellidoClave+this.codAgencia;

    const formData = new FormData();
    formData.append('nombres', this.formUser.value.nombres),
    formData.append('apellidos', this.formUser.value.apellidos),
    formData.append('dui', this.formUser.value.dui),
    formData.append('password', valorClave),
    formData.append('telefono', this.formUser.value.telefono),
    formData.append('correo', this.formUser.value.correo),
    formData.append('agencia_id', this.formUser.value.agencia),
    formData.append('departamento_id', this.formUser.value.departamento),
    formData.append('cargo_id', this.formUser.value.cargo),
    formData.append('foto', this.imagen!),
    formData.append('habilitado', 'S'),
    formData.append('intentos', '5'),
    formData.append('ultimoIngreso', ''),

    console.log(formData)
    await new Promise(resolve => resolve(this.colaboradorService.saveColaborador(formData).subscribe((response) => {
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
            this.colaborador = response.dataDB;
            //console.log(response.dataDB)
            this.formUser.patchValue(this.colaborador);

            this.colaboradorService.getAgenciaId(response.dataDB.agencia_id).subscribe((res: any) => {
              this.ngSelectA = res.dataDB.id;
            });
            this.colaboradorService.getDepartamentoId(response.dataDB.departamento_id).subscribe((res: any) => {
              this.ngSelectD = res.dataDB.id;
            });
            this.colaboradorService.getCargoId(response.dataDB.cargo_id).subscribe((res: any) => {
              new Promise(resolve => resolve(this.colaboradorService.postDeptCargo(this.ngSelectD).subscribe((response) => {
                this.listaCargo = response.dataDB;
                this.ngSelectC = res.dataDB.id;
              })));
            });
            const imagenPrevisualizacion = document.querySelector("#img") as HTMLInputElement;
            console.log(response.dataDB.foto)
            // const img = localStorage.getItem('foto');
            // const objectURL = URL.createObjectURL(img);
            //  imagenPrevisualizacion.src = objectURL;
          })));
        }
      });
    } else {
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = true;
      this.ngSelectA = 0;
      this.ngSelectD = 0;
      this.ngSelectC = 0;
    }
  }

  async editar() {
    const formData = new FormData();
    formData.append('dui', this.formUser.value.dui),
    formData.append('nombres', this.formUser.value.nombres),
    formData.append('apellidos', this.formUser.value.apellidos),
    formData.append('agencia_id', this.formUser.value.agencia),
    formData.append('departamento_id', this.formUser.value.departamento),
    formData.append('cargo_id', this.formUser.value.cargo),
    formData.append('foto', this.imagen!),
    formData.append('telefono', this.formUser.value.telefono),
    formData.append('correo', this.formUser.value.correo),
    formData.append('habilitado', 'S'),
    formData.append('ultimoIngreso', '')

    console.log(this.formUser.value)

    const id = this.activeRoute.snapshot.paramMap.get('id');
    await new Promise(resolve => resolve(this.colaboradorService.editarColaborador(id, this.formUser.value).subscribe((response) => {
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

  cancelar() {
    const dui = document.getElementById('dui') as HTMLInputElement;
    dui.value = "";
    const nombres = document.getElementById('nombres') as HTMLInputElement;
    nombres.value = "";
    const apellidos = document.getElementById('apellidos') as HTMLInputElement;
    apellidos.value = "";
    this.ngSelectA = 0;
    this.ngSelectD = 0;
    this.ngSelectC = 0;
    const telefono = document.getElementById('telefono') as HTMLInputElement;
    telefono.value = "";
    const correo = document.getElementById('correo') as HTMLInputElement;
    correo.value = "";
  }

  changeFoto(event: any) {
    this.imagen = event.target.files[0];
    let foto = document.getElementById('foto') as HTMLInputElement;
    localStorage.setItem('foto', foto.value);

    const seleccionArchivos = document.querySelector("#foto") as HTMLInputElement;
    const imagenPrevisualizacion = document.querySelector("#img") as HTMLInputElement;
    // Los archivos seleccionados, pueden ser muchos o uno
    const archivos = seleccionArchivos.files;
    // Si no hay archivos salimos de la función y quitamos la imagen
    if (!archivos || !archivos.length) {
      imagenPrevisualizacion.src = "";
      return;
    }
    // Ahora tomamos el primer archivo, el cual vamos a previsualizar
    const primerArchivo = archivos[0];
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo);
    // Y a la fuente de la imagen le ponemos el objectURL
    imagenPrevisualizacion.src = objectURL;
  }

}


