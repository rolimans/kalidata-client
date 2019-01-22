import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { Storage } from '@ionic/storage';
import {Subject} from 'rxjs';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
    private dark = '--ion-toolbar-text-color: #e0dede; --ion-toolbar-background-color: #23303d; --ion-tabbar-background-color: #23303d; --ion-tabbar-background-color-focused: #243447; --ion-background-color: #243447; --ion-text-color-step-150: #FFFFFF; --ion-text-color-step-450: #d6d6d6; --ion-text-color: #e5e5e5; --ion-tabbar-text-color-active: #FFFFFF; --ion-text-color-step-400: #d6d6d6; --ion-overlay-background-color: #161f28; --ion-background-color-step-50: #0d1216; --ion-item-background-color-active: #23303d; --ion-color-primary: #FFFFFF; --ion-color-primary-rgb: 255,255,255; --ion-color-primary-contrast: #243447; --ion-color-primary-contrast-rgb: 0,0,0; --ion-color-primary-shade: #FFFFFF; --ion-color-primary-tint: #243447; --ion-color-secondary: #FFFFFF; --ion-color-secondary-rgb: 255,255,255; --ion-color-secondary-contrast: #243447; --ion-color-secondary-contrast-rgb: 0,0,0; --ion-color-secondary-shade: #3e3e3e; --ion-color-secondary-tint: #595959; --ion-color-tertiary: #243447; --ion-color-tertiary-rgb: 0,0,0; --ion-color-tertiary-contrast: #ffffff; --ion-color-tertiary-contrast-rgb: 255,255,255; --ion-color-tertiary-shade: #243447; --ion-color-tertiary-tint: #243447; --ion-color-success: #10dc60; --ion-color-success-rgb: 16,220,96; --ion-color-success-contrast: #ffffff; --ion-color-success-contrast-rgb: 255,255,255; --ion-color-success-shade: #0ec254; --ion-color-success-tint: #28e070; --ion-color-warning: #ffce00; --ion-color-warning-rgb: 255,206,0; --ion-color-warning-contrast: #ffffff; --ion-color-warning-contrast-rgb: 255,255,255; --ion-color-warning-shade: #e0b500; --ion-color-warning-tint: #ffd31a; --ion-color-danger: #f04141; --ion-color-danger-rgb: 245,61,61; --ion-color-danger-contrast: #ffffff; --ion-color-danger-contrast-rgb: 255,255,255; --ion-color-danger-shade: #d33939; --ion-color-danger-tint: #f25454; --ion-color-dark: #222428; --ion-color-dark-rgb: 34,34,34; --ion-color-dark-contrast: #ffffff; --ion-color-dark-contrast-rgb: 255,255,255; --ion-color-dark-shade: #1e2023; --ion-color-dark-tint: #383a3e; --ion-color-medium: #989aa2; --ion-color-medium-rgb: 152,154,162; --ion-color-medium-contrast: #ffffff; --ion-color-medium-contrast-rgb: 255,255,255; --ion-color-medium-shade: #86888f; --ion-color-medium-tint: #a2a4ab; --ion-color-light: #23303d; --ion-color-light-rgb: 244,244,244; --ion-color-light-contrast: #FFFFFF; --ion-color-light-contrast-rgb: 0,0,0; --ion-color-light-shade: #d7d8da; --ion-color-light-tint: #f5f6f9; --color-label: #e0e0e0;';
    private light = '--ion-tabbar-text-color-active: #000000; --ion-color-primary: #000000; --ion-color-primary-rgb: 0,0,0; --ion-color-primary-contrast: #ffffff; --ion-color-primary-contrast-rgb: 255,255,255; --ion-color-primary-shade: #000000; --ion-color-primary-tint: #1a1a1a; --ion-color-secondary: #474747; --ion-color-secondary-rgb: 71,71,71; --ion-color-secondary-contrast: #ffffff; --ion-color-secondary-contrast-rgb: 255,255,255; --ion-color-secondary-shade: #3e3e3e; --ion-color-secondary-tint: #595959; --ion-color-tertiary: #000000; --ion-color-tertiary-rgb: 0,0,0; --ion-color-tertiary-contrast: #ffffff; --ion-color-tertiary-contrast-rgb: 255,255,255; --ion-color-tertiary-shade: #000000; --ion-color-tertiary-tint: #1a1a1a; --ion-color-success: #10dc60; --ion-color-success-rgb: 16,220,96; --ion-color-success-contrast: #ffffff; --ion-color-success-contrast-rgb: 255,255,255; --ion-color-success-shade: #0ec254; --ion-color-success-tint: #28e070; --ion-color-warning: #ffce00; --ion-color-warning-rgb: 255,206,0; --ion-color-warning-contrast: #ffffff; --ion-color-warning-contrast-rgb: 255,255,255; --ion-color-warning-shade: #e0b500; --ion-color-warning-tint: #ffd31a; --ion-color-danger: #f04141; --ion-color-danger-rgb: 245,61,61; --ion-color-danger-contrast: #ffffff; --ion-color-danger-contrast-rgb: 255,255,255; --ion-color-danger-shade: #d33939; --ion-color-danger-tint: #f25454; --ion-color-dark: #222428; --ion-color-dark-rgb: 34,34,34; --ion-color-dark-contrast: #ffffff; --ion-color-dark-contrast-rgb: 255,255,255; --ion-color-dark-shade: #1e2023; --ion-color-dark-tint: #383a3e; --ion-color-medium: #989aa2; --ion-color-medium-rgb: 152,154,162; --ion-color-medium-contrast: #ffffff; --ion-color-medium-contrast-rgb: 255,255,255; --ion-color-medium-shade: #86888f; --ion-color-medium-tint: #a2a4ab; --ion-color-light: #f4f5f8; --ion-color-light-rgb: 244,244,244; --ion-color-light-contrast: #000000; --ion-color-light-contrast-rgb: 0,0,0; --ion-color-light-shade: #d7d8da; --ion-color-light-tint: #f5f6f9; --color-label: #808080;';
    toogle: boolean;
    private subjectResponse = new Subject<boolean>();
    public subjectResponse$ = this.subjectResponse.asObservable();

    constructor(@Inject(DOCUMENT) private document: Document, private storage: Storage, private statusBar: StatusBar) {
      storage.get('theme').then(theme => {
          if (theme === 'dark') {
              this.setDark();
              this.toogle = true;
              this.subjectResponse.next(this.toogle);
          } else {
              this.setLight();
              this.toogle = false;
              this.subjectResponse.next(this.toogle);
          }
      });
  }

  setDark() {
        this.statusBar.backgroundColorByHexString('#23303d');
        this.statusBar.styleLightContent()
      this.storage.set('theme', 'dark');
      this.setGlobalCSS(this.dark);
      this.changeTabColor( 'dark');
  }

  setLight() {
      this.statusBar.backgroundColorByHexString('#f8f8f8');
      this.statusBar.styleDefault();
      this.storage.set('theme', 'light');
      this.changeTabColor( 'light');
      this.setGlobalCSS(this.light);
    }


    private setGlobalCSS(css: string) {
        this.document.documentElement.style.cssText = css;
  }

  private changeTabColor(theme) {
        if (theme === 'dark'){
            this.document.getElementById('tab_color').setAttribute('content', '#23303d');
        } else {
            this.document.getElementById('tab_color').setAttribute('content', '#f8f8f8');
        }
  }
}
