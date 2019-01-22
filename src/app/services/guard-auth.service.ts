import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import { NavController} from '@ionic/angular';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  constructor(private auth: AuthService, private nav: NavController) {}

  canActivate() {
    if (this.auth.isLogged()) {
      return true;
    } else {
        this.nav.navigateRoot('/login');
        return false;
    }
  }

}
