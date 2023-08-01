import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-dtdocumentosdeshabilitados',
  templateUrl: './dtdocumentosdeshabilitados.component.html',
  styleUrls: ['./dtdocumentosdeshabilitados.component.css']
})
export class DtdocumentosdeshabilitadosComponent implements OnInit{

  listaDocumentos:any=[];
  listaTipoDocumentos:any=[];

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngSelect:any;
  isLoading = false;
  formTipo: FormGroup;
  selectedItem: any;

  constructor( public fb:FormBuilder, private documentoService:DocumentoService) {
    this.formTipo = this.fb.group({
      'tipo': ['', Validators.required],
    })
  }

  get tipo() {
    return this.formTipo.get('tipo') as FormControl;
  }

  ngOnInit(): void {
    
    this.dtOptions = {
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      responsive: true,
      columnDefs: [
         { "width": "2%", "targets": 0 },
        { "width": "2%", "targets": 1 },
        { "width": "30%", "targets": 2 },
        { "width": "10%", "targets": 3 },
        { "width": "8%", "targets": 4 },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };

    this.loadTipoDocumento();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  habilitar(item:any) {

  }

  loadTipoDocumento() {
    this.documentoService.getTipoDocumentos().subscribe((data: any) => {
      this.listaTipoDocumentos = data;
      this.ngSelect = 0;
      console.log(data)
    });
  }

  onItemSelected(selectedValue: any) {
    // console.log(this.listaDocumentos)
    console.log(selectedValue.target.value)
    this.listaDocumentos = [];
    this.documentoService.getDocumentoDeshabilitadosID(selectedValue.target.value).subscribe((data: any) => {
      //console.log(this.listaDocumentos)
      console.log(data.dataDB)
      this.listaDocumentos = data.dataDB;
      //console.log(this.listaDocumentos)

      // Destruir la tabla DataTable existente
      if (this.datatableElement.dtInstance) {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(0);
        });
      } else {
        // Volver a dibujar la tabla DataTable con los nuevos datos
        if(this.listaDocumentos.length != 0) {
          setTimeout(() => {
              this.dtTrigger.next(0);
          }, 1000);
        }
      }
    });
  }
}
