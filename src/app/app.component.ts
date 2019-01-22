import {Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {NotificationService} from './services/notification.service';
import {ThemeService} from './services/theme.service';
import {KalidataService} from './services/kalidata.service';
import {NetworkService} from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notifications: NotificationService,
    private theme: ThemeService,
    private kalidata: KalidataService,
    private network: NetworkService,
  ) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#f8f8f8');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    }
}
