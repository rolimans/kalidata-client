import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import {take} from 'rxjs/operators';
import { AlertController, NavController, Platform } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Firebase} from '@ionic-native/firebase/ngx';
import {LoaderService} from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    constructor(
        private angularFireDB: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging,
        private alertController: AlertController,
        private nav: NavController,
        private storage: Storage,
        private platform: Platform,
        private firebaseNative: Firebase,
        private loader: LoaderService
    ) {
        if (!this.platform.is('cordova')) {
            this.angularFireMessaging.messaging.subscribe(
                (_messaging) => {
                    _messaging.onMessage = _messaging.onMessage.bind(_messaging);
                    _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
                }
            );
        }
    }

    updateToken(userId, token) {
        let aux;
        if (this.platform.is('cordova')) {
            aux = 'Mob';
        } else {
            aux = 'Web';
        }

        this.angularFireAuth.authState.pipe(take(1)).subscribe(
            () => {
                const data = {};
                data[userId] = token;
                this.angularFireDB.object('fcmTokens' + aux + '/').update(data);
            });
    }

    deleteToken(userId) {
        let aux;

        if (this.platform.is('cordova')) {
            aux = 'Mob';
        } else {
            aux = 'Web';
        }

        this.angularFireAuth.authState.pipe(take(1)).subscribe(
            () => {
                const data = {};
                data[userId] = null;
                this.angularFireDB.object('fcmTokens' + aux + '/').update(data);
            });
    }

    requestPermission(userId) {
        if (this.platform.is('cordova')) {
            this.firebaseNative.getToken().then( (token) => {
                if (token != null) {
                    this.updateToken(userId, token);
                }
            });

        } else {
            this.angularFireMessaging.requestToken.subscribe(
                (token) => {
                    if (token !== null) {
                        this.updateToken(userId, token);
                    }
                },
                (err) => {
                }
            );
        }
    }

    receiveMessage() {
        if (this.platform.is('cordova')) {
            this.firebaseNative.onNotificationOpen().subscribe((data) => {
                const title = data.title;
                const message = data.body;
                let url = null;
                try {url = data.url; } catch (err) {}
                if (!data.tap) {
                    this.notify(title, message, null, 'Ok');
                } else {
                    if (url !== null) {
                        this.nav.navigateForward(url);
                        setTimeout(() => { this.loader.hide(); }, 1500);
                    }
                }

            });
        } else {
            this.angularFireMessaging.messages.subscribe(
                (payload) => {
                    const aux: any = payload;
                    const title = aux.notification.title;
                    const message = aux.notification.body;
                    this.notify(title, message, null, 'Ok');
                });
        }
    }

    async notify(title, message, url, btntext ) {
        const alert = await this.alertController.create({
            header: title,
            message: message + '<br>Reabra o aplicativo para ver as mudanças.',
            buttons: [
                {
                    text: 'Fechar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        return false;
                    }
                }, {
                    text: btntext,
                    handler: () => {
                        return;
                    }
                }
            ]
        });

        await alert.present();
    }
}
