import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favouritesong',
  templateUrl: './favouritesong.page.html',
  styleUrls: ['./favouritesong.page.scss'],
})
export class FavouritesongPage implements OnInit {
  valuerarray:any=[];
  language_data:any={};
  isFavourite:boolean=false;
  constructor(
    private activeroute: ActivatedRoute,
    private http: HttpClient,
    private Api : ApiService,
    private nav : NavController
  ) { 
    //this.valuerarray=this.Api.favorite_songs_aray
    this.Api.isupdateLanguage.subscribe(_isLogin=>{
      this.getlanguage();
    })
    this. getfavourite();

  }

  ngOnInit() {
  }
  getlanguage(){
    this.language_data = JSON.parse(localStorage.getItem("language_data"));
    console.log(this.language_data);
  }
  getfavourite(){
    this.valuerarray = JSON.parse(localStorage.getItem("favSongForDisplay"));
    console.log( this.valuerarray )
    if(this.valuerarray != undefined && this.valuerarray.length !=0){
      this.isFavourite=true;
    }else{
      this.Api.showtoast(this.language_data.no_favourite_song_yet)
    }
  }
  play(item){
    console.log(item);
    this.Api.songdata=item;
    this.Api.ShuffleSongList=this.valuerarray;
    localStorage.setItem("image",item.image);
    localStorage.setItem("source",item.source);
    localStorage.setItem("title",item.title);
    localStorage.setItem("artist",item.artist)
    localStorage.setItem("songid",item.id)
    this.nav.navigateForward("musicplay");
}
removefav(item){
  var id = item.id;
  console.log(id)
for(var i = 0; i < this.valuerarray.length; i++) {
    if(this.valuerarray[i].id == id) {
      this.valuerarray.splice(i, 1);
        break;
    }
}
  localStorage.setItem("favSongForDisplay",JSON.stringify(this.valuerarray));
  this.getfavourite();
  this.Api.showtoast(this.language_data.removed_favourite);
  }
}
