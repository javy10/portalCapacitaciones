import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit{

  listaTipoDocumentos:any=[];
  formDocumento: FormGroup;
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

  @Output()
  enviarPath = new EventEmitter<any>()

  constructor(public fb:FormBuilder, private documentoService:DocumentoService, private router: Router, private activeRoute: ActivatedRoute, private toastr: ToastrService,) {
    this.formDocumento = this.fb.group({
      'titulo': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'tipo': ['', Validators.required],
    })
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

  ngOnInit(): void {
    this.loadTipoDocumento();
    this.cargar();
    this.guardarMigracion();
  }

  async loadTipoDocumento() {
    return  await new Promise(resolve => resolve( this.documentoService.getTipoDocumentos().subscribe((data: any) => {
      this.listaTipoDocumentos = data;
      this.ngSelect = 0;
      console.log(data)
    })));
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
    
    if(datos && this.formDocumento.value.tipo > 0) {
      const formData = new FormData();
      formData.append('titulo' , this.formDocumento.value.titulo),
      formData.append('descripcionDoc' , this.formDocumento.value.descripcion),
      formData.append('tipoDocumento_id' , this.formDocumento.value.tipo),
      formData.append('usuario_id' , localStorage.getItem('id')!)
      ////formData.append('detalleDoc', JSON.stringify(datos))
  
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
          this.toastr.success('Documento registrado con éxito!', 'Éxito!');
          this.router.navigate(['dashboard/list-documentos']);
        }
      });
    } else {
      this.toastr.warning('Debes agregar el documento ó el tipo de documento', 'Warning!');
    }
    
  }

  cargar() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.id = id;
    //const idPerfil = localStorage.getItem('id');
    if(id){
      const titulo = document.getElementById('title');
      titulo!.innerHTML = 'Editar Documento';
      
      const btnGuardar = document.getElementById('btnGuardar');
      btnGuardar!.hidden = true;
      
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = false;
      
      console.log(this.id)
      // this.activeRoute.params.subscribe( e => {
      //   let id = e['id'];
      //   if(id) {
          new Promise(resolve => resolve(this.documentoService.getDocumentoID(this.id).subscribe((response) => {
            this.docs = response.dataDB;
            console.log(response)
            this.formDocumento.patchValue(this.docs);

            this.documentoService.getTipoDocumentoID(response.dataDB.tipoDocumento_id).subscribe((res: any) => {
              console.log(res)
              this.ngSelect = res.dataDB.id;
            });
          })));
        // }
      // });
    }
    else {
      const btnEdit = document.getElementById('btnActualizar');
      btnEdit!.hidden = true;
      this.ngSelect = 0;
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
    formData.append('updated_at' , today),
    //formData.append('detalleDoc', JSON.stringify(datos))
    console.log(datos);
    this.documentoService.editarDocumentos(formData).subscribe((response) => {
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
          
          this.documentoService.editarDetalleDocumentos(formData).subscribe((response) => {
            console.log(response);
            // if(response.success == true) {
              
            // }
          });
        } 
        this.datosPermisos = '';
        this.datosDoc = [];
        this.tipoPermiso_id = [];
        this.departamento_id = [];
        this.colaborador_id = [];
        // Swal.fire({
        //   //position: 'center',
        //   icon: 'success',
        //   title: 'Documento actualizado con éxito',
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
            
        //     this.router.navigate(['dashboard/list-documentos']);
        //     //window.location.reload();
        //   }
        // });

        this.toastr.success('Documento actualizado con éxito!', 'Éxito!');
        this.router.navigate(['dashboard/list-documentos']);
      } 
    });   



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
