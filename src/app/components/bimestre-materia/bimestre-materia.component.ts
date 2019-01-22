import {Component, Input, OnInit} from '@angular/core';
import {Atividade} from '../../model/atividade';

@Component({
  selector: 'app-bimestre-materia',
  templateUrl: './bimestre-materia.component.html',
  styleUrls: ['./bimestre-materia.component.scss']
})
export class BimestreMateriaComponent implements OnInit {
    @Input() nome: string;
    @Input() atividades: Atividade[];

  constructor() { }

  ngOnInit() {
  }

}
