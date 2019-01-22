import { Injectable } from '@angular/core';
import {Platform, LoadingController} from '@ionic/angular';
import {AdMobPro} from '@ionic-native/admob-pro/ngx';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private platform: Platform, private ad: AdMobPro, private loading: LoadingController) {

  }

  showBanner() {
      if (this.platform.is('cordova')) {
          this.ad.createBanner({adId: 'ca-app-pub-2673132165937114/3387285057', autoShow: true, isTesting: false});
      }
  }

  hideBanner() {
      if (this.platform.is('cordova')) {
          this.ad.hideBanner();
      }
  }

  showInterestial () {
      if (this.platform.is('cordova')) {
          this.ad.prepareInterstitial({adId: 'ca-app-pub-2673132165937114/9820321062', autoShow: true, isTesting: false});
      }
  }

  showVideo () {
      if (this.platform.is('cordova') || true) {
          let loading: any;
          this.loading.create({
             message: 'Carregando vídeo, obrigado!'
          }).then( (res) => {
              loading = res;
              loading.present();
              this.ad.prepareRewardVideoAd({adId: 'ca-app-pub-2673132165937114/4957918768', autoShow: true, isTesting: false}).then(() => {loading.dismiss();});
          });
      }
  }
}
