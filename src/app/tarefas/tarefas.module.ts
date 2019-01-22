import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TarefasPage } from './tarefas.page';
import {TarefaComponent} from '../components/tarefa/tarefa.component';

const routes: Routes = [
  {
    path: '',
    component: TarefasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TarefasPage, TarefaComponent]
})
export class TarefasPageModule {}
