import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public datos: any[] = [];
  isLoading = false;

  @Output()
  enviarPath = new EventEmitter<any>()

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
        { "width": "15%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "10%", "targets": 5 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    
    this.loadColaborador();
    this.loadTipoDocumento();
    this.cargar();
    this.guardarMigracion();
  }

  loadTipoDocumento() {
    this.documentoService.getTipoDocumentos().subscribe((data: any) => {
      this.listaTipoDocumentos = data;
      this.ngSelect = 0;
      console.log(data)
    });
  }

  loadColaborador() {
    this.isLoading = true;
    this._colaboradorService.getCollaborator().subscribe((data: any) => {
      console.log(data.dataDB)
      this.listaColaboradores = data.dataDB;
      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 10);
    });
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

  guardarDatos() {
  
    let tipoPermiso_id = [], departamento_id = [], colaborador_id = [], datos = [];
    datos = this.datosDoc;
    console.log(datos);

    const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
    const userCells = document.querySelectorAll('table td.user');
    const checkedUsers: string[] = [];
    
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const userCell = userCells[index];
        const userName = userCell.textContent?.trim();
        if (userName) {
          checkedUsers.push(userName);
        }
      }
    });
    console.log(checkedUsers);
    
    if(datos && this.formDocumento.value.tipo > 0) {
      const formData = new FormData();
      formData.append('titulo' , this.formDocumento.value.titulo),
      formData.append('descripcionDoc' , this.formDocumento.value.descripcion),
      formData.append('tipoDocumento_id' , this.formDocumento.value.tipo),
      formData.append('usuario_id' , localStorage.getItem('id')!)
      ////formData.append('detalleDoc', JSON.stringify(datos))

      formData.append('tipoPermiso_id', '2'),
      formData.append('colaborador_id', JSON.stringify(checkedUsers))
  
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

 

  cargar() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.id = id;
    //const idPerfil = localStorage.getItem('id');
    console.log(id)
    if(id){
      
    if (sessionStorage.getItem('reloaded') === 'true') {
      sessionStorage.setItem('reloaded', 'false');
    } else {
      sessionStorage.setItem('reloaded', 'true');
      location.reload();
    }

      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar Documento';
      
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false; 
      
      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = true; 
      
      
      console.log(this.id)
      this.activeRoute.params.subscribe( e => {
        let id = e['id'];
        if(id) {
          console.log(id)
          this.documentoService.getDocumentoID(this.id).subscribe((response) => {
            this.docs = response.dataDB[0];
            console.log(response.dataDB)
            this.formDocumento.patchValue(this.docs);
           
            this.documentoService.getTipoDocumentoID(response.dataDB[0].tipoDocumento_id).subscribe((res: any) => {
              //console.log(res)
              console.log(res.dataDB)
              this.ngSelect = res.dataDB.id;
              //console.log(this.ngSelect)
            });
          });

          this.documentoService.getBuscarColaboradoresPermisos(this.id).subscribe((resp: any) => {
            //console.log(resp.dataDB)
            for (let index = 0; index < resp.dataDB.length; index++) {
              this.datos.push(resp.dataDB[index].colaborador_id);
            }
            //console.log(this.datos)
          });

        }
      });
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

    const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
    const userCells = document.querySelectorAll('table td.user');
    let checkedUsers: string[] = [];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const userCell = userCells[index];
        const userName = userCell.textContent?.trim();
        if (userName) {
          checkedUsers.push(userName);
        }
      }
    });
    console.log(checkedUsers);
    formData.append('colaborador_id', checkedUsers.toString())

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


  
      // if(this.datosPermisos) {
      //   for (const itemPer of this.datosPermisos) {
      //     console.log(itemPer);
      //     tipoPermiso_id.push(parseInt(itemPer.tipoPermiso_id));
      //     departamento_id.push(parseInt(itemPer.departamento_id));
      //     colaborador_id.push(parseInt(itemPer.colaborador_id));
      //   }
    
      //   formData.append('tipoPermiso_id' , JSON.stringify(tipoPermiso_id)),
      //   formData.append('departamento_id', JSON.stringify(departamento_id)),
      //   formData.append('colaborador_id', JSON.stringify(colaborador_id))
      // }

    // if(this.datosPermisos) {
    //   for (const itemPer of this.datosPermisos) {
    //     console.log(itemPer);
    //     tipoPermiso_id.push(parseInt(itemPer.tipoPermiso_id));
    //     departamento_id.push(parseInt(itemPer.departamento_id));
    //     colaborador_id.push(parseInt(itemPer.colaborador_id));
    //     formData.append('permiso_id' , itemPer.permiso_id)
    //     formData.append('idDetallePermiso' , itemPer.idDetallePermiso)
    //     formData.append('documento_id' , id!)
    //   }

    //   formData.append('tipoPermiso_id' , JSON.stringify(tipoPermiso_id)),
    //   formData.append('departamento_id', JSON.stringify(departamento_id)),
    //   formData.append('colaborador_id', JSON.stringify(colaborador_id))
    // } 





    guardarMigracion() {
     
 
    }





}
