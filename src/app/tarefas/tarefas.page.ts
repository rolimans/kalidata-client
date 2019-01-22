import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TarefasService} from '../services/tarefas.service';

export class Data {
    nome;
    original;
    tarefas;
}

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {
  public datas: Data[] = [];
  private turma: string;
  dados: any;

  constructor(private db: AngularFirestore, private nav: NavController, private route: ActivatedRoute, private tarefasService: TarefasService) {
      this.turma = this.route.snapshot.data['response'].turma;
      this.tarefasService.dados = this.db.collection(this.turma);
      this.db.collection(this.turma).valueChanges().subscribe((value => {
          this.datas = [];
          value.forEach((val: any) => {
              const aux = new Data();
              aux.original = val.data;
              aux.nome = val.data.split('-')[2] + '/' + val.data.split('-')[1] + '/' + val.data.split('-')[0];
              aux.tarefas = this.db.collection(this.turma).doc(val.data).collection('tarefas').snapshotChanges();
              this.datas.push(aux);
          });
      }));
  }

  ngOnInit() {
  }

  add() {
      this.nav.navigateForward('/novaTarefa');
  }

}
