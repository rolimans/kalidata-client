import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController, AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  public dados;

  constructor(private db: AngularFirestore, private nav: NavController, private alert: AlertController) {
  }

  deleteTarefa(data, id) {
      this.dados.doc(data).collection('tarefas').doc(id).delete();
      this.dados.doc(data).collection('tarefas').valueChanges().subscribe((info) => {
          if (info.length === 0) {
              this.dados.doc(data).delete();
          }
      });
  }

  addTarefa(data_selecionada, nome, materia, descricao, nome_usuario) {
      let data;
      if (typeof data_selecionada === 'string') {
          const today = new Date();
          const date_selected = {
              day: today.getDate().toString(),
              month: (today.getMonth() + 1).toString(),
              year: today.getFullYear().toString()
          };
          if (date_selected.day.length < 2) {
              date_selected.day = '0' + date_selected.day;
          }
          if (date_selected.month.length < 2) {
              date_selected.month = '0' + date_selected.month;
          }
          data = date_selected;
      } else {
          data = {
              day: data_selecionada.day.text,
              month: data_selecionada.month.text,
              year: data_selecionada.year.text
          };
      }

      const date_2 =  data.month + '-' + data.day  + '-' + data.year;

      data = data.year + '-' + data.month + '-' + data.day ;

      if (new Date(date_2) < new Date(new Date().toLocaleDateString())) {
          this.not_valid('Data inválida', 'Data já passou');
          return;
      }
      if (nome === undefined || nome === '' || nome === null) {
          this.not_valid('Nome vazio', 'Por favor insira um nome');
          return;
      }

      if (descricao === undefined) {
          descricao = '';
      }

      if (materia === undefined ) {
          materia = '';
      }

      this.dados.doc(data).set({data: data});
      this.dados.doc(data).collection('tarefas').add({nome: nome, descricao: descricao, materia: materia, nome_usuario: nome_usuario});

      this.nav.navigateBack('/at/page/(tasks:tasks)');
  }

    async not_valid(title, message) {
        const alert = await this.alert.create({
            header: title,
            message: message,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        return;
                    }
                }
            ]
        });

        await alert.present();
    }
}
