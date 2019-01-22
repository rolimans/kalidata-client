import { Component, OnInit } from '@angular/core';
import {Bimestre} from '../model/bimestre';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../model/response';

@Component({
  selector: 'app-boletim-de',
  templateUrl: './boletim-de.page.html',
  styleUrls: ['./boletim-de.page.scss'],
})
export class BoletimDePage implements OnInit {

    nome: string;
    bimestres: Bimestre[];
    total_faltas: number;

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
      let response: Response;
      response = this.route.snapshot.data['response'];
      this.nome = this.route.snapshot.paramMap.get('nome');
      const aux = response.materias.filter((materia) => {
          return materia.nome === this.nome;
      });
      if (aux.length === 0) {
          this.bimestres = null;
          this.total_faltas = null;

      } else {
          this.bimestres = aux[0].getBimestresComNota();
          this.total_faltas = aux[0].total_faltas;
      }
  }

}
