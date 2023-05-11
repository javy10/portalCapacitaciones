import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {


  formConfiguracion!: FormGroup;
  selectedOption!: any;
  ngSelectD: any;
  ngSelectC: any;
  
  listaCargos:any=[];
  listaColaborador:any=[];

  constructor(public fb:FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private colaboradorService: ColaboradorService) {
    this.formConfiguracion = this.fb.group({
      'clave': ['', Validators.required],
      'cargo': ['', Validators.required],
      'colaborador': ['', Validators.required],
      'cargoSelect': ['', Validators.required],
      'colaboradorSelect': ['', Validators.required],
    })
  }

  get clave() {
    return this.formConfiguracion.get('clave') as FormControl;
  }

  get cargo() {
    return this.formConfiguracion.get('cargo') as FormControl;
  }
  get colaborador() {
    return this.formConfiguracion.get('colaborador') as FormControl;
  }
  get cargoSelect() {
    return this.formConfiguracion.get('cargoSelect') as FormControl;
  }
  get colaboradorSelect() {
    return this.formConfiguracion.get('colaboradorSelect') as FormControl;
  }

  ngOnInit(): void {
    this.loadCargos();
    this.loadColaboradores();
  }

  async loadCargos() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getCargo().subscribe((data: any) => {
      this.listaCargos = data;
    })));
  }
  async loadColaboradores() {
    return  await new Promise(resolve => resolve( this.colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaborador = data.dataDB;
    })));
  }

  guardar() {

  }
}
