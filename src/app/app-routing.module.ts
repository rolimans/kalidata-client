import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResolveKalidataService} from './services/resolve-kalidata.service';
import {GuardAuthService} from './services/guard-auth.service';
import {GuardLoginService} from './services/guard-login.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'at', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'atividadeDe/:nome',
      resolve: {
          response: ResolveKalidataService
      },
      loadChildren: './atividade-de/atividade-de.module#AtividadeDePageModule',
      canActivate: [GuardAuthService],
  },
  { path: 'boletimDe/:nome', loadChildren: './boletim-de/boletim-de.module#BoletimDePageModule',
      resolve: {
          response: ResolveKalidataService
      },
      canActivate: [GuardAuthService],
    },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [GuardLoginService] },
    { path: 'about', loadChildren: './sobre/sobre.module#SobrePageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'novaTarefa', loadChildren: './nova-tarefa/nova-tarefa.module#NovaTarefaPageModule', canActivate: [GuardAuthService], resolve: {response: ResolveKalidataService}},
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
