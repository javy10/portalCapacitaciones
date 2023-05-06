import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  year = new Date().getFullYear();

  cargos = 0;
  listaDocumentos:any = [];
  listaTipoDocumentos:any = [];
  nombre: any;
  archivoUrl!: any;
  id: any;
  departamento_id: any;
  Pdocumento_id: any = [];
  Pdepartamento: any = [];
  Puser: any = [];

  pdfNombre!: string;
  fecha: any;

  tipoDoc: any;

  constructor(public colaboradorService: ColaboradorService, private documentoService: DocumentoService,  private router: Router,private datePipe: DatePipe) {


  }

  ngOnInit(): void {
    const Id = localStorage.getItem('id');
    new Promise(resolve => resolve(this.colaboradorService.getColaboradorID(parseInt(Id!)).subscribe((res) => {
      this.cargos = res.dataDB.cargo_id;
      this.departamento_id = res.dataDB.departamento_id;
      console.log(this.departamento_id)
      console.log(this.cargos)
    })));
    this.listarDocumentos();
    this.loadTipoDocumento();
    this.obtenerPermisos();
  }

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
  obtenerPermisos() {
    new Promise(resolve => resolve(this.documentoService.getPermisos().subscribe((res) => {
      console.log(res.dataDB);
      for (let index = 0; index < res.dataDB.length; index++) {
        this.Pdocumento_id.push(res.dataDB[index].documento_id);
        this.Pdepartamento.push(res.dataDB[index].departamento_id);
        this.Puser.push(res.dataDB[index].colaborador_id);
      }

      console.log(this.Pdocumento_id)
      console.log(this.Pdepartamento)
      console.log(this.Puser)
    })));
  }

  cargarPDF(nombre: any){
    sessionStorage.setItem('reloaded', 'true');
    this.router.navigate(['/dashboard/blank']);
    setTimeout(() => {
      this.router.navigate(['/dashboard/archivo', nombre]);
      console.log(nombre)
  }, 1500);
  }

  loadTipoDocumento(){
    new Promise(resolve => resolve(this.documentoService.getTipoDocumentos().subscribe((res) => {
      this.listaTipoDocumentos = res;
      console.log(this.listaTipoDocumentos)
    })));
  }

}
