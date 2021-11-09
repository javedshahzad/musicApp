import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  language_data:any={};
  selectedLanguage: any;
  lanuagedata:any={};
  constructor(
    private nav : NavController,
    private translateConfigService: TranslateConfigService,
    private _translate: TranslateService,
    private api: ApiService,

  ) { 

    this.api.isupdateLanguage.subscribe(_isLogin=>{
      this.getlanguage();
    })
  
  }

  ngOnInit() {
   
  }
  getlanguage(){
    this.language_data = JSON.parse(localStorage.getItem("language_data"));
    console.log(this.language_data);
  }
  facebook(){
    window.open(" https://www.facebook.com/groups/1682550241957915");
   
  }
  wesite(){
    window.open("https://www.popsaxony.net");
  }
  genre_list(genre){
    localStorage.setItem("genre",genre);
    this.nav.navigateForward("genrelist/"+genre)
    //alert(genre)
  }
}
