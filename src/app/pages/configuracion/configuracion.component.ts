import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {


  formConfiguracion!: FormGroup;
  selectedOption!: any;
  ngSelectD: any;
  ngSelectC: any;
  ngSelectU: any;
  ngSelectM: any;
  listaDepartamento:any=[];
  listaCargo:any=[];
  listaColaborador:any=[];
  listaMenu:any=[];
  idPermisoMenu: any;
  idconfig: any;
  


  constructor(public fb:FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private colaboradorService: ColaboradorService, private documentoService: DocumentoService, private menuService: MenuService, private toastr: ToastrService,) {
    this.formConfiguracion = this.fb.group({
      'menu': ['', Validators.required],
      'cargo': ['', Validators.required],
      'colaborador': ['', Validators.required],
      'departamento': ['', Validators.required],
      'cargoSelect': ['', Validators.required],
      'colaboradorSelect': ['', Validators.required],
    })
  }

  get clave() {
    return this.formConfiguracion.get('clave') as FormControl;
  }

  get cargo() {
    return this.formConfiguracion.get('cargo') as FormControl;
  }
  get colaborador() {
    return this.formConfiguracion.get('colaborador') as FormControl;
  }
  get departamento() {
    return this.formConfiguracion.get('departamento') as FormControl;
  }
  get cargoSelect() {
    return this.formConfiguracion.get('cargoSelect') as FormControl;
  }
  get colaboradorSelect() {
    return this.formConfiguracion.get('colaboradorSelect') as FormControl;
  }

  ngOnInit(): void {
    this.loadMenu();
    this.loadDepartamento();
    this.loadColaboradores();
    this.cargar();

    this.ngSelectM = 0;

    
  }

  async loadMenu() {
    return  await new Promise(resolve => resolve( this.documentoService.getMenus().subscribe((data: any) => {
      console.log(data)
      this.listaMenu = data;

      const depart = document.getElementById("departamento") as HTMLSelectElement;
      const cargo = document.getElementById("cargoSelect") as HTMLSelectElement;
      const colab = document.getElementById("colaboradorSelect") as HTMLSelectElement;
      depart.disabled = true;
      cargo.disabled = true;
      colab.disabled = true;
    })));
  }

  async loadDepartamento() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getDepartamento().subscribe((data: any) => {
      this.listaDepartamento = data;
    })));
  }

  async loadColaboradores() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaborador = data.dataDB;
      console.log(this.listaColaborador)
    })));
  }

  async handleChange() {
    const id = document.getElementById('departamento') as HTMLInputElement;
    const valor = parseInt(id.value, 10);

    await new Promise(resolve => resolve(this.colaboradorService.postDeptCargo(valor).subscribe((response) => {
      this.listaCargo = response.dataDB;
      console.log(this.listaCargo)
    })));
  }

  guardar() {
    
    const tipo = document.querySelector('input[name="cargo"]:checked') as HTMLInputElement;
    const tipoColaborador = document.querySelector('input[name="colaborador"]:checked') as HTMLInputElement;
    let idCargo = 0;
    let idColab = 0, idDepart = 0;

    const formData = new FormData();
    console.log(tipo.value)
    console.log(tipo.value)
    if(tipo.value == '1') {
      const combo = document.getElementById('cargoSelect') as HTMLSelectElement;
      idCargo = this.formConfiguracion.value.cargoSelect;
      idDepart = this.formConfiguracion.value.departamento;
      formData.append('menu_id', this.formConfiguracion.value.menu),
      formData.append('tipoPermisoMenu_id', tipo.value == '1' ? tipo.value : tipoColaborador.value),
      formData.append('departamento_id', idDepart.toString()),
      formData.append('cargo_id', idCargo.toString())

    } else if(tipoColaborador.value == '2') {
      const comboC = document.getElementById('colaboradorSelect') as HTMLSelectElement;    
      idColab = this.formConfiguracion.value.colaboradorSelect;
      console.log(idColab)
      formData.append('menu_id', this.formConfiguracion.value.menu),
      formData.append('colaborador_id', idColab.toString())
    }


    // console.log(this.formConfiguracion.value.menu)
    // console.log(tipo.value)
    // console.log(idDepart.toString())
    // console.log(idCargo.toString())
    // console.log(idColab.toString())

    this.menuService.savePermisos(formData).subscribe((res) => {
      console.log(res)
      if(res.success) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Configuración registrada con éxito',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   },
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        this.toastr.success('Configuración registrada con éxito!', 'Éxito!');
      }
      this.router.navigate(['/dashboard/list-configuracion']);

    });
  }

  cargar() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    const idC = this.activeRoute.snapshot.paramMap.get('idC');
    const idD = this.activeRoute.snapshot.paramMap.get('idD');
    const idCa = this.activeRoute.snapshot.paramMap.get('idCa');

    if(id) {
      console.log(id)
      console.log(idC)
      console.log(idD)
      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar configuración';
  
      const btnGuardar = document.getElementById('submitButton');
      btnGuardar!.hidden = true;
  
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false;

      this.activeRoute.params.subscribe( e => {
        let id = e['id'];
        let idC = e['idC'];
        let idD = e['idD'];
        let idCa = e['idCa'];
        if(id) {
        //   const Id = localStorage.getItem('id');
        console.log(id)
        
        
        const formData = new FormData();
        formData.append('id', idC!.toString()),
        formData.append('idDepart', idD),
        
        //console.log(this.departamento_id)
        
        this.menuService.getDetallePermiso(formData).subscribe((data: any) => {

          console.log(data[0])
          this.idPermisoMenu = data[0].permisoMenu_id;
          this.idconfig = data[0].idConfig;

            this.ngSelectM = data[0].menu_id;

            this.colaboradorService.getCargoId(idCa).subscribe((resp: any) => {
              
              if(data[0].departamento_id == null) {
                const colabCheck = document.getElementById("colaborador") as HTMLInputElement;
                const dep = document.getElementById("cargo") as HTMLInputElement;
                const colab = document.getElementById("colaboradorSelect") as HTMLInputElement;
                colabCheck.checked = true;
                colab.disabled = false;
                dep.checked = false;
                
                this.colaboradorService.getColaboradorID(parseInt(idC)).subscribe((res) => {
                  console.log(res.dataDB)
                  this.ngSelectU = res.dataDB.id;
                }); //
        
              } else {
                const dep = document.getElementById("cargo") as HTMLInputElement;
                const depart = document.getElementById("departamento") as HTMLInputElement;
                const colabCheck = document.getElementById("colaboradorSelect") as HTMLInputElement;
                dep.checked = true;
                depart.disabled = false;
                colabCheck.checked = false;

                this.ngSelectD = data[0].departamento_id;
                this.colaboradorService.postDeptCargo(this.ngSelectD).subscribe((response) => {
                  console.log(response.dataDB)
                  this.listaCargo = response.dataDB;
                  this.ngSelectC = resp.dataDB.id;
                });
              }
            });
          });
       
        }
      });
    }
    else {
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = true;
      this.ngSelectD = 0;
      this.ngSelectC = 0;
      this.ngSelectU = 0;
    }
  }

  editar() {

    console.log(this.idPermisoMenu)
    console.log(this.idconfig)

    const tipo = document.querySelector('input[name="tipo"]:checked') as HTMLInputElement;
    let idCargo = 0;
    let idColab = 0, idDepart = 0;

    if(tipo.value == '1') {
      const combo = document.getElementById('cargoSelect') as HTMLSelectElement;
      idCargo = this.formConfiguracion.value.cargoSelect;
      idDepart = this.formConfiguracion.value.departamento;

    } else if(tipo.value == '2') {
      const comboC = document.getElementById('colaboradorSelect') as HTMLSelectElement;    
      idColab = this.formConfiguracion.value.colaboradorSelect;
    }

    const formData = new FormData();
    formData.append('menu_id', this.formConfiguracion.value.menu),
    formData.append('tipoPermisoMenu_id', tipo.value),
    formData.append('departamento_id', idDepart.toString()),
    formData.append('cargo_id', idCargo.toString()),
    formData.append('colaborador_id', idColab.toString()),
    formData.append('permisoMenu_id', this.idPermisoMenu.toString()),
    formData.append('idconfig', this.idconfig.toString()),

    // console.log(this.formConfiguracion.value.menu)
    // console.log(tipo.value)
    // console.log(idDepart.toString())
    // console.log(idCargo.toString())
    // console.log(idColab.toString())

    this.menuService.editarPermisos(formData).subscribe((res) => {
      console.log(res)
      if(res.success) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Configuración actualizada con éxito',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   },
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        this.toastr.success('Configuración actualizada con éxito!', 'Éxito!');
      }
      this.router.navigate(['/dashboard/list-configuracion']);

    });

  }

  cambiarUno() {
    const depart = document.getElementById("departamento") as HTMLSelectElement;
    const cargo = document.getElementById("cargoSelect") as HTMLSelectElement;
    const colab = document.getElementById("colaboradorSelect") as HTMLSelectElement;
    depart.disabled = false;
    cargo.disabled = false;
    colab.disabled = true;
    this.ngSelectC = 0;
    this.ngSelectD = 0;
    this.ngSelectU = 0;
  }

  cambiarDos() {
   const depart = document.getElementById("departamento") as HTMLSelectElement;
    const cargo = document.getElementById("cargoSelect") as HTMLSelectElement;
    const colab = document.getElementById("colaboradorSelect") as HTMLSelectElement;
    depart.disabled = true;
    cargo.disabled = true;
    colab.disabled = false;
    this.ngSelectD = 0;
    this.ngSelectC = 0;
  }






}
