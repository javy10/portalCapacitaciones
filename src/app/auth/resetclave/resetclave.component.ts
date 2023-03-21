import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-resetclave',
  templateUrl: './resetclave.component.html',
  styleUrls: ['./resetclave.component.css']
})
export class ResetclaveComponent implements OnInit{

  constructor(private router: Router, private colaboradorService: ColaboradorService, ) {}
  year = new Date().getFullYear();

  ngOnInit(): void {
    if(this.verificarLogin()){
      this.router.navigate(['']);
    }
  }

  verificarLogin(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  reestablecerClave() {
    const correo = document.getElementById('email') as HTMLInputElement;
    new Promise(resolve => resolve(this.colaboradorService.reestablecerClave(correo.value).subscribe((response: any) => {
      console.log(response);
    })));
  }
}
