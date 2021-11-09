import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicplayPage } from './musicplay.page';

const routes: Routes = [
  {
    path: '',
    component: MusicplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicplayPageRoutingModule {}
