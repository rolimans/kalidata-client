import {Component, Input, OnInit} from '@angular/core';
import {Bimestre} from '../../model/bimestre';

@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
  styleUrls: ['./bimestre.component.scss']
})
export class BimestreComponent implements OnInit {

  @Input() bimestre: Bimestre;
  @Input() faltas_totais: number;

  Math;

  constructor() {
      this.Math = Math;
  }

  ngOnInit() {
  }

}
