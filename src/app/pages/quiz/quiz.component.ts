import { Component, OnInit } from '@angular/core';
import { EvaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  listadoPreguntas: any[] = [];
  listadoRespuestas: any[] = [];
  colaborador_id:any = localStorage.getItem('id');

  datos:any;

  constructor(private evaluacionService: EvaluacionesService, ) {

  }

  ngOnInit(): void {
    this.loadPreguntas();
  }

  loadPreguntas() {
    //console.log(this.colaborador_id)
    const informacion: any[] = [];
    this.evaluacionService.obtenerPreguntas(this.colaborador_id).subscribe((data: any) => {
      
      const result = data.dataDB.reduce((acc:any, item:any) => {
        const existingItem = acc.find((i:any) => i.valorPregunta === item.valorPregunta);
        if (existingItem) {
          existingItem.valorRespuesta.push(item.valorRespuesta);
        } else {
          acc.push({
            valorPregunta: item.valorPregunta,
            valorRespuesta: [item.valorRespuesta]
          });
        }
        return acc;
      }, []);
      this.listadoPreguntas = result;
      console.log(result);
      // console.log(this.listadoPreguntas);

    });
  }
}
