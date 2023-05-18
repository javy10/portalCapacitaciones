import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-dtconfiguracion',
  templateUrl: './dtconfiguracion.component.html',
  styleUrls: ['./dtconfiguracion.component.css']
})
export class DtconfiguracionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaConfiguracion:any=[];
  Id = '';
  isLoading = false;
  departamento_id: any;
  listaDetalle:any=[];
  idCargo:any;
  idDepar:any;
  idUser:any;
  idMenu:any;

  constructor(public colaboradorService: ColaboradorService,  private menuService: MenuService) {}

  ngOnInit(): void {
    this.Id = localStorage.getItem('id')!;
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "25%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "15%", "targets": 3 },
        { "width": "10%", "targets": 4 },
        { "width": "5%", "targets": 5 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadConfiguracion();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadConfiguracion() {
    this.isLoading = true;
    const Id = localStorage.getItem('id');
    console.log(Id)
    
    this.colaboradorService.getColaboradorID(parseInt(Id!)).subscribe((res) => {
      this.departamento_id = res.dataDB.departamento_id;

      const formData = new FormData();
      formData.append('id', Id!.toString()),
      formData.append('idDepart', this.departamento_id),
      
      console.log(this.departamento_id)
  
      this.menuService.getObtenerDetalle().subscribe((data: any) => {
        console.log(data)
        
          //console.log(data[0])
          this.listaConfiguracion = data;
          console.log(this.listaConfiguracion)
          this.idCargo = data[0].cargo_id;
          this.idDepar = data[0].departamento_id;
          this.idUser = data[0].colaborador_id;
          this.idMenu = data[0].menu_id;
  
          this.isLoading = false;
          setTimeout(() => {
              this.dtTrigger.next(0);
          }, 1000);
  
      });
    });
  }




}
