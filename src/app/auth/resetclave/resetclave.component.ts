import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetclave',
  templateUrl: './resetclave.component.html',
  styleUrls: ['./resetclave.component.css']
})
export class ResetclaveComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.verificarLogin()){
      this.router.navigate(['']);
    }
  }

  verificarLogin(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
