import { Component, OnInit } from '@angular/core';
import {KalidataService} from '../services/kalidata.service';
import {ToastController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = '';
  senha = '';
  remember = false;
  private nextUrl: string;

  constructor(private kalidata: KalidataService, public toast: ToastController, private platform: Platform) {}

  ngOnInit() {
      this.nextUrl = this.platform.getQueryParam('url');
  }

  log() {
      if (this.login.length === 0 || this.senha.length === 0) {
          this.presentToast('Preencha todos os campos...');
      } else {
          this.kalidata.login(this.login.toLowerCase(), this.senha, this.remember, this.nextUrl);
      }
  }

    async presentToast(message: string) {
        const toast = await this.toast.create({
            message: message,
            duration: 1500
        });
        toast.present();
    }

}
