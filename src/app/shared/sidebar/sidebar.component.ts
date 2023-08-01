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

  
  @Input() datosUsuario: any;
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
  listadoEvaluaciones:any = [];

  cargos:any=[];
  departamentos:any=[];
  menus:any=[];

  Id:any;

  ngOnInit(): void {
    this.Id = parseInt(localStorage.getItem('id')!);
    console.log(this.Id)
    
    this.habilitarEvaluacion = false;
    setTimeout(() => {
      this.obtenerColaboradorID(this.Id!)
    }, 2500);
  }
  
  async obtenerColaboradorID(id: number) {
    try {
      //console.log(this.datosUsuario)
      // this.permisos = this.datosUsuario[0].cargo_id;
      // this.departamento_id = this.datosUsuario[0].departamento_id;

      for (let index = 0; index < this.datosUsuario.length; index++) {
        const element = this.datosUsuario[index].cargo_id;
        this.cargos.push(this.datosUsuario[index].cargo_id)
        this.departamentos.push(this.datosUsuario[index].departamento_id)
      }
      // console.log(this.cargos)
      // console.log(this.departamentos)

      this.permisos = this.datosUsuario[0].cargo_id;
      this.departamento_id = this.datosUsuario[0].departamento_id;
      
      this.loadDetalle();
      this.obtenerDetalleEvaluacion();
      this.obtenerDetalleEvaluacionAbierta();
      this.obtenerEvaluaciones();
 
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
    }
  }


  // obtenerPermisos() {
  //   this.documentoService.getPermisos().subscribe((res) => {
  //     //console.log(res.dataDB);
  //     for (let index = 0; index < res.dataDB.length; index++) {
  //       //this.Pdocumento_id.push(res.dataDB[index].documento_id);
  //       this.Pdepartamento.push(res.dataDB[index].departamento_id);
  //       this.Puser.push(res.dataDB[index].colaborador_id);
  //     }

  //     // console.log(this.Pdocumento_id)
  //     // console.log(this.Pdepartamento)
  //     // console.log(this.Puser)
  //   });
  // }

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
    // console.log(Id)
    
    // console.log(this.departamento_id)
    // console.log(this.permisos)

    // const formData = new FormData();
    // formData.append('id', Id!.toString()),
    // formData.append('idDepart', this.departamento_id),
    const formData = new FormData();
    formData.append('id', Id!.toString()),
    formData.append('idDepart', this.departamentos),
    formData.append('idCargo', this.cargos),
    
    //console.log(this.departamento_id)

    this.menuService.getDetallePermiso(formData).subscribe((data: any) => {
      //console.log(data)
      const array = Array.from(Object.values(data));
      //console.log(array);
      this.listaDetalle = array;
      //console.log(this.listaDetalle)
      for (let index = 0; index < this.listaDetalle.length; index++) {
        // const element = this.listaDetalle[index];
        // console.log(element)
        // this.idCargo = this.listaDetalle[index].cargo_id;
        // this.idDepar = this.listaDetalle[index].departamento_id;
        // this.idUser = this.listaDetalle[index].colaborador_id;
        this.menus.push(this.listaDetalle[index]);
      }
      //console.log(this.menus)
    });
  }
 
  obtenerDetalleEvaluacion() {
    const Id = localStorage.getItem('id');

    this.evaluacionService.getObtenerDetalleGrupoEvaluacion(parseInt(Id!)).subscribe((res) => {
      this.listaDetalleEvaluacion = res.dataDB;
      // console.log(this.listaDetalleEvaluacion)
      // console.log(this.fechaActual)

      const fechaDB = this.fechaActual;
      const fecha = new Date(fechaDB);
      const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd HH:mm:ss');
      //console.log(fechaFormateada);

      for (let index = 0; index < this.listaDetalleEvaluacion.length; index++) {
        //const element = this.listaDetalleEvaluacion[index];
        if(fechaFormateada! >= this.listaDetalleEvaluacion[index].apertura && fechaFormateada! <= this.listaDetalleEvaluacion[index].cierre && this.listaDetalleEvaluacion[index].intentos > 0 && this.listaDetalleEvaluacion[index].cantidadPreguntas > 0) {
          //console.log('Hola')
          this.habilitarEvaluacion = true;
        } else {
          this.habilitarEvaluacion = false;
        }
         
      }
    });
  }

  obtenerDetalleEvaluacionAbierta() {
    const Id = localStorage.getItem('id');
    this.habilitarEvaluacion = false;
    this.evaluacionService.getEvaluacionAbierta(parseInt(Id!)).subscribe((res) => {
      console.log(res.dataDB)
      this.listaDetalleEvaluacion = res.dataDB;
      // console.log(this.listaDetalleEvaluacion)
      // console.log(this.fechaActual)
      const fechaDB = this.fechaActual;
      const fecha = new Date(fechaDB);
      const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd HH:mm:ss');
      //console.log(fechaFormateada);
      for (let index = 0; index < this.listaDetalleEvaluacion.length; index++) {
        //const element = this.listaDetalleEvaluacion[index];
        if(fechaFormateada! >= this.listaDetalleEvaluacion[index].apertura && fechaFormateada! <= this.listaDetalleEvaluacion[index].cierre && this.listaDetalleEvaluacion[index].cantidadPreguntas > 0) {
          //console.log('Hola')
          this.habilitarEvaluacion = true;
        } else {
          this.habilitarEvaluacion = false;
        }
         
      } 
    });
  }

  async obtenerEvaluaciones() {
    //this.habilitarEvaluacion = false;
    const Id = localStorage.getItem('id');
    //console.log(Id)
    const result = await this.evaluacionService.getIndexEvaluaciones().toPromise();
    //console.log(result.dataDB)
    let newData = result.dataDB.map((obj:any) => {
      const colaborador_id = obj.colaborador_id.split(',').map(Number);
      return { ...obj, colaborador_id };
    }); 
    const currentDate = new Date();
    let filteredEvaluations = newData.filter((evaluation:any) => {
      const cierreDate = new Date(evaluation.cierre);
      return cierreDate.getTime() > currentDate.getTime();
    });
    //console.log(filteredEvaluations);
    console.log(filteredEvaluations.length);
    if(filteredEvaluations.length == 0) {
      this.habilitarEvaluacion = false;
    } else {
      for (let index = 0; index < filteredEvaluations.length; index++) {
        //this.habilitarEvaluacion = false;
  
        if(filteredEvaluations[index].resultado == null  && filteredEvaluations[index].cantidadPreguntas > 0 ){
          this.listadoEvaluaciones = filteredEvaluations;
          console.log('Entró')
          console.log(this.listadoEvaluaciones);
          this.habilitarEvaluacion = true;
        } else {
          this.habilitarEvaluacion = false;
          console.log('Noo Entró') 
          console.log(this.listadoEvaluaciones);
          //this.habilitarEvaluacion = false; && filteredEvaluations[index].finalizada == null
        }  
      } 
    } 
    //console.log(this.habilitarEvaluacion) 
    filteredEvaluations = [];
  }   
  
  cargarQuiz(item: any) {
    if(item.evaluada == 'S'){
      //console.log(item)
      this.router.navigate(['/dashboard/blank']);
      setTimeout(() => {
        this.router.navigate(['/dashboard/quiz', item.id]);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 1000);
    } else {
      //console.log(item)
      this.router.navigate(['/dashboard/blank']);
      setTimeout(() => {
        this.router.navigate(['/dashboard/quizabierto', item.id]);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 1000);
    }
  }



   
}
