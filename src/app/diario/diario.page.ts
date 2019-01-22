import { Component, OnInit } from '@angular/core';
import { Materia } from '../model/materia';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../model/response';
import {LoaderService} from '../services/loader.service';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage implements OnInit {
    nome_usuario: string;
    materias: Materia[];
    faltas_totais: number;
    Math;
    pesquisa: string;
    order = 'nome';
    atividades: boolean;
    use_peso = true;


    constructor(private route: ActivatedRoute, private loader: LoaderService, private alertController: AlertController) {
        this.Math = Math;
    }

    ionViewDidEnter() {
        this.loader.hide();
    }

    ngOnInit() {
        let response: Response;
        response = this.route.snapshot.data['response'];
        this.nome_usuario = response.nome_usuario;
        this.materias = response.materias;
        this.faltas_totais = response.faltas_totais;
    }

    async toggle_atividades() {
        if (this.atividades) {
            const alert = await this.alertController.create({
                header: 'Atenção',
                message: 'Apenas Estimativas! Caso um dos professores tenha lançado algum peso errado, notas totais incorretas podem aparecer. Neste caso desabilite o cálculo com peso e veja a matéria novamente. Confie totalmente apenas nas notas que não consideram atividades.',
                buttons: [
                    {
                        text: 'Ok',
                        role: 'cancel',
                        handler: () => {
                            return false;
                        }
                    }
                ]
            });

            await alert.present();
        }
    }
}
