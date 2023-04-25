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
  nombre = this.activeRoute.snapshot.paramMap.get('nombre');
  reloaded = sessionStorage.getItem('reloaded');
  isLoading = false;

  constructor(private documentoService: DocumentoService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.obtenerArchivoSidebar();
  }
  /**
   * Esta función obtiene un archivo PDF de un servicio y lo muestra en una vista previa en la página
   * web.
   */
  obtenerArchivoSidebar() {
    this.isLoading = true;
    if (this.reloaded) {
      sessionStorage.removeItem('reloaded');
      //console.log(this.nombre)
      this.documentoService.getDocumentoURL(this.nombre).subscribe((data: any) => {
        //console.log(foo);
        if(data){
          this.isLoading = false;
        }
        setTimeout(() => {
          const archivoPrevisualizacion = document.querySelector("#filePDF") as HTMLInputElement;
          let binaryData = [];
          binaryData.push(data); 
          let foo = URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
          archivoPrevisualizacion.src = foo;
          this.iframeCargado();
        }, 100);
      });
      
    } else {
      sessionStorage.setItem('reloaded', 'true');
      location.reload();
    }
  }

  iframeCargado() {
    const iframe: HTMLIFrameElement = document.querySelector('.iframe-desvanecer')!;
    iframe.classList.add('cargando');
  }
}
