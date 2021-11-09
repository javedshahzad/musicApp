import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  selectedLanguage:any;
  lanuagedata:any={};
  current_language: any;
  constructor(
    private translateConfigService: TranslateConfigService,
    private nav: NavController,
    private _translate: TranslateService,
    private api: ApiService,
  ) {
   if(localStorage.getItem("selectedLanguage") != undefined){
      this.selectedLanguage=localStorage.getItem("selectedLanguage");
   }else{
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
   }
    console.log(this.selectedLanguage);
    localStorage.setItem("selectedLanguage",this.selectedLanguage);
    this._translate.use(this.selectedLanguage);
    this._translate.get('data').subscribe((res: any) => {
      this.lanuagedata = res;
      this.current_language=res.selected_language;
      localStorage.setItem("language_data",JSON.stringify(this.lanuagedata));
      this.api.isupdateLanguage.next(true);
      console.log(this.lanuagedata)
    })
   }

  ngOnInit() {
  }
  languageChanged(){
    console.log(this.selectedLanguage);
    this._translate.use(this.selectedLanguage);
    localStorage.setItem("selectedLanguage",this.selectedLanguage);
    this.changeLanguage();

  }
  changeLanguage(){
    this._translate.get('data').subscribe((res: any) => {
      this.lanuagedata = res;
      this.current_language=res.selected_language;
      localStorage.setItem("language_data",JSON.stringify(this.lanuagedata));
      this.api.isupdateLanguage.next(true);
      console.log(this.lanuagedata)
    })
  }
}
