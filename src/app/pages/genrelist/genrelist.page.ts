
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-genrelist',
  templateUrl: './genrelist.page.html',
  styleUrls: ['./genrelist.page.scss'],
})
export class GenrelistPage implements OnInit {
  selectedgenre: any;
  songslist:any=[];
  valuerarray: any=[];
  searchvalue: any;
  songtitle:any;
  searcharray:any=[];
  language_data:any={};
  constructor(
    private activeroute: ActivatedRoute,
    private http: HttpClient,
    private Api : ApiService,
    private nav : NavController
  ) { 
    this.selectedgenre=this.activeroute.snapshot.paramMap.get('genre');
    this.Api.isupdateLanguage.subscribe(_isLogin=>{
      this.getlanguage();
    })

  }

  ngOnInit() {
    this.getsongs();
  }
  getsongs(){
    this.Api.startload();
      let url='https://popsaxony.net/popsaxony/public/song/get-all';
      this.http.get(url).subscribe((res:any)=>{
      this.songslist=res;
      let arr=this.songslist;
      let x = arr.filter((a)=>{if(a.genre==this.selectedgenre){return a}});
      this.valuerarray=x;
      this.Api.dismisloader();
      console.log(this.valuerarray);


    },(err)=>{
      this.Api.showtoast("Error Accur!Please check network");   
    })
  }
  seachsong(){
        if(this.songtitle){
          const str=this.songtitle;
        const arr = str.split(" ");
        //loop through each element of the array and capitalize the first letter.
        for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        }
        //Join all the elements of the array back into a string 
        //using a blankspace as a separator 
        const str2 = arr.join(" ");
        console.log(str2);
        let arrdata=this.songslist;
        //let x = arrdata.filter((a)=>{if(a.title==str2){return a}});
        let x =arrdata.filter((a)=>a.title.toUpperCase().includes(str.toUpperCase()));
        // console.log(x);
        this.searcharray=x;
        if(this.searcharray.length != 0){
          this.valuerarray=this.searcharray;
        }else{
          this.getsongs()
          this.Api.showtoast("Song Not Found!");   
        }
        console.log(this.valuerarray);
        }else{
          this.Api.showtoast("Type song title to search");   
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
  getlanguage(){
    this.language_data = JSON.parse(localStorage.getItem("language_data"));
    console.log(this.language_data);
  }
}
