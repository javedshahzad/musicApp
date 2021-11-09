import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isupdateLanguage = new BehaviorSubject(true);
  songdata:any={};
  favorite_songs_aray:any=[];
  constructor(
    private loadingCtrl : LoadingController,
    private toastCtrl: ToastController,
  ) { }

  async startload(){
    let loadingEl = await this.loadingCtrl.create({
      message: 'Please Wait...',
      duration:15000,
      spinner:"bubbles"
    });
    loadingEl.present();
  }
  dismisloader(){
    this.loadingCtrl.dismiss();
  }
  showtoast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).then(toastEl => toastEl.present());
  }

}
