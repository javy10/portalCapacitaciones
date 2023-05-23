import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dtgrupo',
  templateUrl: './dtgrupo.component.html',
  styleUrls: ['./dtgrupo.component.css']
})
export class DtgrupoComponent implements OnInit {

  isLoading = false;
  listaGrupo:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor() {

  }

  ngOnInit(): void {
    
  }

  eliminarGrupo(item:any) {

  }









}
