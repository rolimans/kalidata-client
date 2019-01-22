import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {URLSearchParams} from '@angular/http';
import {Subject} from 'rxjs';
import {Materia} from '../model/materia';
import {LoaderService} from './loader.service';
import {NavController, ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {NetworkService} from './network.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class KalidataService {
    private subjectResponse = new Subject<any>();
    public subjectResponse$ = this.subjectResponse.asObservable();
    private loggedSub = new Subject<boolean[]>();
    public loggedObs = this.loggedSub.asObservable();
    public matricula: string;
    response: any;


    constructor(private http: Http, private loader: LoaderService, private nav: NavController, public toast: ToastController, private storage: Storage, private network: NetworkService) {this.loggedSub.next([false, false]); }

    login(login: string, senha: string, remember: boolean, nextUrl: string) {
        if (!this.network.online) {
            this.presentToast('Sem conexão com a internet');
            return;
        }

        this.matricula = login;

        const params = new URLSearchParams();

        params.append('login', login);
        params.append('senha', senha);

        this.matricula = login;

        if (remember) {
            this.storage.set('login', login);
        }

        this.getResponse(params, remember, nextUrl);
    }

    login_token (token: string, nextUrl: string) {
        if (!this.network.online) {
            this.storage.get('response').then((response) => {
                this.loader.show();
                this.response = JSON.parse(response);
                this.parseResponse();
                this.subjectResponse.next(this.response);
                this.loggedSub.next([true, true]); // SECOND TRUE DOES NOTHING, BUT OK;
                setTimeout(() => {this.nav.navigateRoot('/at/page/(diary:diary)'); }, 100);
                // setTimeout(() => {this.loader.hide(); }, 1200);
            });

            this.network.obs.subscribe((state) => {
                if (state) {
                    const params_s = new URLSearchParams();

                    params_s.append('token', token);

                    setTimeout(() => {this.getResponse(params_s, true, 'afteroff'); }, 2000);
                }
            });

            return;
        }
        const params = new URLSearchParams();

        params.append('token', token);

        this.getResponse(params, true, nextUrl);
    }


    private getResponse(params, remember, nextUrl?) {
        this.loader.show();

        const url = 'https://kalidata.app/res';

        this.http.post(url, params).subscribe(
            response => {
                this.response = response.json();
                try {
                    if (this.response.error.length > 0) {
                        if (this.response.error[0] === 'Login ou senha incorreta') {
                            this.loader.hide();
                            this.presentToast('Login ou senha incorreta...');
                        } else if (this.response.error[0] === 'Navigation Timeout Exceeded: 30000ms exceeded') {
                            this.storage.get('response').then((memory) => {
                                if (memory === null || memory === undefined) {
                                    this.loader.hide();
                                    this.presentToast('Tempo de carregamento excedido. Tente novamente...');
                                } else {
                                    this.response = JSON.parse(memory);
                                    this.parseResponse();
                                    this.subjectResponse.next(this.response);
                                    this.loggedSub.next([true, true]); // SECOND TRUE DOES NOTHING, BUT OK;
                                    setTimeout(() => {this.nav.navigateRoot('/at/page/(diary:diary)'); }, 100);
                                    // setTimeout(() => {this.loader.hide(); }, 1200);
                                }
                            });
                        } else if (this.response.error[0] === 'Preencha todos os campos') {
                            this.loader.hide();
                            this.presentToast('Preencha todos os campos...');
                        } else if (this.response.error[0] === 'Você precisa atualizar seus dados no site do Qualidata!') {
                            this.loader.hide();
                            this.presentToast('Você precisa atualizar seus dados no site do Qualidata! Acesse o Qualidata oficial.');
                        } else {
                            this.loader.hide();
                            this.loggedSub.next([false, false]);
                            this.nav.navigateRoot('/login');
                            this.presentToast('Erro desconhecido, contate o desenvolvedor...');
                            console.log(this.response.error);
                        }
                    } else {
                        let date: any = new Date();
                        date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
                        this.storage.set('date', date);
                        this.storage.set('response', JSON.stringify(this.response));
                        if (remember) {
                            this.storage.set('token', this.response.token);
                            this.storage.set('remember', true);
                        }
                        this.parseResponse();
                        this.subjectResponse.next(this.response);
                        this.loggedSub.next([true, remember]);
                        if (nextUrl == null) {
                            nextUrl = '/at/page/(diary:diary)';
                        }

                        if (nextUrl === 'afteroff') {
                            nextUrl = '/at/page/(diary:diary)';
                            setTimeout(() => {this.loader.hide(); }, 1600);
                        }

                        this.nav.navigateRoot(nextUrl);

                        if (!nextUrl.includes('diary')) {
                            setTimeout(() => {this.loader.hide(); }, 1500);
                        }
                        // setTimeout(() => {this.loader.hide(); }, 1500);
                    }
                } catch (e) {
                    this.loader.hide();
                    this.loggedSub.next([false, false]);
                    this.nav.navigateRoot('/login');
                    this.presentToast('Erro desconhecido, contate o desenvolvedor...');
                }
            },
            error => {
                this.loader.hide();
                this.loggedSub.next([false, false]);
                this.nav.navigateRoot('/login');
                this.presentToast('Erro desconhecido, contate o desenvolvedor...');
            }
        );
    }

    parseResponse() {
        let aux: any;
        aux = new Response();
        aux.nome_usuario = this.response.nome;
        aux.faltas_totais = this.response.faltas_totais;
        aux.turma = this.response.turma;
        aux.materias = [];
        this.response.materias.forEach((materia) => {
            aux.materias.push(new Materia(materia));
        });
        aux.materias.sort(this.nome);
        this.response = aux;
    }

    nome(a, b) {
        if (a.nome < b.nome) {
            return -1;
        }

        if (a.nome > b.nome) {
            return 1;
        }
        return 0;
    }

    async presentToast(message: string) {
        const toast = await this.toast.create({
            message: message,
            duration: 1500
        });
        toast.present();
    }
}
