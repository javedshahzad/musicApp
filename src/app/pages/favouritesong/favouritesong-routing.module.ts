import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouritesongPage } from './favouritesong.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritesongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritesongPageRoutingModule {}
