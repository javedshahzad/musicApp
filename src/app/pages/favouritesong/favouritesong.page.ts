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
  valuerarray:any={};
  language_data:any={};
  isFavourite:boolean=false;
  constructor(
    private activeroute: ActivatedRoute,
    private http: HttpClient,
    private Api : ApiService,
    private nav : NavController
  ) { 
    //this.valuerarray=this.Api.favorite_songs_aray
    this. getfavourite();
    this.Api.isupdateLanguage.subscribe(_isLogin=>{
      this.getlanguage();
    })
  }

  ngOnInit() {
  }
  getlanguage(){
    this.language_data = JSON.parse(localStorage.getItem("language_data"));
    console.log(this.language_data);
  }
  getfavourite(){
   
    this.valuerarray = JSON.parse(localStorage.getItem("myfavoritesong"));
    if(this.valuerarray != undefined){
      this.isFavourite=true;
    }else{
      this.Api.showtoast("No Favourite song yet !")
    }
  }
  play(item){
    console.log(item);
    this.Api.songdata=item;
    localStorage.setItem("image",item.image);
    localStorage.setItem("source",item.source);
    localStorage.setItem("title",item.title);
    localStorage.setItem("artist",item.artist)
    localStorage.setItem("songid",item.id)
    this.nav.navigateForward("musicplay");
}
}
