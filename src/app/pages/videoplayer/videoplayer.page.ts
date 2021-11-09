import { Component, OnInit } from '@angular/core';
// import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.page.html',
  styleUrls: ['./videoplayer.page.scss'],
})
export class VideoplayerPage implements OnInit {
  // videoOptions: VideoOptions
  constructor(
    // private videoPlayer: VideoPlayer,
    private loadingCtrl: LoadingController,
  ) {
  
   }

  ngOnInit() {
  }

  // playOfflineVideo() {
  //   this.videoPlayer.play('assets/video.mp4').then(() => {
  //     console.log('video finished');
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }

  // playOnlineVideo() {
  //   this.startload();
  //   // alert("OKKKKKKKK");
  //   this.videoOptions = {
  //     volume: 0.7,
  //     scalingMode:1
  //   };
  //   //http://static.videogular.com/assets/videos/elephants-dream.mp4
  //   this.videoPlayer.play('http://static.videogular.com/assets/videos/elephants-dream.mp4',this.videoOptions).then((res) => {
  //     console.log('video finished');
  //     this.dismisloader();
  //     console.log(res);
  
  //   }).catch(error => {
  //     alert(error)
  //     this.dismisloader();
  //     // alert("ERRRRRRRRRRRR")
  //     // console.log(error);
  //   });
  // }

  // closeVideoPlayer() {
  //   this.videoPlayer.close();
  // }
  // playVideoHosted() {
  //   this.videoPlayer.play('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4').then(() => {
  //     console.log('video completed');
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }
  // ngOnDestroy() {
  //   this.videoPlayer.close();
  // }
  // async startload(){
  //   let loadingEl = await this.loadingCtrl.create({
  //     message: 'Please Wait...',
  //     duration:3000,
  //     spinner:"bubbles"
  //   });
  //   loadingEl.present();
  // }
  // dismisloader(){
  //   this.loadingCtrl.dismiss();
  // }
}
