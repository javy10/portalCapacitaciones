import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit{

    
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();

  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject<any>();

  listaTipoDocumentos:any=[];
  listaColaboradores:any=[];
  formDocumento: FormGroup;
  formPermisos: FormGroup;
  ngSelect: any;

  datosDoc: any;
  datosPermisos: any;
  data: any;
  id:any;
  docs:any;

  tipoPermiso_id: [] = [];
  departamento_id: [] = [];
  colaborador_id: [] = [];

  path: any;

  selectedCheckboxCount = 0;
  selectedCheckboxCount1 = 0;
  selectedCheckboxCount2 = 0;
  public datos: any[] = [];
  public datos1: any[] = [];
  public datos2: any[] = [];
  isLoading = false;

  @Output()
  enviarPath = new EventEmitter<any>()

  listaDepartamentos:any=[];
  listaCargos:any=[];

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(public fb:FormBuilder, private documentoService:DocumentoService, private router: Router, private activeRoute: ActivatedRoute, private toastr: ToastrService, private _colaboradorService: ColaboradorService,) {
    this.formDocumento = this.fb.group({
      'titulo': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'tipo': ['', Validators.required],
    });

    this.formPermisos = this.fb.group({
      'check': ['', Validators.required],
    });
  }

  get titulo() {
    return this.formDocumento.get('titulo') as FormControl;
  }
  get descripcion() {
    return this.formDocumento.get('descripcion') as FormControl;
  }
  get tipo() {
    return this.formDocumento.get('tipo') as FormControl;
  }
  get check() {
    return this.formDocumento.get('check') as FormControl;
  }

  ngOnInit(): void {

    this.dtOptions = {
      
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      responsive: true,
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
      responsive: true,
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

    this.dtOptions2 = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      responsive: true,
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
    
    this.loadTipoDocumento();
    this.loadDepartamentos();
    this.loadCargos();
    this.loadColaborador();
    this.cargar();
  }

  loadTipoDocumento() {
    this.documentoService.getTipoDocumentos().subscribe((data: any) => {
      this.listaTipoDocumentos = data;
      this.ngSelect = 0;
      console.log(data)
    });
  }

  async loadColaborador() {
    //this.isLoading = true;
    // this._colaboradorService.getCollaborator().subscribe((data: any) => {
      const data = await this._colaboradorService.getCollaborator().toPromise();
      console.log(data)
      //this.isLoading = false;
      //this.listaColaboradores = data.dataDB;
      
      let resultArray = data.dataDB.reduce((result:any, current:any) => {
        const found = result.find((item:any) => item.id === current.id);
        if (found) {
          if (!found.cargo_ids.includes(current.cargo_id)) {
            found.cargo_ids.push(current.cargo_id);
          }
          if (!found.departamento_ids.includes(current.departamento_id)) {
            found.departamento_ids.push(current.departamento_id);
          }
        } else {
          result.push({
            id: current.id,
            nombres: current.nombres,
            apellidos: current.apellidos,
            cargo_ids: [current.cargo_id],
            departamento_ids: [current.departamento_id]
          });
        }
        return result;
      }, []);
      
      console.log(resultArray);
      this.dtTrigger2.next(0);
      this.listaColaboradores = resultArray;
      resultArray = [];
      
    //});
  }

  async loadDepartamentos() {
    const depart = await this._colaboradorService.getDepartamento().toPromise();
      //console.log(depart)
      this.dtTrigger.next(0);
      this.listaDepartamentos = depart
      //console.log(this.listaDepartamentos)
    //});
  }

  async loadCargos() {
    const cargos = await this._colaboradorService.getCargo().toPromise();
      console.log(cargos)
      this.dtTrigger1.next(0);
      this.listaCargos = cargos
      //console.log(this.listaDepartamentos)
    //});
  }

  pasarDatosPer(datos:any){
    // console.log(datos)
    this.datosPermisos = datos;
    console.log(this.datosPermisos)
  }

  pasarDatosDoc(datos:any) {
    // console.log(datos)
    this.datosDoc = datos;
    console.log(this.datosDoc)
  }

  selectedItems: any[] = [];
  isSelected(item: any) {
    this.selectedItems.some((selectedItem) => selectedItem === item);
  }
  selectedItems1: any[] = [];
  isSelected1(item: any) {
    this.selectedItems1.some((selectedItem1) => selectedItem1.id === item.id);
  }
  selectedItems2: any[] = [];
  isSelected2(item: any) {
    this.selectedItems2.some((selectedItem2) => selectedItem2.id === item.id);
  }

  
  

  onCheckboxChange(item: any) {
    // const index = this.selectedItems.findIndex((selectedItem) => selectedItem === item);
    // console.log(item)
    // if (index > -1) {
    //   // Si el elemento ya estaba seleccionado, se elimina de la matriz selectedItems
    //   this.selectedItems.splice(index, 1);
    //   console.log(this.selectedItems)
    // } else {
    //   // Si el elemento no estaba seleccionado, se agrega a la matriz selectedItems
    //   this.selectedItems.push(item);
    //   console.log(this.selectedItems)

    //   // const cargosFiltrados = this.listaCargos.filter((cargo:any) => !this.selectedItems.includes(cargo.departamento_id));
    //   // this.listaCargos = cargosFiltrados;
    // }

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

  onCheckboxChange1(item: any) {
    // const index = this.selectedItems1.findIndex((selectedItem) => selectedItem === item);
    
    // if (index > -1) {
    //   // Si el elemento ya estaba seleccionado, se elimina de la matriz selectedItems
    //   this.selectedItems1.splice(index, 1);
    //   console.log(this.selectedItems1)
    // } else {
    //   // Si el elemento no estaba seleccionado, se agrega a la matriz selectedItems
    //   this.selectedItems1.push(item);
    //   console.log(this.selectedItems1)
    // }

    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(!id) {
      const index = this.selectedItems1.findIndex((selectedItem) => selectedItem === item);
      console.log(index)
      if (index > -1) {
        this.selectedItems1.splice(index, 1);
        console.log(this.selectedItems1);
      } else {
        this.selectedItems1.push(item);
        console.log(this.selectedItems1);
      }
    } else {
      const indexNew = this.datos1.findIndex((selectedItem) => selectedItem === item);
      console.log(indexNew)
      if (indexNew > -1) {
        this.datos1.splice(indexNew, 1);
        console.log(this.datos1);
      } else {
        this.datos1.push(item);
        console.log(this.datos1);
      }
    }

  }

  onCheckboxChange2(item: any) {
    // const index = this.selectedItems2.findIndex((selectedItem) => selectedItem === item);
    
    // if (index > -1) {
    //   // Si el elemento ya estaba seleccionado, se elimina de la matriz selectedItems2
    //   this.selectedItems2.splice(index, 1);
    //   console.log(this.selectedItems2)
    // } else {
    //   // Si el elemento no estaba seleccionado, se agrega a la matriz selectedItems2
    //   this.selectedItems2.push(item);
    //   console.log(this.selectedItems2)
    // }

    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(!id) {
      const index = this.selectedItems2.findIndex((selectedItem) => selectedItem === item);
      console.log(index)
      if (index > -1) {
        this.selectedItems2.splice(index, 1);
        console.log(this.selectedItems2);
      } else {
        this.selectedItems2.push(item);
        console.log(this.selectedItems2);
      }
    } else {
      const indexNew = this.datos2.findIndex((selectedItem) => selectedItem === item);
      console.log(indexNew)
      if (indexNew > -1) {
        this.datos2.splice(indexNew, 1);
        console.log(this.datos2);
      } else {
        this.datos2.push(item);
        console.log(this.datos2);
      }
    }

  }

  guardarDatos() {
  
    let tipoPermiso_id = [], departamento_id = [], colaborador_id = [], datos = [];
    datos = this.datosDoc;
    console.log(datos);

    // const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
    // const userCells = document.querySelectorAll('table td.user');
    // const checkedUsers: string[] = [];
    
    // checkboxes.forEach((checkbox, index) => {
    //   if (checkbox.checked) {
    //     const userCell = userCells[index];
    //     const userName = userCell.textContent?.trim();
    //     if (userName) {
    //       checkedUsers.push(userName);
    //     }
    //   }
    // });
    // console.log(checkedUsers);

    console.log(this.selectedItems)
    console.log(this.selectedItems1)
    console.log(this.selectedItems2)
    
    if(datos && this.formDocumento.value.tipo > 0) {
      const formData = new FormData();
      formData.append('titulo' , this.formDocumento.value.titulo),
      formData.append('descripcionDoc' , this.formDocumento.value.descripcion),
      formData.append('tipoDocumento_id' , this.formDocumento.value.tipo),
      formData.append('usuario_id' , localStorage.getItem('id')!)
      ////formData.append('detalleDoc', JSON.stringify(datos))

      if(this.selectedItems) {
        formData.append('tipoPermisoD_id', '1'),
        formData.append('departamento_id', JSON.stringify(this.selectedItems))
      }
      if(this.selectedItems1) {
        formData.append('tipoPermisoC_id', '3'),
        formData.append('cargo_id', JSON.stringify(this.selectedItems1))
      }
      if(this.selectedItems2) {
        formData.append('tipoPermiso_id', '2'),
        formData.append('colaborador_id', JSON.stringify(this.selectedItems2))
      }

  
      this.documentoService.saveDocumentos(formData).subscribe((response) => {
  
        if(this.datosDoc) { 
          for (const itemDoc of this.datosDoc) {
            formData.append('descripcionDetalle' , itemDoc.descripcion),
            formData.append('lectura' , itemDoc.lectura),
            formData.append('fechaLimite' , itemDoc.fechaLimite),
            formData.append('nombreArchivo' , itemDoc.pdf),
             formData.append('url', itemDoc.urlPdf)
            formData.append('disponible' , itemDoc.disponible)
    
            this.documentoService.saveDetalleDocumentos(formData).subscribe((response) => {
              console.log(response);
              if(response.success == true) {
                this.datosPermisos = '';
                this.datosDoc = [];
                this.tipoPermiso_id = [];
                this.departamento_id = [];
                this.colaborador_id = [];
              }
            });
          } 
        }
        this.toastr.success('Documento registrado con éxito!', 'Éxito!');
        this.router.navigate(['dashboard/list-documentos']);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } else {
      this.toastr.warning('Debes agregar el documento ó el tipo de documento', 'Warning!');
    }
    
  }

  async cargar() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.id = id;
    //const idPerfil = localStorage.getItem('id');
    console.log(id)
    if (sessionStorage.getItem('reloaded') === 'true') {
      sessionStorage.setItem('reloaded', 'false');
    } else {
      sessionStorage.setItem('reloaded', 'true');
      // location.reload();
      window.location.reload();
    }
    if(id){
      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar Documento';
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false; 
      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = true; 
      //console.log(this.id)
        if(id) {
          //console.log(id)
          // this.documentoService.getDocumentoID(this.id).subscribe((response) => {
          //   this.docs = response.dataDB[0];
          //   //console.log(response.dataDB)
          //   this.formDocumento.patchValue(this.docs);
           
          //   this.documentoService.getTipoDocumentoID(response.dataDB[0].tipoDocumento_id).subscribe((res: any) => {
          //     //console.log(res)
          //     //console.log(res.dataDB)
          //     this.ngSelect = res.dataDB.id;
          //     //console.log(this.ngSelect) 
          //   });
          // });
          const res = await this.documentoService.getDocumentoID(this.id).toPromise();
          const response = await this.documentoService.getTipoDocumentoID(res.dataDB[0].tipoDocumento_id).toPromise();
          this.docs = res.dataDB[0];
          this.formDocumento.patchValue(this.docs);
          this.ngSelect = response.dataDB.id;
          const resp = await this.documentoService.getBuscarColaboradoresPermisos(this.id).toPromise();
            //console.log(resp.dataDB)
          const filteredArray = resp.dataDB.reduce((acc:any, item:any) => {
            Object.keys(item).forEach(key => {
              if (item[key] !== null) {
                const obj:any = {};
                obj[key] = item[key];
                acc.push(obj);
              }
            });
            return acc;
          }, []);
          //console.log(filteredArray);
          for (let index = 0; index < filteredArray.length; index++) {
            this.datos.push(filteredArray[index].departamento_id);
            this.datos1.push(filteredArray[index].cargo_id);
            this.datos2.push(filteredArray[index].colaborador_id);
          }
          this.datos = this.datos.filter(valor => valor !== undefined);
          this.datos1 = this.datos1.filter(valor => valor !== undefined);
          this.datos2 = this.datos2.filter(valor => valor !== undefined);
        
          console.log( this.datos)
        }
      
    }
    else {
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = true;
      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = false; 
      this.ngSelect = 'S';
    }
  }

  editar() {

    console.log(this.datosDoc)
    console.log(this.datosPermisos)
    const id = this.activeRoute.snapshot.paramMap.get('id');
    let tipoPermiso_id = [], departamento_id = [], colaborador_id = [], datos = [];
    datos = this.datosDoc;
    let today = new Date().toLocaleString();
    
    const formData = new FormData();
    formData.append('documento_id' , id!),
    formData.append('titulo' , this.formDocumento.value.titulo),
    formData.append('descripcion' , this.formDocumento.value.descripcion),
    formData.append('tipoDocumento_id' , this.formDocumento.value.tipo),
    formData.append('usuario_id' , localStorage.getItem('id')!),
    formData.append('updated_at' , today)
    //formData.append('detalleDoc', JSON.stringify(datos))

    // const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
    // const userCells = document.querySelectorAll('table td.user');
    // let checkedUsers: string[] = [];

    // checkboxes.forEach((checkbox, index) => {
    //   if (checkbox.checked) {
    //     const userCell = userCells[index];
    //     const userName = userCell.textContent?.trim();
    //     if (userName) {
    //       checkedUsers.push(userName);
    //     }
    //   }
    // });
    // console.log(checkedUsers);
    // formData.append('colaborador_id', checkedUsers.toString())

    console.log( this.datos)

    //if(this.datos) {
      formData.append('tipoPermisoD_id', '1'),
      formData.append('departamento_id', this.datos.toString())
    //}
    //if(this.datos1) {
      formData.append('tipoPermisoC_id', '3'),
      formData.append('cargo_id', this.datos1.toString())
    //}
    //if(this.datos2) {
      formData.append('tipoPermiso_id', '2'),
      formData.append('colaborador_id', this.datos2.toString())
    //}

    console.log(datos);
    this.documentoService.editarDocumentos(formData).subscribe((response) => {
      console.log(response)
      if(response.success == true) {
        this.documentoService.editarDetallePermiso(formData).subscribe((resp) => {
          console.log(resp)
        })

        if(this.datosDoc) {
          for (const itemDoc of this.datosDoc) {
            console.log(itemDoc)
            formData.append('id' , itemDoc.id),
            formData.append('descripcionDetalle' , itemDoc.descripcion),
            formData.append('lectura' , itemDoc.lectura),
            formData.append('fechaLimite' , itemDoc.fechaLimite),
            formData.append('nombreArchivo' , this.formDocumento.value.titulo),
            formData.append('url', itemDoc.urlPdf),
            formData.append('disponible' , itemDoc.disponible)
  
            
            this.documentoService.editarDetalleDocumentos(formData).subscribe((res) => {
              console.log(res);
              // if(response.success == true) {
                
              // }
            });
          } 
          
        } 
        this.datosPermisos = '';
        this.datosDoc = [];
        this.tipoPermiso_id = [];
        this.departamento_id = [];
        this.colaborador_id = [];
        this.toastr.success('Documento actualizado con éxito!', 'Éxito!');
        this.router.navigate(['dashboard/list-documentos']);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.toastr.warning('Ah ocurrido un error al editar este documento, recarga el navegador y vuelve a intentarlo nuevamente!', 'Advertencia!');
      }
    });   



  }

  // Función que se ejecuta cuando se produce un cambio en el estado del checkbox
  handleCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCheckboxCount++;
    } else {
      this.selectedCheckboxCount--;
    }
  }
  handleCheckboxChange1(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCheckboxCount1++;
    } else {
      this.selectedCheckboxCount1--;
    }
  }
  handleCheckboxChange2(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCheckboxCount2++;
    } else {
      this.selectedCheckboxCount2--;
    }
  }






}
