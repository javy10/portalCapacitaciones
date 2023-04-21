import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentoService } from 'src/app/services/documento.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  
  /* `@ViewChild('myFrame') myFrame: any;` es un decorador que permite que el componente acceda a un
  componente o elemento secundario. En este caso, se utiliza para acceder a un elemento HTML con el
  ID "myFrame". */
  @ViewChild('myFrame') myFrame: any;
  archivo: File | null = null;
  saveArchivo: any;
  archivoUrl!: any;
  pdfSrc!: string | ArrayBuffer;

  constructor(private documentoService: DocumentoService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerArchivoSidebar();
  }
  /**
   * Esta función obtiene un archivo PDF de un servicio y lo muestra en una vista previa en la página
   * web.
   */
  obtenerArchivoSidebar() {
    const nombre = this.activeRoute.snapshot.paramMap.get('nombre');
    this.documentoService.getDocumentoURL(nombre).subscribe((data: any) => {
      const archivoPrevisualizacion = document.querySelector("#filePDF") as HTMLInputElement;
      let binaryData = [];
      binaryData.push(data); 
      let foo = URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
      console.log(foo);
      if(data){
        archivoPrevisualizacion.src = foo;
      }
    });      
  }
}
