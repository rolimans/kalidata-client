import { Component, OnInit, ViewChild } from '@angular/core';
import {Slides, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

    @ViewChild('slides') slides: Slides;


    constructor(private storage: Storage, private nav: NavController) { }

  ngOnInit() {
  }

  next() {
      this.slides.slideNext();
  }

  back() {
      this.slides.slidePrev();
  }

  exit() {
      this.storage.set('tutorial', true);
      this.nav.navigateRoot('/login');
  }

}
