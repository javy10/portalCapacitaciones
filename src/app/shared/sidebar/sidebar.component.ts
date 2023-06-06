import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';
import { MenuService } from 'src/app/services/menu.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 

  constructor(
    public colaboradorService: ColaboradorService, 
    private documentoService: DocumentoService,  
    private router: Router,
    private datePipe: DatePipe, 
    private menuService: MenuService, 
    private evaluacionService: EvaluacionesService) {

  }

 /* Estas son declaraciones de variables en TypeScript. */
  permisos = 0;
  listaDocumentos:any = [];
  listaMenus:any = [];
  nombre: any;
  archivoUrl!: any;
  id: any;
  departamento_id: any;
  cargo_id: any;
  Pdocumento_id: any = [];
  Pdepartamento: any = [];
  Puser: any = [];
  pdfNombre!: string;
  fecha: any;
  fechaActual = new Date();
  habilitarEvaluacion:any = false;

// users
  ucargo_id:any;
  udepart_id:any;
  uuser_id:any;  

// detalle
  listaDetalle:any=[];
  idCargo:any;
  idDepar:any;
  idUser:any;
  idMenu:any;

  listaDetalleEvaluacion:any = [];
  
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
    this.loadDetalle();
    this.obtenerDetalleEvaluacion();
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

  loadDetalle() {
    const Id = localStorage.getItem('id');
    console.log(Id)
    
    this.colaboradorService.getColaboradorID(parseInt(Id!)).subscribe((res) => {
      this.departamento_id = res.dataDB.departamento_id;

      const formData = new FormData();
      formData.append('id', Id!.toString()),
      formData.append('idDepart', this.departamento_id),
      
      console.log(this.departamento_id)
  
      this.menuService.getDetallePermiso(formData).subscribe((data: any) => {
        this.listaDetalle = data;
        console.log(this.listaDetalle)
        console.log(this.listaDetalle[0].menu_id)
        console.log(data)
        for (let index = 0; index < this.listaDetalle.length; index++) {
          const element = this.listaDetalle[index];
          //console.log(element)
          this.idCargo = this.listaDetalle[index].cargo_id;
          this.idDepar = this.listaDetalle[index].departamento_id;
          this.idUser = this.listaDetalle[index].colaborador_id;
          this.idMenu = this.listaDetalle[index].menu_id;
    
          console.log(this.listaDetalle[index].cargo_id)
          console.log(this.listaDetalle[index].departamento_id)
          console.log(this.listaDetalle[index].colaborador_id)
          console.log(this.listaDetalle[index].menu_id)
        }
      });
    });
  }

  obtenerDetalleEvaluacion() {
    const Id = localStorage.getItem('id');

    this.evaluacionService.getObtenerDetalleGrupoEvaluacion(parseInt(Id!)).subscribe((res) => {
      this.listaDetalleEvaluacion = res.dataDB;
      console.log(this.listaDetalleEvaluacion)
      console.log(this.fechaActual)

      const fechaDB = this.fechaActual;
      const fecha = new Date(fechaDB);
      const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd HH:mm:ss');
      console.log(fechaFormateada);

      for (let index = 0; index < this.listaDetalleEvaluacion.length; index++) {
        //const element = this.listaDetalleEvaluacion[index];
        if(fechaFormateada! >= this.listaDetalleEvaluacion[index].apertura && fechaFormateada! <= this.listaDetalleEvaluacion[index].cierre && this.listaDetalleEvaluacion[index].intentos > 0) {
          console.log('Hola')
          this.habilitarEvaluacion = true;
        } else {
          this.habilitarEvaluacion = false;
        }
         
      }
    });
  }
   
}
