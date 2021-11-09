/**
 * Ionic 4 Spotify app starter - Ion Spotify (https://store.enappd.com/product/ionic-4-spotify-app-starter)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { Platform, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.page.html',
  styleUrls: ['./musicplayer.page.scss'],
})
export class MusicplayerPage implements OnInit {
  title: any;
  artist: any;
  image: string = 'assets/album_art.jpg';
  filename: any = 'Baba O`reily';
  duration: any = -1;
  curr_playing_file: MediaObject;
  storageDirectory: any;
  play_The_track: string = "https://ia800207.us.archive.org/29/items/MLKDream/MLKDream_64kb.mp3"; //note this specific url format is used in android only
  position: any = 0;
  get_position_interval: any;
  is_playing = false;
  is_in_play = false;
  is_ready = false;
  get_duration_interval: any;
  display_position: any = '00:00';
  display_duration: any = '00:00';
  constructor(
    public platform: Platform,
    private media: Media,
    private loadingCtrl: LoadingController,
  ) {

  }

  ngOnInit() {
    // comment out the following line when adjusting UI in browsers
    this.prepareAudioFile();
  }

  prepareAudioFile() {
    this.platform.ready().then((res) => {
      this.getDuration();
    });
  }

  async startload(){
    let loadingEl = await this.loadingCtrl.create({
      message: 'Please Wait...',
      duration:3000,
      spinner:"bubbles"
    });
    loadingEl.present();
  }
  dismisloader(){
    this.loadingCtrl.dismiss();
  }
   getDuration() {
    this.startload();
    this.curr_playing_file = this.media.create(this.play_The_track);
    // on occassions, the plugin only gives duration of the file if the file is played
    // at least once
    this.curr_playing_file.play();

    this.curr_playing_file.setVolume(0.0);  // you don't want users to notice that you are playing the file
    const self = this;
    // The plugin does not give the correct duration on playback start
    // Need to check for duration repeatedly
    let temp_duration = self.duration;
    this.get_duration_interval = setInterval(() => {
      if (self.duration === -1 || !self.duration) {
        this.dismisloader();
        self.duration = ~~(self.curr_playing_file.getDuration());  // make it an integer
      } else {
        if (self.duration !== temp_duration) {
          temp_duration = self.duration;
          this.dismisloader();
        
        }
        else {
      
          self.curr_playing_file.stop();
          self.curr_playing_file.release();
          this.dismisloader();
          clearInterval(self.get_duration_interval);
          this.display_duration = this.toHHMMSS(self.duration);
          self.setToPlayback();
        }
      }
    }, 100);
  }

  setToPlayback() {
    this.startload();
    this.curr_playing_file = this.media.create(this.play_The_track);
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      switch (status) {
        case 1:
          break;
        case 2:   // 2: playing
          this.is_playing = true;
          break;
        case 3:   // 3: pause
          this.is_playing = false;
          break;
        case 4:   // 4: stop
        default:
          this.is_playing = false;
          break;
      }
    });
    this.is_ready = true;
    this.dismisloader();
    this.getAndSetCurrentAudioPosition();
  }

  getAndSetCurrentAudioPosition() {
    this.startload();
    const diff = 1;
    const self = this;
    this.get_position_interval = setInterval(() => {
      const last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then((position) => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            this.dismisloader();
            self.curr_playing_file.seekTo(last_position * 1000);

          } else {
            // update position for display
            self.position = position;
            this.dismisloader();
            this.display_position = this.toHHMMSS(self.position);
          }
        } else if (position >= self.duration) {
          self.stop();

          this.dismisloader;
          self.setToPlayback();
        }
      });
    }, 100);
  }

  play() {
    this.curr_playing_file.play();
  }

  pause() {
    this.curr_playing_file.pause();
  }

  stop() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  controlSeconds(action) {
    
    const step = 5;
    const numberRange = this.position;
    switch (action) {
      case 'back':
        this.position = numberRange < step ? 0.001 : numberRange - step;
        break;
      case 'forward':
        this.position = numberRange + step < this.duration ? numberRange + step : this.duration;
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.stop();
  }

  toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i >= 0)
      .join(":")
  }

}