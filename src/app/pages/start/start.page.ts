import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 200,
    autoplay: true
  };
  slider: any;
  language_data:any={};
  constructor(
    private nav : NavController,
    private api: ApiService,
  ) { 
    setTimeout(() => {
      this.api.isupdateLanguage.subscribe(_isLogin=>{
        this.getlanguage();
      })
    }, 500);
  }

  ngOnInit() {
  }
  gohome(){
    // alert("okkk")
    this.nav.navigateForward("home");
  }
  getlanguage(){
    this.language_data = JSON.parse(localStorage.getItem("language_data"));
    console.log(this.language_data);
  }
}
