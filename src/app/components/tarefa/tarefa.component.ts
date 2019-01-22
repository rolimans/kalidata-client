import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {TarefasService} from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {

    @Input() tarefa: any;
    @Input() data: any;
    @Input() id: any;

  constructor(private actionSheetController: ActionSheetController, private tarefasService: TarefasService) {
  }

  ngOnInit() {
  }

  delete() {
    this.tarefasService.deleteTarefa(this.data.original, this.id);
  }

    async present() {
        if (this.tarefa.descricao === '') {
            this.tarefa.descricao = 'Nenhuma descrição';
        }

        if (this.tarefa.nome_usuario === undefined) {
            this.tarefa.nome_usuario = 'Desconhecido'; // TODO REMOVE AFTER SOME UPDATES
        }

        const actionSheet = await this.actionSheetController.create({
            header: this.tarefa.nome,
            buttons: [{
                text: this.tarefa.descricao,
                icon: 'information-circle-outline',
                handler: () => {
                    return false;
                }
            }, {
                text: 'Matéria: ' + this.tarefa.materia,
                icon: 'clipboard',
                handler: () => {
                    return false;
                }
            }, {
                text: 'Data: ' + this.data.nome,
                icon: 'calendar',
                handler: () => {
                    return false;
                }
            },
                {
                    text: 'Autor: ' +  this.tarefa.nome_usuario,
                    icon: 'contact',
                    handler: () => {
                        return false;
                    }
                },
                {
                    text: 'Deletar Tarefa',
                    icon: 'trash',
                    handler: () => {
                        this.delete();
                    }
                },
                {
                text: 'Fechar',
                icon: 'close',
                role: 'cancel',
            }]
        });
        await actionSheet.present();
    }

    TextAbstract(text, length = 10) {
        if (text == null) {
            return '';
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        return text + '...';
    }

}
