import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'musicplayer',
    loadChildren: () => import('./pages/musicplayer/musicplayer.module').then( m => m.MusicplayerPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'videoplayer',
    loadChildren: () => import('./pages/videoplayer/videoplayer.module').then( m => m.VideoplayerPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'musicplay',
    loadChildren: () => import('./pages/musicplay/musicplay.module').then( m => m.MusicplayPageModule)
  },
  {
    path: 'genrelist/:genre',
    loadChildren: () => import('./pages/genrelist/genrelist.module').then( m => m.GenrelistPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./pages/language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'favouritesong',
    loadChildren: () => import('./pages/favouritesong/favouritesong.module').then( m => m.FavouritesongPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
