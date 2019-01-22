import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import {Network} from '@ionic-native/network/ngx';
import {Platform} from '@ionic/angular';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
    public online: boolean;
    private onlineSub = new Subject<boolean>();
    public obs = this.onlineSub.asObservable();

  constructor(public network: ConnectionService, private platform: Platform, private net: Network) {
      if (this.platform.is('cordova')) {
          this.online = !(this.net.type === 'none');
          this.net.onConnect().subscribe(() => {
              this.online = true;
              this.onlineSub.next(this.online);
          });
          this.net.onDisconnect().subscribe(() => {
              this.online = false;
              this.onlineSub.next(this.online);
          });

      } else {
          this.online = navigator.onLine;
          this.network.monitor().subscribe(isConnected => {
              this.online = isConnected;
              this.onlineSub.next(this.online);
          });
      }
  }
}
