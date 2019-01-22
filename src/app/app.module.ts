import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';

import { KalidataService } from './services/kalidata.service';
import { LoaderService} from './services/loader.service';
import { NotificationService } from './services/notification.service';
import {SharedModule} from './shared/shared.module';
import {ThemeService} from './services/theme.service';
import {IonicStorageModule} from '@ionic/storage';
import {Network} from '@ionic-native/network/ngx';
import {AdMobPro} from '@ionic-native/admob-pro/ngx';
import {Firebase} from '@ionic-native/firebase/ngx';

@NgModule({
  declarations: [
      AppComponent,
      LoaderComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpModule,
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireMessagingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule.enablePersistence(),
      SharedModule,
      IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    KalidataService,
    NotificationService,
      ThemeService,
    LoaderService,
      Network,
      AdMobPro,
      Firebase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
