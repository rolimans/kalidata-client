import {Component, Input, OnInit} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {Atividade} from '../../model/atividade';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

    acima_media: string = null;

    @Input() atividade: Atividade;

    constructor(public actionSheetController: ActionSheetController) {}

    setAcimaMedia() {
        if (this.atividade.isAcimaMedia()) {
            this.acima_media = 'happy';
        } else {
            this.acima_media =  'sad';
        }
        if (this.atividade.nota === null){
            this.acima_media = 'help-circle-outline';
        }
    }

    async present() {
        if (this.acima_media === null) {
            this.setAcimaMedia();
        }
        const actionSheet = await this.actionSheetController.create({
            header: this.atividade.tipo,
            buttons: [{
                text: this.atividade.nome,
                icon: 'information-circle-outline',
                handler: () => {
                    return false;
                }
            }, {
                text: 'Valor: ' + this.atividade.getValor(),
                icon: 'stats',
                handler: () => {
                    return false;
                }
            }, {
                text: 'Nota: ' + this.atividade.getNota(),
                icon: this.acima_media,
                handler: () => {
                    return false;
                }
            }, {
                text: 'Peso: ' + this.atividade.peso,
                icon: 'calculator',
                handler: () => {
                    return false;
                }
            },
                {
                text: 'Data: ' + this.atividade.data,
                icon: 'calendar',
                handler: () => {
                    return false;
                }
            }, {
                text: 'Fechar',
                icon: 'close',
                role: 'cancel',
            }]
        });
        await actionSheet.present();
    }

  ngOnInit() {
  }

}