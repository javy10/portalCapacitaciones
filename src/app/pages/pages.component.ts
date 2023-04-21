import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{
  year = new Date().getFullYear();
  path: any;

  ngOnInit(): void {
    console.log(this.path)
  }

  enviarDatos(datos: any) {
    console.log(datos)
    this.path = datos;
  }
}
