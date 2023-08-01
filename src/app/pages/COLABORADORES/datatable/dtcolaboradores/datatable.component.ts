import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject, isEmpty } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnDestroy, OnInit {

  /* Estas son propiedades declaradas en la clase `DatatableComponent`. */
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  listaColaborador:any=[];
  selectedRow: any;
  Id = '';
  isLoading = false;
  
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(private _colaboradorService: ColaboradorService, private toastr: ToastrService,) {}

  /**
   * La función ngOnInit inicializa el componente y establece las opciones para un DataTable.
   */
  ngOnInit(): void {
    this.Id = localStorage.getItem('id')!;
    //this.loadColaborador()
    this.dtOptions = {
      autoWidth: false,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      responsive: true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "20%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "20%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "10%", "targets": 5 },
        { "width": "8%", "targets": 6 }
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
   
  }

  /**
   * La función ngOnDestroy cancela la suscripción de dtTrigger.
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadColaborador() {
    this.isLoading = true;
    this._colaboradorService.getCollaborator().subscribe((data: any) => {
      setTimeout(() => {
        this.dtTrigger.next(0);
      }, 1);
      this.listaColaborador = data.dataDB;
      this.isLoading = false;
      
    });
  }

  /**
   * Esta función solicita al usuario que confirme la desactivación de un colaborador y luego llama a
   * un servicio para eliminar el colaborador si se confirma.
   * @param {number} id - El ID del colaborador que necesita ser deshabilitado.
   */
  eliminarColaborador(id: number) {
    //console.log(id)
    Swal.fire({
      title: 'Estás seguro de deshabilitar a éste colaborador?',
      text: "El colaborador ya no aparecera en el Portal de Capacitaciones!",
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
        new Promise(resolve => resolve(this._colaboradorService.eliminar(id).subscribe((response) => {
          this.toastr.success('Colaborador deshabilitado con exito.!', 'Éxito!');
        })));
        this.loadColaborador();
      }
    });
  }

  /**
   * Esta función muestra un mensaje de confirmación y llama a un servicio para desbloquear a un
   * colaborador.
   * @param {number} id - number - representa la ID del colaborador que necesita ser desbloqueado.
   */
  desbloquear(id: number) {
    Swal.fire({
      title: 'Quieres desbloquear a éste colaborador?',
      text: "El colaborador podra ingresar al Portal de Capacitaciones!",
      icon: 'info',
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
        new Promise(resolve => resolve(this._colaboradorService.desbloquear(id).subscribe((response) => {
          Swal.fire(
            'Desbloqueado!',
            'Colaborador desbloqueado con exito.',
            'success'
          )
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })));
      }
    });
  }

  busqueda(event: KeyboardEvent) {
    const valor = (event.target as HTMLInputElement).value;

    if(valor.length == 0) {
      this.listaColaborador = [];
      console.log(this.listaColaborador)
    } else {
      this._colaboradorService.getfiltroUsuarios(valor).subscribe((data: any) => {

        // Agrupar departamentos y cargos por id de usuario
        const departamentosCargos = data.dataDB.reduce((acumulador:any, usuario:any) => {
          const index = acumulador.findIndex((item:any) => item.id === usuario.id);
          if (index === -1) {
            acumulador.push({
              id: usuario.id,
              nombres: usuario.nombres,
              apellidos: usuario.apellidos,
              agencia: usuario.agencia,
              departamentos: [usuario.departamento],
              cargos: [usuario.cargo],
              fechaSalida: usuario.fechaSalida
            });
          } else {
            acumulador[index].departamentos.push(usuario.departamento);
            acumulador[index].cargos.push(usuario.cargo);
          }
          return acumulador;
        }, []);

        // Crear nuevo array con los datos agrupados
        const datosTabla = departamentosCargos.map((item:any) => {
          return {
            id: item.id,
            nombres: item.nombres,
            apellidos: item.apellidos,
            agencia: item.agencia,
            departamentos: [...new Set(item.departamentos)].join(', '),
            cargos: [...new Set(item.cargos)].join(', '),
            fechaSalida: item.fechaSalida,
          };
        });
        //console.log(datosTabla)
        this.listaColaborador = datosTabla;


      });
    }
  }

  


}
