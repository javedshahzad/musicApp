import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenrelistPageRoutingModule } from './genrelist-routing.module';

import { GenrelistPage } from './genrelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenrelistPageRoutingModule
  ],
  declarations: [GenrelistPage]
})
export class GenrelistPageModule {}
