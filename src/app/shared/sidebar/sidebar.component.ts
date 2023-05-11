import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 

  constructor(public colaboradorService: ColaboradorService, private documentoService: DocumentoService,  private router: Router,private datePipe: DatePipe) {

    

  }

 /* Estas son declaraciones de variables en TypeScript. */
  permisos = 0;
  listaDocumentos:any = [];
  nombre: any;
  archivoUrl!: any;
  id: any;
  departamento_id: any;
  Pdocumento_id: any = [];
  Pdepartamento: any = [];
  Puser: any = [];

  pdfNombre!: string;
  fecha: any;

  
  /**
   * La función ngOnInit recupera la identificación del usuario del almacenamiento local, obtiene sus
   * permisos y la identificación del departamento del servicio del colaborador y enumera sus
   * documentos mientras inicializa el componente.
   */
  ngOnInit(): void {
    const Id = localStorage.getItem('id');
    new Promise(resolve => resolve(this.colaboradorService.getColaboradorID(parseInt(Id!)).subscribe((res) => {
      this.permisos = res.dataDB.cargo_id;
      this.departamento_id = res.dataDB.departamento_id;
      console.log(this.departamento_id)
      console.log(this.permisos)
    })));
    this.listarDocumentos();
    //this.obtenerPermisos();
  }
  
  /**
   * La función recupera una lista de documentos de un servicio y la asigna a una variable local.
  */
 listarDocumentos() {
    let today = new Date();
    const fechaFormateada = this.datePipe.transform(today, 'yyyy-MM-dd HH:mm:ss');
    this.fecha = fechaFormateada;
    console.log(this.fecha)
    // 2023-04-26 11:30:00

    this.id = localStorage.getItem('id');
    new Promise(resolve => resolve(this.documentoService.getDocumentos().subscribe((res) => {
      this.listaDocumentos = res.dataDB;
      console.log(this.listaDocumentos)
    })));
  }
  /**
   * La función obtiene permisos para un documento de un servicio y los asigna a las variables.
   */
  obtenerPermisos() {
    new Promise(resolve => resolve(this.documentoService.getPermisos().subscribe((res) => {
      console.log(res.dataDB);
      for (let index = 0; index < res.dataDB.length; index++) {
        //this.Pdocumento_id.push(res.dataDB[index].documento_id);
        this.Pdepartamento.push(res.dataDB[index].departamento_id);
        this.Puser.push(res.dataDB[index].colaborador_id);
      }

      console.log(this.Pdocumento_id)
      console.log(this.Pdepartamento)
      console.log(this.Puser)
    })));
  }

 /**
  * La función "cargarPDF" navega a una ruta específica en la aplicación con un nombre de archivo
  * determinado.
  * @param {any} nombre - El parámetro "nombre" es de tipo "cualquiera", lo que significa que puede
  * aceptar cualquier tipo de dato como entrada. Es probable que se use para representar el nombre o el
  * identificador de un archivo PDF que debe cargarse o mostrarse en la aplicación. La función
  * "cargarPDF" navega a una ruta específica
  */
  cargarPDF(nombre: any){
    sessionStorage.setItem('reloaded', 'true');
    this.router.navigate(['/dashboard/blank']);
    setTimeout(() => {
      this.router.navigate(['/dashboard/archivo', nombre]);
      console.log(nombre)
  }, 1500);
  }

  

 
  
}
