import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styles: [
  ]
})
export class DatatableComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/es-ES.json',
      }
    };
      this.http.get('https://dummy.restapiexample.com/api/v1/employees')
      .subscribe(( res: any) => {
        this.data = res.data;
        this.dtTrigger.next(0);
      });    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
