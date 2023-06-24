
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DocumentoService } from 'src/app/services/documento.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dtarchivodocumentos',
  templateUrl: './dtarchivodocumentos.component.html',
  styleUrls: ['./dtarchivodocumentos.component.css']
})
export class DtarchivodocumentosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  @ViewChild('myFrame') myFrame: any;

  @Output()
  eventoEnviarDataDoc = new EventEmitter<any>()

  @Input()
  idDoc: any;

  
  data: any;
  listaDocumentos: any = [];
  archivo: File | null = null;
  ngSelectL: any;
  ngSelectD: any;
  formDocumento!: FormGroup;
  saveArchivo: any;
  docs: any;
  detalledocs: any;
  archivodocs: any;
  descripcionn!: string;
  lecturaa!: any;
  fechaLimitee!: string;
  selectedValue!: any;
  isLoading = false;
  idDocumento: any;
  idDetalleDoc:any;
  
  
  

  constructor(private documentoService: DocumentoService, private fb:FormBuilder, private http: HttpClient, private datePipe: DatePipe) {
    this.formDocumento = this.fb.group({
      'pdf': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'lectura': ['', Validators.required],
      'disponible': ['', Validators.required],
      // 'fechaLimite': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.idDoc)
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "25%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "20%", "targets": 3 },
        { "width": "15%", "targets": 4 },
        { "width": "10%", "targets": 5 },
        { "width": "25%", "targets": 6 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.listaDocumentos = [];
    this.loadDetalleDoc();
    this.ngSelectL = 'S';
    this.ngSelectD = 'S';

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  get pdf() {
    return this.formDocumento.get('pdf') as FormControl;
  }
  get descripcion() {
    return this.formDocumento.get('descripcion') as FormControl;
  }
  get lectura() {
    return this.formDocumento.get('lectura') as FormControl;
  }
  get disponible() {
    return this.formDocumento.get('disponible') as FormControl;
  }

  changeArchivo(event: any) {
    this.archivo = event.target.files[0];
    console.log(this.archivo)
    const seleccionArchivos = document.querySelector("#pdf") as HTMLInputElement;
    const archivoPrevisualizacion = document.querySelector("#filePDF") as HTMLInputElement;
    // Los archivos seleccionados, pueden ser muchos o uno
    const archivos = seleccionArchivos.files;
    //console.log(archivos)
    // Si no hay archivos salimos de la función y quitamos la imagen
    if (!archivos || !archivos.length) {
      archivoPrevisualizacion.src = "";
      return;
    }
    // Ahora tomamos el primer archivo, el cual vamos a previsualizar
    const primerArchivo = archivos[0];
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo);
    // Y a la fuente de la imagen le ponemos el objectURL
    archivoPrevisualizacion.src = objectURL;
    this.saveArchivo = objectURL;
    console.log(this.saveArchivo)
  }

  cargar(){
    this.isLoading = true;
    

    console.log(this.listaDocumentos)

    // for (let index = 0; index < this.listaDocumentos.length; index++) {
      //const element = this.listaDocumentos[index];
      let registroExistente;
      registroExistente = '';
      registroExistente = this.listaDocumentos.find((registro:any) => registro.disponible == 'S' && this.formDocumento.value.disponible == 'S');
      console.log(registroExistente)

      //const registroExistente = registros.find(registro => registro.id === nuevoRegistro.id);
      if(registroExistente) {
        Swal.fire({
          //position: 'center',
          icon: 'warning',
          title: 'Solo puede haber un documento disponible',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          showConfirmButton: true,
        });
      } else {

        console.log(this.archivo)
        let fechaFormateada = '';

        const fechaLimite = document.querySelector("#fechaLimite") as HTMLInputElement;
        console.log(fechaLimite.value.trim().length)
      
        if(fechaLimite.value != '' && fechaLimite.value != null && fechaLimite.value.trim().length != 0) {
          let fechaObj = new Date(fechaLimite.value);
          fechaFormateada = this.datePipe.transform(fechaObj, 'yyyy-MM-dd HH:mm:ss')!;
          //console.log('Hola')
        }
        let fechaFormateadaHoy = '';
        let today = new Date();
        const fechaISO = today.toISOString();
        let fechaHoy = new Date(fechaISO)
        fechaFormateadaHoy = this.datePipe.transform(fechaHoy, 'yyyy-MM-dd HH:mm:ss')!;
    
        let cadena = this.formDocumento.value.pdf;
        const partes = cadena.split('\\');
        const nombre = partes[2]
        this.docs = {
          'descripcion': this.formDocumento.value.descripcion,
          'actualizado': fechaFormateadaHoy,
          'lectura': this.formDocumento.value.lectura,
          'fechaLimite': fechaFormateada,
          'pdf' : nombre,
          'disponible': this.formDocumento.value.disponible,
          'urlPdf': this.archivo
        }
    
        this.listaDocumentos.push(this.docs);
        this.docs = '';
        // setTimeout(() => {
        //   this.dtTrigger.next(0);
        // }, 500);
        
        this.isLoading = false;
        this.cancelar();
        console.log(this.listaDocumentos)
    
        this.enviarDatos(this.listaDocumentos);
      }
      
    //}

  }

  cancelar() {
    const fechaLimite = document.querySelector("#fechaLimite") as HTMLInputElement;
    const descripcion = document.querySelector("#descripcionDoc") as HTMLInputElement;
    const pdf = document.querySelector("#pdf") as HTMLInputElement;
    let iframe = this.myFrame.nativeElement;
    if (iframe) {
      let doc = iframe.contentDocument;
      if (doc) {
        doc.body.innerHTML = '';
      }
      iframe.src = 'about:blank';
    }
    this.ngSelectL = 'S';
    this.ngSelectD = 'S';
    fechaLimite.value = ''
    pdf.value = ''
    descripcion.value = ''
  }

  enviarDatos(listaDocumentos:any) {
    console.log(listaDocumentos)
    this.eventoEnviarDataDoc.emit(listaDocumentos);
  }

  deshabilitar(id:any) {
    Swal.fire({
      title: 'Estás seguro de deshabilitar éste documento?',
      text: "El Documento ya no aparecera en el Portal de Capacitaciones!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, seguro!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        new Promise(resolve => resolve(this.documentoService.eliminarDetalledocumentos(id).subscribe((response) => {
          Swal.fire(
            'Deshabilitado!',
            'Documento deshabilitado con éxito.',
            'success'
          )
        })));
        this.loadDetalleDoc();
      }
    });
  }

  eliminar(item: any) {
    // Eliminar el elemento con valor 3 sin modificar el array original
    // Eliminar el elemento con valor 3
    const indice = this.listaDocumentos.indexOf(item);
    if (indice !== -1) {
      this.listaDocumentos.splice(indice, 1);
    }
    console.log(this.listaDocumentos);
  }

  loadDetalleDoc() {
    if(this.idDoc){
      this.detalledocs = {}
      this.listaDocumentos = [];
      console.log(this.idDoc)
      this.documentoService.getDetalleDocumentoID(this.idDoc).subscribe((data: any) => {
        console.log(data)
        this.idDocumento = data.dataDB[0].documento_id;
        console.log(this.idDocumento);
        //this.idDetalleDoc = data.dataDB[0].id;
        for (let index = 0; index < data.dataDB.length; index++) {
          const element = data.dataDB[index];
          this.detalledocs = {
            'id': data.dataDB[index].id,
            'documento_id': data.dataDB[index].documento_id,
            'descripcion': data.dataDB[index].descripcion,
            'actualizado': data.dataDB[index].updated_at,
            'lectura': data.dataDB[index].lectura,
            'fechaLimite': data.dataDB[index].fechaLimite,
            'disponible': data.dataDB[index].disponible,
          }
          this.listaDocumentos.push(this.detalledocs);
        }
      });
    }
  }
 
  filaSeleccionada:any;
  idDocu:any;

  datosArchivo(id:number) {
    
    console.log(id)
    this.idDocu = id;
    const filas = document.querySelectorAll('table tr');

    // Recorre las filas y agrega el evento de clic
    filas.forEach((fila, indice) => {
      fila.addEventListener('click', (event) => {
        // Aquí obtienes el índice de la fila seleccionada
        console.log('Índice de fila seleccionada:', indice);
        //this.filaSeleccionada = indice;
        this.filaSeleccionada = (event.target as HTMLTableRowElement).closest('tr');
      });
    });

    new Promise(resolve => resolve( this.documentoService.getDocumentoDetalleID(id).subscribe((data: any) => {
      console.log(data.dataDB)
      this.idDetalleDoc = data.dataDB[0].id;
      const btnGuardar = document.getElementById('btnAceptar');
      btnGuardar!.hidden = true;
      
      const btnEdit = document.getElementById('btnEditar');
      btnEdit!.hidden = false;

      this.archivodocs = {
        // 'pdf': data.dataDB[0].nombreArchivo,
        'descripcion': data.dataDB[0].descripcion,
        'fechaLimite': data.dataDB[0].fechaLimite,
      }
      this.ngSelectL = data.dataDB[0].lectura == 'S' ? 'S' : 'N';
      this.ngSelectD = data.dataDB[0].disponible == 'S' ? 'S' : 'N';
      this.formDocumento.patchValue(this.archivodocs);
      this.archivodocs = '';
      

      this.documentoService.getDocumentoURL(data.dataDB[0].nombreArchivo).subscribe((datos: any) => {
        console.log(datos);
        setTimeout(() => {
          const archivoPrevisualizacion = document.querySelector("#filePDF") as HTMLInputElement;
          let binaryData = [];
          binaryData.push(datos); 
          let foo = URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
          archivoPrevisualizacion.src = foo;

          const fecha = document.getElementById('fechaLimite') as HTMLInputElement;
          fecha.value = data.dataDB[0].fechaLimite;

          // const blob = new Blob([foo], { type: 'text/plain' });
          // const archivo = new File([blob], data.dataDB[0].nombreArchivo, { type: 'text/plain' });

          // const input = document.getElementById('pdf') as HTMLInputElement;
          // input.value += archivo;
          //this.iframeCargado();
        }, 100);
      });
    })));
  }


  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // Aquí se pueden realizar las operaciones necesarias con los archivos
    }
  }

  editar() {

    let registroExistente;
    registroExistente = '';
    registroExistente = this.listaDocumentos.find((registro:any) => registro.disponible == 'S' && this.formDocumento.value.disponible == 'S');
    console.log(registroExistente)
    //console.log(registroExistente.disponible)
    if(registroExistente && registroExistente.length > 1){
      console.log('Hola')
    } else {
      console.log('No')
    }

    if(registroExistente && registroExistente.length > 1) {
      Swal.fire({
        //position: 'center',
        icon: 'warning',
        title: 'Solo puede haber un documento disponible',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        showConfirmButton: true,
      });
    } else {

      console.log( this.detalledocs)

      console.log(this.filaSeleccionada)

      const tabla = document.getElementById('miTabla') as HTMLTableElement;

      const celdas = this.filaSeleccionada.querySelectorAll('td');
      console.log(celdas)

      let fechaFormateadaHoy = '';
      let today = new Date();
      //console.log(today)
      const fechaISO = today.toISOString();
      //console.log(fechaISO)
      let fechaHoy = new Date(fechaISO)
      fechaFormateadaHoy = this.datePipe.transform(fechaHoy, 'yyyy-MM-dd HH:mm:ss')!;

      let fechaFormateada = '';
      const fechaLimite = document.querySelector("#fechaLimite") as HTMLInputElement;
      console.log(fechaLimite.value.trim().length)
    
      if(fechaLimite.value != '' && fechaLimite.value != null && fechaLimite.value.trim().length != 0) {
        let fechaObj = new Date(fechaLimite.value);
        fechaFormateada = this.datePipe.transform(fechaObj, 'yyyy-MM-dd HH:mm:ss')!;
        //console.log('Hola')
      }

      const descripcion = this.formDocumento.value.descripcion;
      const lectura = this.formDocumento.value.lectura;
      const disponible = this.formDocumento.value.disponible;

      celdas[1].innerHTML = descripcion;
      celdas[2].innerHTML = fechaFormateadaHoy;
      celdas[3].innerHTML = fechaFormateada;
      celdas[4].innerHTML = lectura == 'S' ? 'Si' : 'No';
      celdas[5].innerHTML = disponible == 'S' ? 'Si' : 'No';

      const indiceObjeto = this.listaDocumentos.findIndex((objeto:any) => objeto.id === this.idDocu);

      if (indiceObjeto !== -1) {
        this.listaDocumentos[indiceObjeto].id = this.idDetalleDoc;
        this.listaDocumentos[indiceObjeto].descripcion = this.formDocumento.value.descripcion;
        this.listaDocumentos[indiceObjeto].actualizado = fechaFormateadaHoy;
        this.listaDocumentos[indiceObjeto].lectura = this.formDocumento.value.lectura;
        this.listaDocumentos[indiceObjeto].fechaLimite = fechaFormateada;
        this.listaDocumentos[indiceObjeto].pdf = '';
        this.listaDocumentos[indiceObjeto].disponible = this.formDocumento.value.disponible;
        if(this.archivo != null) {
          this.listaDocumentos[indiceObjeto].urlPdf = this.archivo;
        } else {
          this.listaDocumentos[indiceObjeto].urlPdf = null;
        }
      }
      console.log(this.listaDocumentos)
    
      this.enviarDatos(this.listaDocumentos);

      const btnGuardar = document.getElementById('btnAceptar');
      btnGuardar!.hidden = false;
      
      const btnEdit = document.getElementById('btnEditar');
      btnEdit!.hidden = true;

    }


  }
  


}
