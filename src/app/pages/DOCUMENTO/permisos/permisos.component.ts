import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  constructor(private documentoService:DocumentoService, private colaboradorService: ColaboradorService, 
    private fb:FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private toastr: ToastrService,) {
    this.formPermiso = this.fb.group({
      'departamento': ['', Validators.required],
      'colaborador': ['', Validators.required],
      'departamentoSelect': ['', Validators.required],
      'colaboradorSelect': ['', Validators.required, ],
    });
  }

  formPermiso!: FormGroup;
  ngSelectD: any;
  ngSelectC: any;
  listaDepartamento:any=[];
  listaColaborador:any=[];
  selectedOption!: any;
  permiso: any;
  detallePermiso: any;
  idDetallePermiso: any;
  idD: any;
  idP: any;
  


  get departamento() {
    return this.formPermiso.get('departamento') as FormControl;
  }
  get colaborador() {
    return this.formPermiso.get('colaborador') as FormControl;
  }
  get departamentoSelect() {
    return this.formPermiso.get('departamentoSelect') as FormControl;
  }
  get colaboradorSelect() {
    return this.formPermiso.get('colaboradorSelect') as FormControl;
  }

  ngOnInit(): void {
    
    this.loadDepartamento();
    this.loadColaboradores();
 
    const departamento = document.getElementById("departamento") as HTMLInputElement;
    const colaborador = document.getElementById("colaborador") as HTMLInputElement;
    const colab = document.getElementById("colaboradorSelec") as HTMLSelectElement;
    const depart = document.getElementById("departamentoSelec") as HTMLSelectElement;

    this.ngSelectD = 0;
    this.ngSelectC = 0;
    colab.disabled = true;
    depart.disabled = true;
    
    const id = this.activeRoute.snapshot.paramMap.get('id')!;
    console.log(id)
    this.documentoService.getDetalleID(parseInt(id)).subscribe((response) => {
      console.log(response.dataDB)
      if(response.dataDB) {
        colab.disabled = true;
        depart.disabled = true;
      } else {
        colab.disabled = true;
        depart.disabled = true;
      }
    });

    this.cargar();

  }

  async loadDepartamento() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getDepartamento().subscribe((data: any) => {
      this.listaDepartamento = data;
    })));
  }
  
  async loadColaboradores() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaborador = data.dataDB;
    })));
  }

  cancelar() {
    const myForm = document.getElementById("form") as HTMLFormElement;
    const colab = document.getElementById("colaboradorSelec") as HTMLInputElement;
    const depart = document.getElementById("departamentoSelec") as HTMLInputElement;
    colab.disabled = true;
    depart.disabled = true;
    this.ngSelectD = 0;
    this.ngSelectC = 0;
    this.selectedOption = null;
    myForm.reset();
  }

  guardar() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    const id = this.activeRoute.snapshot.paramMap.get('id');
    let today = new Date().toLocaleString();
    const tipo = document.querySelector('input[name="tipo"]:checked') as HTMLInputElement;
    const tipoColaborador = document.querySelector('input[name="colaborador"]:checked') as HTMLInputElement;
    let nombreDepar = '', idDepar = 0;
    let nombreColab = '', idColab = 0;

    console.log(tipo.value)

    if(tipo.value == '1' && tipo.value != null) {
      const combo = document.getElementById('departamentoSelec') as HTMLSelectElement;
      const nombreCombo = combo.options[combo.selectedIndex].text;
      nombreDepar = nombreCombo;
      idDepar = this.formPermiso.value.departamentoSelect;
    } else if(tipoColaborador.value == '2') {
      const comboC = document.getElementById('colaboradorSelec') as HTMLSelectElement;
      const nombreComboC = comboC.options[comboC.selectedIndex].text;
      nombreColab = nombreComboC;
      idColab = this.formPermiso.value.colaboradorSelect;
    }

    this.permiso = {
      'documento_id': id,
      'tipoPermiso_id': tipo.value == '1' ? tipo.value : tipoColaborador.value,
      'departamento_id': idDepar,
      'colaborador_id': idColab,
      'fechaRegistro': today,
    }

    this.documentoService.savePermiso(this.permiso).subscribe((response) => {
      if (response.success == true) {
        Swal.fire({
          //position: 'center',
          icon: 'success',
          title: 'Permiso guardado con éxito',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {

            swalWithBootstrapButtons.fire({
              title: '¿Quiéres agregar más permisos a éste documento?',
              text: "",
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Si, agregaré más!',
              cancelButtonText: 'No, ya no!',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                this.router.navigate(['dashboard/list-permisos']);
              }
            })
            
            //window.location.reload();
          }
        });
      }
    });
  }

  cargar() {

    // const colab = document.getElementById("colaboradorSelect") as HTMLInputElement;
    // const depart = document.getElementById("departamentoSelect") as HTMLInputElement;
    // colab.disabled = true;
    // depart.disabled = true;

    const id = this.activeRoute.snapshot.paramMap.get('id');
    const idD = this.activeRoute.snapshot.paramMap.get('idD');
    const idP = this.activeRoute.snapshot.paramMap.get('idP');
    console.log(id)
    console.log(idD)
    console.log(idP)
    this.idDetallePermiso = id;
    this.idD = idD;
    this.idP = idP;
    //const idPerfil = localStorage.getItem('id');
    if(id && idD && idP){
      console.log(id)
      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar Permiso';
      
      const btnGuardar = document.getElementById('btnAceptarP');
      btnGuardar!.hidden = true;
      
      const btnEdit = document.getElementById('btnEditarP');
      btnEdit!.hidden = false;

      this.activeRoute.params.subscribe( e => {
        let id = e['id'];
        if(id) {
          console.log(id)
          new Promise(resolve => resolve(this.documentoService.getDetalleID(id).subscribe((response) => {
            console.log(response.dataDB)

            if(response.dataDB[0].departamento_id == null) {
              const colabCheck = document.getElementById("colaborador") as HTMLInputElement;
              const dep = document.getElementById("departamento") as HTMLInputElement;
              const colab = document.getElementById("colaboradorSelec") as HTMLInputElement;
              const depart = document.getElementById("departamentoSelec") as HTMLInputElement;
              colab.disabled = false;
              depart.disabled = true;
              colabCheck.checked = true;
              dep.checked = false;
       
              this.colaboradorService.getColaboradorID(response.dataDB[0].colaborador_id).subscribe((res: any) => {
                this.ngSelectC = res.dataDB.id;
              });
      
            } else {
              const dep = document.getElementById("departamento") as HTMLInputElement;
              const depar = document.getElementById("departamentoSelec") as HTMLInputElement;
              const colabCheck = document.getElementById("colaboradorSelec") as HTMLInputElement;
              dep.checked = true;
              depar.disabled = false;
              colabCheck.checked = true;
      
              this.colaboradorService.getDepartamentoId(response.dataDB[0].departamento_id).subscribe((res: any) => {
                console.log(res.dataDB)
                this.ngSelectD = res.dataDB.id;
              });
            }

          })));
        }
      });
    }
    else {
      const btnEdit = document.getElementById('btnEditarP');
      btnEdit!.hidden = true;
      this.ngSelectD = 0;
      this.ngSelectC = 0;
    }
  }

  editar() {
    //const id = this.activeRoute.snapshot.paramMap.get('id');
    let today = new Date().toLocaleString();
    const tipo = document.querySelector('input[name="tipo"]:checked') as HTMLInputElement;
    let nombreDepar = '', idDepar = 0;
    let nombreColab = '', idColab = 0;

    if(tipo.value == '1') {
      const combo = document.getElementById('departamentoSelec') as HTMLSelectElement;
      const nombreCombo = combo.options[combo.selectedIndex].text;
      nombreDepar = nombreCombo;
      idDepar = this.formPermiso.value.departamentoSelect;
    } else if(tipo.value == '2') {
      const comboC = document.getElementById('colaboradorSelec') as HTMLSelectElement;
      const nombreComboC = comboC.options[comboC.selectedIndex].text;
      nombreColab = nombreComboC;
      idColab = this.formPermiso.value.colaboradorSelect;
    }

    this.permiso = {
      'permiso_id': this.idP,
      'tipoPermiso_id': tipo.value,
      'fechaRegistro': today,
    }
    this.detallePermiso = {
      'id': this.idDetallePermiso,
      'permiso_id': this.idP,
      'documento_id': this.idD,
      'departamento_id': idDepar == 0 ? null : idDepar,
      'colaborador_id': idColab == 0 ? null : idColab,
      'fechaRegistro': today,
    }

    console.log(this.permiso)
    console.log(this.detallePermiso)

    this.documentoService.editarPermiso(this.permiso).subscribe((resp) => {
      
      this.documentoService.editarDetallePermiso(this.detallePermiso).subscribe((response) => {
  
      });
      
        // Swal.fire({
        //   //position: 'center',
        //   icon: 'success',
        //   title: 'Permiso actualizado con éxito',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   },
        //   showConfirmButton: false,
        //   timer: 1500,
        //   didOpen: () => {
        //     Swal.showLoading()
        //   },
        //   willClose: () => {
            
        //     this.router.navigate(['dashboard/list-permisos']);
        //     //window.location.reload();
        //   }
        // });

        this.toastr.success('Permiso actualizado con éxito!', 'Éxito!');
        this.router.navigate(['dashboard/list-permisos']);
      
    });

  }

  cambiarUno() {
    const colab = document.getElementById("colaboradorSelec") as HTMLSelectElement;
    const depart = document.getElementById("departamentoSelec") as HTMLSelectElement;
    colab.disabled = true;
    depart.disabled = false;
    this.ngSelectC = 0;
  }

  cambiarDos() {
    const colab = document.getElementById("colaboradorSelec") as HTMLSelectElement;
    const depart = document.getElementById("departamentoSelec") as HTMLSelectElement;
    depart.disabled = true;
    colab.disabled = false;
    this.ngSelectD = 0;
  }


}
