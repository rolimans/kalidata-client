import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {NavController, Platform} from '@ionic/angular';
import {AuthService} from './auth.service';
import {Storage} from '@ionic/storage';
import {KalidataService} from './kalidata.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginService  implements  CanActivate {
    private nextUrl: string;

    constructor(private auth: AuthService, private nav: NavController, private storage: Storage, private kalidataService: KalidataService, private platform: Platform) {

        this.nextUrl = this.platform.getQueryParam('url');

        let token;

        storage.get('token').then(t => {
           token = t;
        });

        storage.get('remember').then(remember => {
            if (!this.auth.isLogged() && remember) {
                this.kalidataService.login_token(token, this.nextUrl);
            }
        });

        this.storage.get('tutorial').then(tutorial => {
            if (tutorial !== true && !this.platform.is('ios')) {
                setTimeout(() => {this.nav.navigateRoot('/tutorial'); }, 300);
            }
        });
    }

    canActivate() {
        if (!this.auth.isLogged()) {
            return true;
        } else {
            this.nav.navigateRoot('/at/page/(diary:diary)');
            return false;
        }
    }
}
