import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listaColaboradores:any;
  formGrupos: FormGroup;
  isLoading = false;


  constructor( private fb:FormBuilder, 
    private _colaboradorService: ColaboradorService, 
    private toastr: ToastrService,
    private evaluacionService: EvaluacionesService,
    private datePipe: DatePipe,
    private router: Router
    ) {
    this.formGrupos = this.fb.group({
      'nombre': ['', Validators.required],
      'apertura': ['', Validators.required],
      'cierre': ['', Validators.required],
    });
  }

  get nombre() {
    return this.formGrupos.get('nombre') as FormControl;
  }
  get apertura() {
    return this.formGrupos.get('apertura') as FormControl;
  }
  get cierre() {
    return this.formGrupos.get('cierre') as FormControl;
  }

  ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      processing: true,
      //destroy:true,
      columnDefs: [
        { "width": "2%", "targets": 0 },
        { "width": "30%", "targets": 1 },
        { "width": "30%", "targets": 2 },
        { "width": "30%", "targets": 3 },
        { "width": "10%", "targets": 4 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
    this.loadColaborador();
  }

  loadColaborador() {
    this.isLoading = true;
    this._colaboradorService.getCollaborator().subscribe((data: any) => {
      this.listaColaboradores = data.dataDB;
      this.isLoading = false;
      setTimeout(() => {
          this.dtTrigger.next(0);
      }, 1000);
    });
  }

  cancelar() {}

  cargar(){}

  // Variable para almacenar el contador de checkboxes seleccionados
  selectedCheckboxCount = 0;

  // Función que se ejecuta cuando se produce un cambio en el estado del checkbox
  handleCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCheckboxCount++;
    } else {
      this.selectedCheckboxCount--;
    }
  }

  guardar() {
    
    if(this.selectedCheckboxCount > 0) {
      let fechaFormateadaA = '';
      let fechaFormateadaC = '';
      const apertura = document.querySelector("#apertura") as HTMLInputElement;
      const cierre = document.querySelector("#cierre") as HTMLInputElement;
      let fechaObjA = new Date(apertura.value);
      fechaFormateadaA = this.datePipe.transform(fechaObjA, 'yyyy-MM-dd HH:mm:ss')!;
      let fechaObjC = new Date(cierre.value);
      fechaFormateadaC = this.datePipe.transform(fechaObjC, 'yyyy-MM-dd HH:mm:ss')!;

      const formData = new FormData();
      formData.append('nombre' , this.formGrupos.value.nombre),
      formData.append('apertura' , fechaFormateadaA),
      formData.append('cierre' , fechaFormateadaC)

      console.log(this.formGrupos.value.nombre)
      console.log(fechaFormateadaA)
      console.log(fechaFormateadaC)

      this.evaluacionService.saveGrupo(formData).subscribe((response) => {
        if(response.success == true) {

          const checkboxes = document.querySelectorAll<HTMLInputElement>('table input[type="checkbox"]');
          const userCells = document.querySelectorAll('table td.user');
          const checkedUsers: string[] = [];
          
          checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
              const userCell = userCells[index];
              const userName = userCell.textContent?.trim();
              if (userName) {
                checkedUsers.push(userName);
              }
            }
          });
          console.log(checkedUsers);

          for (let index = 0; index < checkedUsers.length; index++) {
            const element = checkedUsers[index];
            console.log(element)
            formData.append('colaborador_id' , element)
            this.evaluacionService.saveDetalleGrupo(formData).subscribe((response) => {
            });
          }
        }

        this.toastr.success('Grupo creado con éxito!', 'Éxito!');
        setTimeout(() => {
          //this.router.navigate(['dashboard/list-grupos']);
        }, 1000);
      });

    } else {
      this.toastr.warning('Debes seleccionar al menos a un colaborador!', 'Advertencia!');
    }
  }



}
