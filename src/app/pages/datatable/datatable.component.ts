import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { Colaborador } from '../../interfaces/colaborador';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  listaColaborador:any=[];

  constructor(private http: HttpClient, private _colaboradorService: ColaboradorService) {}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      columnDefs: [
        { "width": "3%", "targets": 0 },
        { "width": "15%", "targets": 1 },
        { "width": "15%", "targets": 2 },
        { "width": "15%", "targets": 3 },
        { "width": "25%", "targets": 4 },
        { "width": "15%", "targets": 5 },
        { "width": "20%", "targets": 6 }
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadColaborador()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadColaborador() {
    return this._colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaborador = data.dataDB;
      this.dtTrigger.next(0);
      console.log(data.dataDB)
    });
  }
}
