import { Component, OnInit } from '@angular/core';
import {TarefasService} from '../services/tarefas.service';
import {ActivatedRoute} from '@angular/router';
import {Materia} from '../model/materia';

@Component({
  selector: 'app-nova-tarefa',
  templateUrl: './nova-tarefa.page.html',
  styleUrls: ['./nova-tarefa.page.scss'],
})
export class NovaTarefaPage implements OnInit {
    today: any = new Date().toISOString();
     date_selected = this.today;
     materia;
     nome;
     descricao;
    private dados;
     materias: Materia[];
     private nome_usuario;

  constructor(private tarefasService: TarefasService, private route: ActivatedRoute) {
        this.materias = this.route.snapshot.data['response'].materias;
        this.nome_usuario = this.route.snapshot.data['response'].nome_usuario;
  }

  ngOnInit() {
  }

    addTarefa() {
        this.tarefasService.addTarefa(this.date_selected, this.nome, this.materia, this.descricao, this.nome_usuario);
    }

}
