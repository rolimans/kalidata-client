import { Injectable } from '@angular/core';
import {KalidataService} from './kalidata.service';
import {NotificationService} from './notification.service';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {AdsService} from './ads.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = false;

  constructor(private kalidataService: KalidataService, private notifications: NotificationService, private storage: Storage, private nav: NavController, private ads: AdsService) {
      this.storage.get('login').then((login) => {
          this.kalidataService.matricula = login;
      });
    this.kalidataService.loggedObs.subscribe(
        (logged) => {
          this.logged = logged[0];
          if (logged[0]) {
              this.ads.showBanner();
          }
          if (logged[0] && logged[1]) {
               this.afterLogin();
          }
        }
    );
  }

  isLogged() {
    return this.logged;
  }

  private afterLogin() {
      this.notifications.requestPermission(this.kalidataService.matricula);
      this.notifications.receiveMessage();
  }

  loggout() {
      this.ads.hideBanner();
      this.ads.showInterestial();
      this.notifications.deleteToken(this.kalidataService.matricula);
      this.kalidataService.matricula = null;
      this.storage.set('token', null);
      this.storage.set('login', null);
      this.storage.set('remember', false);
      this.logged = false;
      this.nav.navigateRoot('/login');
  }
}
