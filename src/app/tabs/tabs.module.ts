import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import {DiarioPageModule} from '../diario/diario.module';
import {SharedModule} from '../shared/shared.module';
import {SobrePageModule} from '../sobre/sobre.module';
import {TarefasPageModule} from '../tarefas/tarefas.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    DiarioPageModule,
      SobrePageModule,
      TarefasPageModule,
      SharedModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
