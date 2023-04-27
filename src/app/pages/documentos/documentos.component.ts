import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  tipoPermiso_id: [] = [];
  departamento_id: [] = [];
  colaborador_id: [] = [];

  path: any;

  @Output()
  enviarPath = new EventEmitter<any>()

  constructor(public fb:FormBuilder, private documentoService:DocumentoService, private router: Router, private activeRoute: ActivatedRoute) {
    this.formDocumento = this.fb.group({
      'tituloD': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'tipo': ['', Validators.required],
    })
  }

  get tituloD() {
    return this.formDocumento.get('tituloD') as FormControl;
  }
  get descripcion() {
    return this.formDocumento.get('descripcion') as FormControl;
  }
  get tipo() {
    return this.formDocumento.get('tipo') as FormControl;
  }

  ngOnInit(): void {
    this.loadTipoDocumento();
    
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

  async guardarDatos() {
  
    let tipoPermiso_id = [], departamento_id = [], colaborador_id = [], datos = [];
    datos = this.datosDoc;
    
    const formData = new FormData();
    formData.append('titulo' , this.formDocumento.value.tituloD),
    formData.append('descripcion' , this.formDocumento.value.descripcion),
    formData.append('tipoDocumento_id' , this.formDocumento.value.tipo),
    formData.append('usuario_id' , localStorage.getItem('id')!),

    formData.append('detalleDoc', JSON.stringify(datos))
    console.log(datos);

    for (const itemPer of this.datosPermisos) {
      console.log(itemPer);
      tipoPermiso_id.push(parseInt(itemPer.tipoPermiso_id));
      departamento_id.push(parseInt(itemPer.departamento_id));
      colaborador_id.push(parseInt(itemPer.colaborador_id));
    }

    formData.append('tipoPermiso_id' , JSON.stringify(tipoPermiso_id)),
    formData.append('departamento_id', JSON.stringify(departamento_id)),
    formData.append('colaborador_id', JSON.stringify(colaborador_id))


    for (const itemDoc of this.datosDoc) {
      formData.append('descripcionDetalle' , itemDoc.descripcion),
      formData.append('lectura' , itemDoc.lectura),
      formData.append('fechaLimite' , itemDoc.fechaLimite),
      formData.append('nombreArchivo' , itemDoc.pdf),
      formData.append('url', itemDoc.urlPdf),
      formData.append('disponible' , itemDoc.disponible)
      
      await new Promise(resolve => resolve(this.documentoService.saveDocumentos(formData).subscribe((response) => {
        console.log(response);
        this.datosPermisos = '';
        this.datosDoc = [];
        this.tipoPermiso_id = [];
        this.departamento_id = [];
        this.colaborador_id = [];
        // this.enviarPath.emit(response.path);
      })));
    }

    Swal.fire({
      //position: 'center',
      icon: 'success',
      title: 'Documento registrado con éxito',
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
        //window.location.reload();
        this.router.navigate(['dashboard/list-documentos']);
      }
    });
  }
}
