import { Component, OnInit } from '@angular/core';
import {Bimestre} from '../model/bimestre';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../model/response';

@Component({
  selector: 'app-atividade-de',
  templateUrl: './atividade-de.page.html',
  styleUrls: ['./atividade-de.page.scss'],
})
export class AtividadeDePage implements OnInit {

    nome: string;
    bimestres: Bimestre[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
      let response: Response;
      response = this.route.snapshot.data['response'];
      this.nome = this.route.snapshot.paramMap.get('nome');
      const aux = response.materias.filter((materia) => {
          return materia.nome === this.nome;
      });
      if (aux.length === 0) {
          this.bimestres = null;
      } else {
          this.bimestres = aux[0].getBimestresNaoVazios();
      }

  }

}
