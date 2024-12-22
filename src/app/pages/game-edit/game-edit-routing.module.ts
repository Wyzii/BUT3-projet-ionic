import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameEditPage } from './game-edit.page';

const routes: Routes = [
  {
    path: '',
    component: GameEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameEditPageRoutingModule {}
