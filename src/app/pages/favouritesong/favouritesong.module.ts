import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesongPageRoutingModule } from './favouritesong-routing.module';

import { FavouritesongPage } from './favouritesong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesongPageRoutingModule
  ],
  declarations: [FavouritesongPage]
})
export class FavouritesongPageModule {}
