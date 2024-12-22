import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then( m => m.GamesPageModule)
  },
  {
    path: 'games/:id',
    loadChildren: () => import('./pages/game-details/game-details.module').then( m => m.GameDetailsPageModule)
  },
  {
    path: 'game/create',
    loadChildren: () => import('./pages/game-create/game-create.module').then( m => m.GameCreatePageModule)
  },
  {
    path: 'game/edit/:id',
    loadChildren: () => import('./pages/game-edit/game-edit.module').then( m => m.GameEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
