import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../../services/network.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-offline-sign',
  templateUrl: './offline-sign.component.html',
  styleUrls: ['./offline-sign.component.scss']
})
export class OfflineSignComponent implements OnInit {
   show: boolean;
   date: string;

  constructor(private network: NetworkService, private storage: Storage) {
    this.show = !this.network.online;
    this.storage.get('date').then((date) => {
      this.date = date;
    });
    this.network.obs.subscribe((state) => {
       this.show = !state;
        this.storage.get('date').then((date) => {
            this.date = date;
        });
    });
  }

  ngOnInit() {
  }

}
