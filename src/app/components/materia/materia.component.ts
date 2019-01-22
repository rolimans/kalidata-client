import {Component, Input, OnInit} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {Materia} from '../../model/materia';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {
    Math;
    acima_media: string = null;
    atividade: any;

  @Input() materia: Materia;
  @Input() faltas_totais: number;
    @Input() atividades: boolean;
    @Input() use_peso: boolean;

  constructor(public actionSheetController: ActionSheetController) {
      this.Math = Math;
  }

  setAcimaMedia() {
      this.atividade = this.materia.getUltimaAtividade();

      if (this.atividade === false) {
        return;
      }
      if (this.atividade.isAcimaMedia()) {
          this.acima_media = 'happy';
      } else {
          this.acima_media =  'sad';
      }
  }

  async present() {
      if (this.acima_media === null) {
          this.setAcimaMedia();
      }

      if (this.atividade === false) {
          return;
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
          }, {
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
