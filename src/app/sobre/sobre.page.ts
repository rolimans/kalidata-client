import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {AuthService} from '../services/auth.service';
import {AdsService} from '../services/ads.service';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {
    toogle: boolean;

  constructor(private theme: ThemeService, public auth: AuthService, private ad: AdsService, public platform: Platform) {
      if (this.theme.toogle == null) {
          this.theme.subjectResponse$.subscribe((toogle) => {
              this.toogle = toogle;
          });
      } else {
          this.toogle = this.theme.toogle;
      }
  }


  dark() {
    this.theme.setDark();
  }

  light() {
    this.theme.setLight();
  }

  ngOnInit() {
  }

  change() {
      if (this.toogle) {
          this.dark();
      } else {
          this.light();
      }
  }

  loggout() {
      this.auth.loggout();
  }

  video () {
      this.ad.showVideo();
  }

  link (tag) {
      tag.click();
  }
}
