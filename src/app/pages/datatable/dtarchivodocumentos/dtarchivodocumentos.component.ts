
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DocumentoService } from 'src/app/services/documento.service';
import { DatePipe } from '@angular/common';


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
    this.ngSelectL = 0;
    this.ngSelectD = 0;

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
  // get fechaLimite() {
  //   return this.formDocumento.get('fechaLimite') as FormControl;
  // }

  // loadDocumento() {
  //   return this.documentoService.getDocumentos().subscribe((data: any) => {
  //     this.listaDocumentos = data.dataDB;
  //     this.dtTrigger.next(0);
  //     console.log(data.dataDB);
  //   });
  // }

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
    console.log(this.archivo)
    let fechaFormateada = '';

    const fechaLimite = document.querySelector("#fechaLimite") as HTMLInputElement;
    console.log(fechaLimite.value)
   
    if(fechaLimite.value != '' && fechaLimite.value != null) {
      let fechaObj = new Date(fechaLimite.value);
      fechaFormateada = this.datePipe.transform(fechaObj, 'yyyy-MM-dd HH:mm:ss')!;
      console.log('Hola')
    }

    let today = new Date().toLocaleString();

    let cadena = this.formDocumento.value.pdf;
    const partes = cadena.split('\\');
    const nombre = partes[2]
    this.docs = {
      'descripcion': this.formDocumento.value.descripcion,
      'actualizado': today,
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

  cancelar() {
    const fechaLimite = document.querySelector("#fechaLimite") as HTMLInputElement;
    const descripcion = document.querySelector("#descripcion") as HTMLInputElement;
    const pdf = document.querySelector("#pdf") as HTMLInputElement;
    let iframe = this.myFrame.nativeElement;
    if (iframe) {
      let doc = iframe.contentDocument;
      if (doc) {
        doc.body.innerHTML = '';
      }
      iframe.src = 'about:blank';
    }
    this.ngSelectL = 0;
    this.ngSelectD = 0;
    fechaLimite.value = ''
    pdf.value = ''
    descripcion.value = ''
  }

  enviarDatos(listaDocumentos:any) {
    console.log(listaDocumentos)
    this.eventoEnviarDataDoc.emit(listaDocumentos);
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

  async loadDetalleDoc() {
    if(this.idDoc){
      return  await new Promise(resolve => resolve( this.documentoService.getDetalleDocumentoID(this.idDoc).subscribe((data: any) => {
        console.log(data)
        this.idDocumento = data.dataDB[0].documento_id;
        console.log(this.idDocumento);
        this.detalledocs = {
          'documento_id': data.dataDB[0].documento_id,
          'descripcion': data.dataDB[0].descripcion,
          'actualizado': data.dataDB[0].updated_at,
          'lectura': data.dataDB[0].lectura,
          'fechaLimite': data.dataDB[0].fechaLimite,
          'disponible': data.dataDB[0].disponible,
        }
        this.listaDocumentos.push(this.detalledocs);
      })));
    }
  } 

  datosArchivo(id:number) {
    new Promise(resolve => resolve( this.documentoService.getDetalleDocumentoID(id).subscribe((data: any) => {
      console.log(data.dataDB)
    
      this.archivodocs = {
        // 'pdf': data.dataDB[0].nombreArchivo,
        'descripcion': data.dataDB[0].descripcion,
        'fechaLimite': data.dataDB[0].fechaLimite,
      }
      this.ngSelectL = data.dataDB[0].lectura == '0' ? 0 : 1;
      this.ngSelectD = data.dataDB[0].disponible == '0' ? 0 : 1;
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
  


}
