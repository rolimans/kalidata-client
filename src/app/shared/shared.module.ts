import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BimestreMateriaComponent} from '../components/bimestre-materia/bimestre-materia.component';
import {AtividadeComponent} from '../components/atividade/atividade.component';
import {BimestreComponent} from '../components/bimestre/bimestre.component';
import {MateriaComponent} from '../components/materia/materia.component';
import {IonicModule} from '@ionic/angular';
import {SearchPipe} from '../pipes/search.pipe';
import {OfflineSignComponent} from '../components/offline-sign/offline-sign.component';

@NgModule({
  imports: [
    CommonModule,
      IonicModule
  ],
  declarations: [
      BimestreMateriaComponent,
      AtividadeComponent,
      BimestreComponent,
      MateriaComponent,
      OfflineSignComponent,
        SearchPipe
  ],
    providers: [
        SearchPipe
    ],
    exports: [
        BimestreMateriaComponent,
        AtividadeComponent,
        BimestreComponent,
        MateriaComponent,
        OfflineSignComponent,
        SearchPipe
    ]

})
export class SharedModule { }
