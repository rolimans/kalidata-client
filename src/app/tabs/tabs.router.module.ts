import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {DiarioPage} from '../diario/diario.page';
import {SobrePage} from '../sobre/sobre.page';
import {ResolveKalidataService} from '../services/resolve-kalidata.service';
import {GuardAuthService} from '../services/guard-auth.service';
import {TarefasPage} from '../tarefas/tarefas.page';

const routes: Routes = [
  {
    path: 'page',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/at/page/(diary:diary)',
        pathMatch: 'full',
      },
      {
        path: 'diary',
          resolve: {
           response: ResolveKalidataService
          },
          canActivate: [GuardAuthService],
        outlet: 'diary',
        component: DiarioPage
      },
        {
            path: 'tasks',
            resolve: {
                response: ResolveKalidataService
            },
            canActivate: [GuardAuthService],
            outlet: 'tasks',
            component: TarefasPage
        },

        {
            path: 'about',
            outlet: 'about',
            component: SobrePage
        }
    ]
  },
  {
    path: '',
    redirectTo: '/at/page/(diary:diary)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
