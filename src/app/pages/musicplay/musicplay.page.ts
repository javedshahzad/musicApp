import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-musicplay',
  templateUrl: './musicplay.page.html',
  styleUrls: ['./musicplay.page.scss'],
})
export class MusicplayPage implements OnInit {
  title :any;
  filename :any;
  curr_playing_file: MediaObject;
  storageDirectory: any;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

  duration: any = -1;
  position: any = 0;

  get_duration_interval: any;
  get_position_interval: any;
  image: any;
  newsource: any;
  artist: string;
  hearticon="heart-outline";
  songid: string;
  getfavourite: any=[];
  language_data:any={};
  voted_song:boolean=true;
  fav_list_array:any=[];
  songDetails:any={};
  source: string;
  newwarr:any=[];
  date_of_vote: any;
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private transfer: FileTransfer,
    private media: Media,
    private datePipe: DatePipe,
    private http: HttpClient,
    private nav : NavController,
    private Api : ApiService,
  ) {
      this.getdatafromsong();
      this.Api.isupdateLanguage.subscribe(_isLogin=>{
      this.getlanguage();
    })
      this. get_favouritesongcheck();
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      } else {
        this.storageDirectory = this.file.cacheDirectory;
      }
    });
   }

  ngOnInit() {
    this.prepareAudioFile();
  }
  getdatafromsong(){
    this.title=localStorage.getItem("title");
    this.image=localStorage.getItem('image');
    this.newsource=localStorage.getItem("source");
    this.artist=localStorage.getItem('artist');
    this.source=localStorage.getItem("source");
    this.filename=this.title.split(' ').join('_');
    console.log(this.filename);
    
  }
  prepareAudioFile() {
   
    // alert(source)

    let url ='https://popsaxony.net/public/upload/songs/'+this.source;
    this.platform.ready().then(() => {
      this.file
        .resolveDirectoryUrl(this.storageDirectory)
        .then(resolvedDirectory => {
          // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
          console.log('resolved  directory: ' + resolvedDirectory.nativeURL);
          this.file
            .checkFile(resolvedDirectory.nativeURL, this.filename)
            .then(data => {
              if (data == true) {
                // exist
                 this.getDurationAndSetToPlay();
              } else {
                // not sure if File plugin will return false. go to download
                console.log('not found!');
                throw { code: 1, message: 'NOT_FOUND_ERR' };
              }
            })
            .catch(async err => {
              console.log('Error occurred while checking local files:');
              console.log(err);
              if (err.code == 1) {
                // not found! download!
                console.log('not found! download!');
                let loadingEl = await this.loadingCtrl.create({
                  message: this.language_data.downloading_song,
                  // duration:10000,
                  spinner:"bubbles"
                });
                loadingEl.present();
                const fileTransfer: FileTransferObject = this.transfer.create();
                fileTransfer
                  .download(url, this.storageDirectory + this.filename)
                  .then(entry => {
                    console.log('download complete' + entry.toURL());
                    loadingEl.dismiss();
                     this.getDurationAndSetToPlay();
                  })
                  .catch(err_2 => {
                    console.log('Download error!');
                    loadingEl.dismiss();
                    console.log(err_2);
                  });
              }
            });
        });
    });
  }
  createAudioFile(pathToDirectory, filename): MediaObject {
    if (this.platform.is('ios')) {
      //ios
      return this.media.create(
        pathToDirectory.replace(/^file:\/\//, '') + '/' + filename
      );
    } else {
      // android
      return this.media.create(pathToDirectory + filename);
    }
  }
  getDurationAndSetToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.filename
    );

    this.curr_playing_file.play();
    this.curr_playing_file.setVolume(0.9); // you don't want users to notice that you are playing the file
    let self = this;
    this.get_duration_interval = setInterval(function() {
      if (self.duration == -1) {
        self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
      } else {
        self.curr_playing_file.stop();
        self.curr_playing_file.release();
        self.setRecordingToPlay();
        clearInterval(self.get_duration_interval);
      }
    }, 100);
    // this.playRecording();
  }
  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function() {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then(position => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.stopPlayRecording();
          self.setRecordingToPlay();
        }
      });
    }, 100);
  }
  setRecordingToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.filename
    );
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      this.message = status;
      switch (status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2: // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3: // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4: // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    });
    console.log('audio file set');
    this.message = 'audio file set';
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
    this.playRecording();
  }
  playRecording() {
    this.curr_playing_file.play();
    this.toastCtrl
      .create({
        // position:"top",
        // color:"primary",
        message:this.language_data.start_playing + this.fmtMSS(this.position),
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }
  pausePlayRecording() {
    this.curr_playing_file.pause();
    this.toastCtrl
      .create({
        message: this.language_data.pause_at + this.fmtMSS(this.position),
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }
  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }
  ngOnDestroy() {
    this.stopPlayRecording();
  }

  controlSeconds(action) {
    var action=action;
    // const currentIndex = this.Api.ShuffleSongList.indexOf(this.Api.songdata);
    // const nextIndex = (currentIndex + 1) %  this.Api.ShuffleSongList.length;
    // this.Api.ShuffleSongList[nextIndex];
    // console.log(this.Api.ShuffleSongList[nextIndex]);
    // this.songDetails=this.Api.ShuffleSongList[nextIndex];

    this.Api.ShuffleSongList[Math.floor(Math.random()*this.Api.ShuffleSongList.length)];
    console.log(this.Api.ShuffleSongList[Math.floor(Math.random()*this.Api.ShuffleSongList.length)])

    
    this.songDetails=this.Api.ShuffleSongList[Math.floor(Math.random()*this.Api.ShuffleSongList.length)];
    console.log(this.songDetails)
    this.Api.songdata=this.songDetails;
    this.title=this.songDetails.title;
    this.source=this.songDetails.source;
    this.image=this.songDetails.image;
    this.artist=this.songDetails.artist;
    
    localStorage.setItem("image",this.songDetails.image);
    localStorage.setItem("source",this.songDetails.source);
    localStorage.setItem("title",this.songDetails.title);
    localStorage.setItem("artist",this.songDetails.artist)
    localStorage.setItem("songid",this.songDetails.id);
    this.stopPlayRecording();
    this.getdatafromsong();
    setTimeout(() => {
      this.prepareAudioFile();
    }, 500);
    // let number = this.position;
    // switch (action) {
    //   case 'back':
    //     this.position = number < step ? 0.001 : number - step;
    //     this.toastCtrl
    //       .create({
    //         message: `Went back ${step}`,
    //         duration: 2000
    //       })
    //       .then(toastEl => toastEl.present());
    //     break;
    //   case 'forward':
    //     this.position =
    //       number + step < this.duration ? number + step : this.duration;
    //     this.toastCtrl
    //       .create({
    //         message: `Went forward ${step}`,
    //         duration: 2000
    //       })
    //       .then(toastEl => toastEl.present());
    //     break;
    //   default:
    //     break;
    // }
  }
  fmtMSS(s) {
    // alert(s);
    return this.datePipe.transform(s * 1000, 'mm:ss');

    /** The following has been replaced with Angular DatePipe */
    // // accepts seconds as Number or String. Returns m:ss
    // return (
    //   (s - // take value s and subtract (will try to convert String to Number)
    //     (s %= 60)) / // the new value of s, now holding the remainder of s divided by 60
    //     // (will also try to convert String to Number)
    //     60 + // and divide the resulting Number by 60
    //   // (can never result in a fractional value = no need for rounding)
    //   // to which we concatenate a String (converts the Number to String)
    //   // who's reference is chosen by the conditional operator:
    //   (9 < s // if    seconds is larger than 9
    //     ? ':' // then  we don't need to prepend a zero
    //     : ':0') + // else  we do need to prepend a zero
    //   s
    // ); // and we add Number s to the string (converting it to String as well)
  }
  back(){
    this.nav.navigateBack("genrelist/"+localStorage.getItem("genre"))
  }
  vote(){
    this.get_favouritesongcheck();
    var today3 = new Date();
    var date = today3.getFullYear()+'-'+(today3.getMonth()+1)+'-'+today3.getDate();
    var time = today3.getHours() + ":" + today3.getMinutes() + ":" + today3.getSeconds();
    var dateTime = date;
    console.log(dateTime);
   if(this.date_of_vote != dateTime){
    this.songid=localStorage.getItem("songid");
    this.Api.startload();
      let url='https://popsaxony.net/popsaxony/public/song/vote-mobile/adkoq12jsdfk3ijdhahvcx8/'+this.songid;
      this.http.get(url).subscribe((res:any)=>{
        console.log(res);
        if(res=true){
          this.getfavourite = JSON.parse(localStorage.getItem("myfavoritesong"));
           if(this.getfavourite != undefined){
            this.Api.songdata.voted_date=dateTime;
            let obj =this.Api.songdata;
            let arr = this.getfavourite ;
            // add obj to array
             this.newwarr = [...arr,obj];
            console.log(this.newwarr) // [{ name: 'Bob' }, { name: 'John' }];
            localStorage.setItem("myfavoritesong",JSON.stringify(this.newwarr));
            this.hearticon="heart";
            this.Api.showtoast(this.language_data.voted);
           }else{
            this.Api.songdata.voted_date=dateTime;
            let obj =this.Api.songdata;
            let arr = [];
            // add obj to array
             this.newwarr = [...arr,obj];
            console.log(this.newwarr) // [{ name: 'Bob' }, { name: 'John' }];
            localStorage.setItem("myfavoritesong",JSON.stringify(this.newwarr));
            this.hearticon="heart";
            this.Api.showtoast(this.language_data.voted);
           }
           this.Api.dismisloader();
        }else{
          this.Api.dismisloader();
          this.Api.showtoast(this.language_data.already_voted);
        }
      // console.log(this.valuerarray);


    })
   }else{
    this.Api.showtoast(this.language_data.already_voted);
   }
   
  }
  get_favouritesongcheck(){
    this.getfavourite = JSON.parse(localStorage.getItem("myfavoritesong"));
    if(this.getfavourite != undefined){
      let arr=this.getfavourite;
      let x = arr.filter((a)=>{if(a.id==localStorage.getItem("songid")){return a}});
      console.log(x)
      if(x.length > 0){
        for(const data of x){
          this.date_of_vote= data.voted_date;
        }
        console.log(this.date_of_vote);
        this.hearticon="heart";
      }
    }else{
      this.date_of_vote=0;
    }
    // this.getfavourite=x;
  }
  getlanguage(){
    this.language_data = JSON.parse(localStorage.getItem("language_data"));
    console.log(this.language_data);
  }
  shuffle(){
    this.Api.showtoast("Random songs Playings");
  }
}
