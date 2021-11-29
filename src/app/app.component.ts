import { Component,OnInit,QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, NavController, Platform, ToastController ,IonRouterOutlet} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './services/api.service';
import { TranslateConfigService } from './services/translate-config.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  islogin:boolean=false;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  public selectedIndex = 0;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    // { title: 'Genre', url: '/home', icon: 'paper-plane' },
    // { title: 'Videos', url: '/videoplayer', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  inputname: any;
  valuerarray:any;
  selectedLanguage: any;
  lanuagedata:any={};
  constructor(
    private menu:MenuController,
    private nav : NavController,
    private api:ApiService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toastController: ToastController,
    private translateConfigService: TranslateConfigService,
    private _translate: TranslateService,

  ) {
    this.appinit();
    this.backButtonEvent();
    this.platform.ready().then(()=>{
          if(localStorage.getItem("selectedLanguage") != undefined || localStorage.getItem("selectedLanguage")==''){
          this.selectedLanguage=localStorage.getItem("selectedLanguage");
          }else{
          this.selectedLanguage ='gr';
          }
          localStorage.setItem("selectedLanguage",this.selectedLanguage);
          console.log(this.selectedLanguage);
          this._translate.use(this.selectedLanguage);
          this._translate.get('data').subscribe((res: any) => {
          this.lanuagedata = res;
          localStorage.setItem("language_data",JSON.stringify(this.lanuagedata));
          this.api.isupdateLanguage.next(true);
    });
  });

  }

        // myfunction(){
        // if(this.inputname){

        // console.log(this.inputname);
        // let arr = [
        // { 
        // name:"javed", 
        // class:"bscs",
        // age: "21" 
        // },
        // {
        // name:"shahzad 2", 
        // class:"this",
        // age: "21"
        // },
        // { 
        // name:"new 1", 
        // class:"bcom",
        // age: "213" 
        // },
        // {
        // name:"income 2", 
        // class:"new",
        // age: "12"
        // }
        // ];
        // this.valuerarray=[];
        // let obj = arr.find(o => o.name.includes(this.inputname));
        // this.valuerarray.push(obj);
        // console.log(this.valuerarray );

        // }
        // }
      closemenu(){
        this.menu.close();
      }
      ngOnInit(): void {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(
                page => page.title.toLowerCase() === path.toLowerCase()
            );
        }
      }

      appinit(){
        this.platform.ready().then(()=>{
          this.splashScreen.hide();
          this.statusBar.backgroundColorByHexString('#000930');
        })
      }
      backButtonEvent() {
        this.platform.backButton.subscribe(async () => {
            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (outlet && outlet.canGoBack()) {
                    outlet.pop();
                } else if (
                    this.router.url === '/home' || this.router.url === '/start'
                    
                ) {
                    if (
                        new Date().getTime() - this.lastTimeBackPress <
                        this.timePeriodToExit
                    ) {
                        navigator['app'].exitApp();
                    } else {
                        this.showToast();
                        this.lastTimeBackPress = new Date().getTime();
                    }
                }
            });
        });
    }
    
    async showToast() {
      const toast = await this.toastController.create({
          message: "Press again to exit app",
          duration: 2000
      });
      toast.present();
    }
    
}
