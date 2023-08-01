import { Component, Input, OnInit, Output } from '@angular/core';
import { ColaboradorService } from '../services/colaborador.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{
  year = new Date().getFullYear();
  path: any;

  cargos = 0;
  departamento_id: any;
  @Output() datoUsuario:any = [];
  
  

  constructor(public colaboradorService: ColaboradorService) {


  }

  ngOnInit(): void {
    //console.log(this.path)

    const Id = localStorage.getItem('id');
    this.obtenerColaboradorID(parseInt(Id!));
    console.log(Id)
  }

  enviarDatos(datos: any) {
    console.log(datos)
    this.path = datos;
  }

  async obtenerColaboradorID(id: number) {
    try {
      const res = await this.colaboradorService.getobtenerColaboradorID(id).toPromise();
      // Procesar la respuesta aquí
      console.log(res.dataDB);
      this.datoUsuario = res.dataDB;
      //console.log(this.datoUsuario);
      // this.cargos = res.dataDB[0].cargo_id;
      // this.departamento_id = res.dataDB[0].departamento_id;
      this.enviarDatoUsuario(this.datoUsuario);

    } catch (error) {
      // Manejar el error aquí
      console.error(error);
    }
  }

  enviarDatoUsuario(datos:any) {
    this.colaboradorService.setDatos(datos);
  }








}
