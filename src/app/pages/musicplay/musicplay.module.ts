import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicplayPageRoutingModule } from './musicplay-routing.module';

import { MusicplayPage } from './musicplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicplayPageRoutingModule
  ],
  declarations: [MusicplayPage]
})
export class MusicplayPageModule {}
