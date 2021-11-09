import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  allnews:any=[];
  language_data:any={};
  constructor(
    private http: HttpClient,
    private Api : ApiService,
    private nav : NavController
  ) { 
    this.Api.isupdateLanguage.subscribe(_isLogin=>{
      this.getlanguage();
    })
 
  }

  ngOnInit() {
    this.getAllNews();
  }
  getAllNews(){
      this.Api.startload();
      let url='https://popsaxony.net/popsaxony/public/news/get-all/1000/0';
      this.http.post(url,{"orderBy":"desc"}).subscribe((res:any)=>{
      this.allnews=res;
      this.Api.dismisloader();
      // console.log(this.allnews);
    },(err)=>{
      console.log(err);
    })
  }
  getlanguage(){
    this.language_data = JSON.parse(localStorage.getItem("language_data"));
    console.log(this.language_data);
  }
  htmlconvert(textdata){
    var html =textdata;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";
    return text;
  }
}
