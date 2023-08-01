
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/interfaces/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

//import { data } from '../../../assets/data/general_datosColaborador.json';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {

  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();

  listaAgencia:any=[];
  listaCargos:any=[];
  listaCargo:any=[];
  listaMenu:any=[];
  colaborador!: Colaborador;
  formUser: FormGroup;
  formPermisos: FormGroup;
  formCargos: FormGroup;
  ngSelectA: any;
  ngSelectD: any;
  ngSelectC: any;
  img: any;
  imagen: File | null = null;
  codAgencia: any;
  imgTamanio: any;
  avatar = '../../../assets/img/avatar1.png';
  isLoading = false;
  guardando = true;
  // Variable para almacenar el contador de checkboxes seleccionados
  selectedCheckboxCount = 0;
  selectedCheckboxCountCargos = 0;
  public datos: any[] = [];
  public datosCargo: any[] = [];
  
  constructor(
    public fb:FormBuilder, 
    private colaboradorService:ColaboradorService, 
    private router: Router, 
    private activeRoute: ActivatedRoute, 
    private toastr: ToastrService, 
    private http: HttpClient, 
    private menuService: MenuService) {

    this.formUser = this.fb.group({
      'dui': ['', Validators.required],
      'nombres': ['', Validators.required],
      'apellidos': ['', Validators.required],
      'agencia': ['', Validators.required],
      // 'departamento': ['', Validators.required],
      // 'cargo': ['', Validators.required],
      'telefono': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      // 'foto': ['']
    });
    
    this.formPermisos = this.fb.group({
      'check': ['', Validators.required],
    });
    this.formCargos = this.fb.group({
      'checkCargo': ['', Validators.required],
    });

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
  // get departamento() {
  //   return this.formUser.get('departamento') as FormControl;
  // }
  // get cargo() {
  //   return this.formUser.get('cargo') as FormControl;
  // }
  get telefono() {
    return this.formUser.get('telefono') as FormControl;
  }
  get email() {
    return this.formUser.get('email') as FormControl;
  }
  get check() {
    return this.formPermisos.get('check') as FormControl;
  }
  get checkCargo() {
    return this.formPermisos.get('checkCargo') as FormControl;
  }

  ngOnInit(): void {
    this.loadAgencia();
    
    this.cargar();
    this.cambiarEstadoLoading();
    this.loadMenus();
    this.loadCargos();
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      //processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "2%", "targets": 1 },
        { "width": "25%", "targets": 2 },
        { "width": "10%", "targets": 3 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };

    this.dtOptions1 = {
      
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "2%", "targets": 1 },
        { "width": "25%", "targets": 2 },
        { "width": "10%", "targets": 3 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
  }

  async loadAgencia() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getAgencia().subscribe((data: any) => {
      this.listaAgencia = data;
      //console.log(data)
    })));
  }

  async loadCargos() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getCargo().subscribe((data: any) => {
      this.dtTrigger1.next(0);
      this.listaCargos = data;
      console.log(this.listaCargos )
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

  /**
   * Esta función cambia el estado de isLoading según el valor de guardando.
   */
  cambiarEstadoLoading(){
    this.guardando == true ? this.isLoading = false : this.isLoading = true;
  }

  guardar() {
    // // Concatenamos valores para la clave del usuario
    if(this.selectedCheckboxCountCargos > 0 ) {
      const nombreClave = this.formUser.value.nombres.charAt(0).toUpperCase();
      const apellidoClave = this.formUser.value.apellidos.split(' ')[0].toLowerCase();
      const valorClave = nombreClave+apellidoClave+this.codAgencia;
  
      const formData = new FormData();
      formData.append('nombres', this.formUser.value.nombres),
      formData.append('apellidos', this.formUser.value.apellidos),
      formData.append('dui', this.formUser.value.dui),
      formData.append('password', valorClave),
      formData.append('telefono', this.formUser.value.telefono),
      formData.append('correo', this.formUser.value.email),
      formData.append('agencia_id', this.formUser.value.agencia),
      // formData.append('departamento_id', this.formUser.value.departamento),
      formData.append('cargo_id', JSON.stringify(this.selectedItems)),
      formData.append('foto', this.imagen!),
      formData.append('habilitado', 'S'),
      formData.append('intentos', '5'),
      formData.append('ultimoIngreso', '')

      
      if(this.selectedItems.length > 0) {
        formData.append('tipoPermisoMenu_id', '1')
      } else {
        formData.append('tipoPermisoMenu_id', '2')
      }
      formData.append('menu_id', JSON.stringify(this.selectedItemsMenu))
      console.log(this.selectedItemsMenu)

      this.colaboradorService.saveColaborador(formData).subscribe((response) => {
        console.log(response.success);
        if(response.success == true){
          
          this.toastr.success('Colaborador registrado con éxito!', 'Éxito!');
          this.router.navigate(['/dashboard/list-collaborator']);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        }
      });

    } else {
      this.toastr.warning('Debes seleccionar al menos un cargo para este usuario...', 'Advertencia!');
    }


  
  // const newArray = array.map(item => ({
  //   id: item.id,
  //   departamento_id: item.departamento_id,
  //   cargo_id: item.cargo_id
  // }));

  // const formData = new FormData();
  // for (let index = 0; index < newArray.length; index++) {
  //   const element = newArray[index];
  //   //console.log(element)
  //   formData.append('departamento_id', element.departamento_id.toString()),
  //   formData.append('cargo_id', element.cargo_id.toString()),
  //   formData.append('colaborador_id', element.id.toString())

  //   this.colaboradorService.saveColaborador(formData).subscribe((response) => {
  //     console.log(response.success)
  //   });
  // }
  
  // console.log(newArray);


    // this.colaboradorService.saveColaborador(formData).subscribe((response) => {

    // });



    // const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
    // const userCells = document.querySelectorAll('table td.user');
    // const checkedMenu: string[] = [];

    // checkboxes.forEach((checkbox, index) => {
    //   if (checkbox.checked) {
    //     const userCell = userCells[index];
    //     const userName = userCell.textContent?.trim();
    //     if (userName) {
    //       checkedMenu.push(userName);
    //     }
    //   }
    // });
    // console.log(checkedMenu);

          // let idColab = 0;
          // const formData = new FormData();

          // for (let index = 0; index < checkedMenu.length; index++) {
          //   const element = checkedMenu[index];

          //   formData.append('tipoPermisoMenu_id', '2'),
          //   formData.append('departamento_id', this.formUser.value.departamento),
          //   formData.append('cargo_id', this.formUser.value.cargo)
          //   formData.append('colaborador_id', idColab.toString())
          //   formData.append('menu_id', element),
            
  
          //   this.menuService.savePermisos(formData).subscribe((res) => {
          //     console.log(res)
          //     if(res.success) {
          //       this.toastr.success('Configuración registrada con éxito!', 'Éxito!');
          //     }
          //     this.router.navigate(['/dashboard/list-configuracion']);
  
          //   });

          // }



  }

  cargar() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    //const idPerfil = localStorage.getItem('id');
    //console.log(id)
    if(id){
      this.isLoading = true;
      this.guardando = false;
      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar colaborador';

      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = true;

      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false;

      this.activeRoute.params.subscribe( e => {
        let id = e['id'];
        if(id) {
          
          this.colaboradorService.getobtenerPorIDColaborador(id).subscribe((response) => {
            this.colaborador = response.dataDB[0];
            //console.log(response.dataDB)
            this.formUser.patchValue(this.colaborador);
            this.ngSelectA = response.dataDB[0].agencia_id;
            // this.ngSelectD = response.dataDB[0].departamento_id;
            // this.ngSelectC = response.dataDB[0].cargo_id;

            this.menuService.getDetallePermisosMenu(id).subscribe((res: any) => {
              //console.log(res.dataDB)
              for (let index = 0; index < res.dataDB.length; index++) {
                this.datos.push(res.dataDB[index].menu_id);
              }
              console.log(this.datos)
              for (let index = 0; index < response.dataDB.length; index++) {
                this.datosCargo.push(response.dataDB[index].cargo_id);
              }
              console.log(this.datosCargo)
            });
            console.log(response.dataDB[0].foto)
            if(response.dataDB[0].foto) {
              this.colaboradorService.getFotoURL(response.dataDB[0].foto).subscribe((data: any) => {
                this.isLoading = false;
                this.img = response.dataDB.foto;
                setTimeout(() => {
                  const imagenPrevisualizacion = document.querySelector("#image") as HTMLInputElement;
                  this.imgTamanio = data.size;
                  let binaryData = [];
                  binaryData.push(data); 
                  let foo = URL.createObjectURL(new Blob(binaryData, {type: 'image/jpeg'}));
                  this.imgTamanio == 13 ? imagenPrevisualizacion.src = this.avatar : imagenPrevisualizacion.src = foo;
                }, 100);
              });
            }
          });
        }
      });
    } 
    
    else {
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = true;
      this.ngSelectA = 0;
      this.ngSelectD = 0;
      this.ngSelectC = 0;
    }
  }

  editar() {
    if(this.selectedCheckboxCountCargos > 0 || this.datosCargo.length !== 0) {
      const formData = new FormData();
      formData.append('id', this.activeRoute.snapshot.paramMap.get('id')!),
      formData.append('dui', this.formUser.value.dui),
      formData.append('nombres', this.formUser.value.nombres),
      formData.append('apellidos', this.formUser.value.apellidos),
      formData.append('agencia_id', this.formUser.value.agencia),
      // formData.append('departamento_id', this.formUser.value.departamento),
      formData.append('cargo_id', JSON.stringify(this.datosCargo))

      if(this.imagen != null) {
        formData.append('foto', this.imagen)
      }
      
      formData.append('telefono', this.formUser.value.telefono),
      formData.append('correo', this.formUser.value.email),
      formData.append('habilitado', 'S'),
      formData.append('ultimoIngreso', '')

      let checkedMenu: string[] = [];
      console.log(this.selectedCheckboxCount)
      
      console.log(this.datos)
      console.log(this.datosCargo)
      if(this.datosCargo.length > 0) {
        formData.append('tipoPermisoMenu_id', '1')
      } else {
        formData.append('tipoPermisoMenu_id', '2')
      }
      formData.append('menu_id', this.datos.toString())
      console.log(checkedMenu.toString())
      console.log(checkedMenu);
      //} 
      //console.log(this.datosCargo);
      //const id = this.activeRoute.snapshot.paramMap.get('id');
      
      this.colaboradorService.editarColaborador(formData).subscribe((response) => {
        //console.log(response.success);
        this.datos = [];
        this.datosCargo = [];
        // this.menuService.editarDetallePermisoMenu(formData).subscribe((resp) => {
        //   console.log(resp.success)
        // });
        checkedMenu = [];
  
        if(response.success == true) {
          this.toastr.success('Colaborador actualizado con éxito!', 'Éxito!');
          this.router.navigate(['/dashboard/list-collaborator']);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
    } else {
      this.toastr.warning('Debes seleccionar al menos un cargo para este usuario...', 'Advertencia!');
    }
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
    console.log(this.imagen);
    let foto = document.getElementById('foto') as HTMLInputElement;
    localStorage.setItem('foto', foto.value);

    const seleccionArchivos = document.querySelector("#foto") as HTMLInputElement;
    const imagenPrevisualizacion = document.querySelector("#image") as HTMLInputElement;
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

  
  // permisos menu
  // Función que se ejecuta cuando se produce un cambio en el estado del checkbox
  handleCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCheckboxCount++;
    } else {
      this.selectedCheckboxCount--;
    }
    console.log(this.selectedCheckboxCount)
  }

  loadMenus() {
    return this.menuService.getMenus().subscribe((data: any) => {
      this.dtTrigger.next(0);
      this.listaMenu = data.dataDB;
      //console.log(data.dataDB)
    });
  }

  handleCheckboxChangeCargo(event: Event){
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCheckboxCountCargos++;
    } else {
      this.selectedCheckboxCountCargos--;
    }
  }

  selectedItems: any[] = [];
  isSelected(item: any) {
    this.selectedItems.some((selectedItem) => selectedItem === item);
    //console.log(this.selectedItems)
  }

  selectedItemsMenu: any[] = [];
  isSelectedMenu(item: any) {
    this.selectedItemsMenu.some((selectedItem) => selectedItem === item);
    //console.log(this.selectedItems)
  }

  onCheckboxChange(item: any) {
    // //console.log(this.selectedItems)
    console.log(this.selectedItems);
    // console.log(this.datos);
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(!id) {
      const index = this.selectedItems.findIndex((selectedItem) => selectedItem === item);
      console.log(index)
      if (index > -1) {
        this.selectedItems.splice(index, 1);
        console.log(this.selectedItems);
      } else {
        this.selectedItems.push(item);
        console.log(this.selectedItems);
      }
    } else {
      const indexNew = this.datosCargo.findIndex((selectedItem) => selectedItem === item);
      console.log(indexNew)
      if (indexNew > -1) {
        this.datosCargo.splice(indexNew, 1);
        console.log(this.datosCargo);
      } else {
        this.datosCargo.push(item);
        console.log(this.datosCargo);
      }
    }
  }

  onCheckboxChangeMenu(item: any) {
    // //console.log(this.selectedItems)
    // console.log(this.selectedItemsMenu);
    // console.log(this.datos);
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(!id) {
      const index = this.selectedItemsMenu.findIndex((selectedItem) => selectedItem === item);
      console.log(index)
      if (index > -1) {
        this.selectedItemsMenu.splice(index, 1);
        console.log(this.selectedItemsMenu);
      } else {
        this.selectedItemsMenu.push(item);
        console.log(this.selectedItemsMenu);
      }
    } else {
      const indexNew = this.datos.findIndex((selectedItem) => selectedItem === item);
      console.log(indexNew)
      if (indexNew > -1) {
        this.datos.splice(indexNew, 1);
        console.log(this.datos);
      } else {
        this.datos.push(item);
        console.log(this.datos);
      }
    }
  }


}


