import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

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
  id_departamento: any;
  id_cargo:any;

  usuario:any;
  isLoading = false;


  

  constructor(public colaboradorService: ColaboradorService, private documentoService: DocumentoService,  private router: Router,private datePipe: DatePipe, private toastr: ToastrService) {


  }

  ngOnInit(): void {
    const Id = localStorage.getItem('id');
    this.colaboradorService.getobtenerColaboradorID(parseInt(Id!)).subscribe((res) => {
      this.cargos = res.dataDB[0].cargo_id;
      this.departamento_id = res.dataDB[0].departamento_id;
      this.id_departamento = this.departamento_id;
      console.log(this.departamento_id)
      console.log(this.cargos)
      console.log(this.id_departamento)
    });
    this.listarDocumentos();
    this.obtenerPermisos();
    this.loadTipoDocumento();
    
    
    
  }
  listarDocumentos() {
    let today = new Date();
    const fechaFormateada = this.datePipe.transform(today, 'yyyy-MM-dd HH:mm:ss');
    this.fecha = fechaFormateada;
    //console.log(this.fecha)
    // 2023-04-26 11:30:00
    this.id = localStorage.getItem('id');
    new Promise(resolve => resolve(this.colaboradorService.getobtenerColaboradorID(parseInt(this.id!)).subscribe((res) => {
      this.departamento_id = res.dataDB[0].departamento_id;
      //console.log(res.dataDB)
      this.id_cargo = res.dataDB[0].cargo_id
      //console.log(this.departamento_id)
      this.id_cargo = this.cargos;
      this.usuario = {
        'idC': this.id,
        'idD': this.departamento_id
      }
 
      new Promise(resolve => resolve(this.documentoService.getDocumentosPorDatos(this.usuario).subscribe((res) => {
        console.log(this.listaDocumentos)
        this.listaDocumentos = res.dataDB;
      })));
    })));
  } 
  obtenerPermisos() {
    new Promise(resolve => resolve(this.documentoService.getPermisos().subscribe((res) => {
      //console.log(res.dataDB);
      for (let index = 0; index < res.dataDB.length; index++) {
        this.Pdocumento_id.push(res.dataDB[index].documento_id);
        this.Pdepartamento.push(res.dataDB[index].departamento_id);
        this.Puser.push(res.dataDB[index].colaborador_id);
      }

      // console.log(this.Pdocumento_id)
      // console.log(this.Pdepartamento)
      // console.log(this.Puser)
    })));
  } 
  cargarPDF(nombre: any){
    sessionStorage.setItem('reloaded', 'true');
    this.router.navigate(['/dashboard/blank']);
    setTimeout(() => {
      this.router.navigate(['/dashboard/archivo', nombre]);
      //console.log(nombre)
  }, 1500);
  }
 
  loadTipoDocumento(){
    //console.log(this.id)
    this.isLoading = true;
    new Promise(resolve => resolve(this.colaboradorService.getobtenerColaboradorID(parseInt(this.id!)).subscribe((res) => {
      this.departamento_id = res.dataDB[0].departamento_id;
      //console.log(this.departamento_id)
      const formData = new FormData();
      formData.append('idC', this.id);
      formData.append('idD', this.departamento_id);
      
      new Promise(resolve => resolve(this.documentoService.getBuscarTipoDocumentos(formData).subscribe((res) => {
        this.listaTipoDocumentos = res.dataDB;
        console.log(this.listaTipoDocumentos)
        this.isLoading = false;
      })));
    })));
  }
 
 

  deshabilitar(id: number){
    Swal.fire({
      title: 'Estás seguro de deshabilitar a éste tipo de documento?',
      text: "El tipo de documento ya no aparecera en el Portal de Capacitaciones!",
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
        new Promise(resolve => resolve(this.documentoService.eliminarTipoDocumento(id).subscribe((response) => {
          if(response.success == true) {
            this.toastr.success('Tipo de documento deshabilitado con exito.!', 'Éxito!');
          }
        })));
      }
      setTimeout(() => {
        window.location.reload();
    }, 1000);
    });
  }









}
