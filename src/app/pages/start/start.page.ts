import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  constructor(
    private nav : NavController
  ) { }

  ngOnInit() {
  }
  gohome(){
    // alert("okkk")
    this.nav.navigateForward("home");
  }

}
