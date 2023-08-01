import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  @Input() datosUsuario: any;

  listaDocumentos:any = [];
  listaTipoDocumentos:any = [];
  nombre: any;
  archivoUrl!: any;
  id: any;
  cargos = 0;
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

  cargos_id: any = [];
  departamentos_id: any = [];
  

  constructor(public colaboradorService: ColaboradorService, private documentoService: DocumentoService,  private router: Router,private datePipe: DatePipe, private toastr: ToastrService) {


  }

  ngOnInit(): void {
    const Id = localStorage.getItem('id');
    setTimeout(() => {
      this.obtenerColaboradorID(parseInt(Id!))
    }, 2500);
  }

  async obtenerColaboradorID(id: number) {
    try {
      // const res = await this.colaboradorService.getobtenerColaboradorID(id).toPromise();
      // console.log(res.dataDB);
      // this.cargos = res.dataDB[0].cargo_id;
      // this.departamento_id = res.dataDB[0].departamento_id;
      const idsUnicos: number[] = [];
      this.datosUsuario = this.colaboradorService.getDatos();

      console.log(this.datosUsuario)

      for (let index = 0; index < this.datosUsuario.length; index++) {
        console.log(this.datosUsuario[index].cargo_id)
        console.log(this.datosUsuario[index].departamento_id);

        const id = this.datosUsuario[index].departamento_id;
        // Verificar si el id ya existe en el array de ids únicos
        if (!idsUnicos.includes(id)) {
          // Si el id no existe, agregarlo al array de ids únicos
          idsUnicos.push(id);
        }
        this.cargos_id.push(this.datosUsuario[index].cargo_id);
      }

      this.departamentos_id = idsUnicos;
      console.log(this.cargos_id)
      console.log(this.departamentos_id)
      //this.cargos = this.datosUsuario[0].cargo_id;
      // this.departamento_id = this.datosUsuario[0].departamento_id;

      this.listarDocumentos();
      this.obtenerPermisos();
      this.loadTipoDocumento();
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
    }
  }



  // listarDocumentos() {
  //   let today = new Date();
  //   const fechaFormateada = this.datePipe.transform(today, 'yyyy-MM-dd HH:mm:ss');
  //   this.fecha = fechaFormateada;
  //   this.id = localStorage.getItem('id');
  //     console.log(this.departamento_id)
  //     console.log(this.cargos)
  //     this.id_cargo = this.cargos;
  //     this.usuario = {
  //       'idC': this.id,
  //       'idD': this.departamento_id
  //     }
  //     this.documentoService.getDocumentosPorDatos(this.usuario).subscribe((res) => {
  //       //console.log(this.listaDocumentos)
  //       this.listaDocumentos = res.dataDB;
  //     });
  // } 

  listarDocumentos() {

    console.log(this.cargos_id)
    console.log(this.departamentos_id)

    let today = new Date();
    const fechaFormateada = this.datePipe.transform(today, 'yyyy-MM-dd HH:mm:ss');
    this.fecha = fechaFormateada;
    this.id = localStorage.getItem('id');
      // console.log(this.departamento_id)
      // console.log(this.cargos)
      //this.id_cargo = this.cargos;
      this.usuario = {
        'idC': this.id,
        'idD': [],
        'idCa': []
      }

      // Agregar los ids de departamentos al array idD del objeto usuario
      for (const id of this.departamentos_id) {
        this.usuario.idD.push(id);
      }

      // Agregar los ids de cargos al array idCa del objeto usuario
      for (const id of this.cargos_id) {
        this.usuario.idCa.push(id);
      }

      this.documentoService.getDocumentosPorDatos(this.usuario).subscribe((res) => {
        //console.log(res.dataDB)
        this.listaDocumentos = res.dataDB;
        console.log(this.listaDocumentos)
      });
  }  
   
  obtenerPermisos() {
    this.documentoService.getPermisos().subscribe((res) => {
      
      for (let index = 0; index < res.dataDB.length; index++) {
        this.Pdocumento_id.push(res.dataDB[index].documento_id);
        this.Pdepartamento.push(res.dataDB[index].departamento_id);
        this.Puser.push(res.dataDB[index].colaborador_id);
      }
    });
  } 

  cargarPDF(nombre: any){
    sessionStorage.setItem('reloaded', 'true');
    this.router.navigate(['/dashboard/blank']);
    setTimeout(() => {
      this.router.navigate(['/dashboard/archivo', nombre]);
  }, 1500);
  }
 
  loadTipoDocumento(){
    
    this.isLoading = true;
    // console.log(this.departamento_id)
    // console.log(this.cargos)

    // const formData = new FormData();
    // formData.append('idC', this.id);
    // formData.append('idD', this.departamento_id);

    this.usuario = {
      'idC': this.id,
      'idD': [],
      'idCa': []
    }

    // Agregar los ids de departamentos al array idD del objeto usuario
    for (const id of this.departamentos_id) {
      this.usuario.idD.push(id);
    }

    // Agregar los ids de cargos al array idCa del objeto usuario
    for (const id of this.cargos_id) {
      this.usuario.idCa.push(id);
    }
    
    this.documentoService.getBuscarTipoDocumentos(this.usuario).subscribe((res) => {
      this.listaTipoDocumentos = res.dataDB;
      console.log(this.listaTipoDocumentos)
      this.isLoading = false;
    });
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
