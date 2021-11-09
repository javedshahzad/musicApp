import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenrelistPage } from './genrelist.page';

const routes: Routes = [
  {
    path: '',
    component: GenrelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenrelistPageRoutingModule {}
