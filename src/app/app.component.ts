import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {  Geolocation } from '@ionic-native/geolocation';
import { Badge } from '@ionic-native/badge';
import { Device } from '@ionic-native/device';
import { Http } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyshootsScoresPage } from '../pages/myshoots-scores/myshoots-scores';
//import { ClubDetailsPage } from '../pages/club-details/club-details';
import { FindShootsPage } from '../pages/find-shoots/find-shoots';
import { ClubNearMePage } from '../pages/club-near-me/club-near-me';
import { MyAveragePage } from '../pages/my-average/my-average';
import { ClassifyMePage } from '../pages/classify-me/classify-me';
import { MyNotesPage } from '../pages/my-notes/my-notes';
import { MyFavPage } from '../pages/my-fav/my-fav';
import { SettingsPage } from '../pages/settings/settings';
import { MyShootSummeryPage } from '../pages/my-shoot-summery/my-shoot-summery';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { MainService } from '../providers/main-service';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html',
  providers: [
    Geolocation,
    Badge,
    StatusBar,
    SplashScreen,
    Device,
    
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  currentUser: any;
  currentUserStorage: any;
  activePage: any;
  pushToken: any;
  introScreen: any;
  user_profile: any;
  appInstall: any;
  lat: number;
  lng: number;
  alert: any;
  logo: any;
  appName: any;
  constructor(public platform: Platform,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public events: Events,
  
   
    private mainService: MainService, private badge: Badge, public statusbar: StatusBar,public splashscreen: SplashScreen,
  public gelocation: Geolocation,private device: Device,public http: Http,
    private push:Push) {
      console.log("In Trap App");
      
      this.platform.ready().then(() => {
        const options: PushOptions = {
          android: {
            "senderID": "17545284695",
            //"icon": 'palaround',
            'sound': true,
            'vibrate':true,
            'forceShow':true
          },
          ios: {
              alert: true,
              badge: true,
              sound: true,
              //vibrate: true,
          },
          windows: {},
       };
    
       if(this.platform.is('cordova')){
        const pushObject: PushObject = this.push.init(options);
        this.push.hasPermission()
              .then(function(res) {

                if (res.isEnabled) {
                  console.log('We have permission to send push notifications');
                } else {
                  console.log('We do not have permission to send push notifications');
                }

              });
          pushObject.on('registration').subscribe((registration: any) => {
            let deviceToken:any;
              deviceToken = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '';
              console.log('Device Token:'+ registration.registrationId);
              if(deviceToken != registration.registrationId){
                window.localStorage.setItem('token',registration.registrationId);
                window.localStorage.removeItem("currentUser");
                this.nav.push(LoginPage);
                
              }
    
          } );
    
          pushObject.on('notification').subscribe((notification: any) => {
            console.log('Received a notification'); 
            console.log(JSON.stringify(notification));
            console.log(JSON.stringify(notification.additionalData)); 
            if(notification.additionalData){

               let pageName = notification.additionalData.page ? notification.additionalData.page : 'shoot_summary';
                  console.log(pageName);
                  window.localStorage.setItem('page',pageName);
                  window.localStorage.setItem('data_id',notification.additionalData.data_id);
                this.initializeApp();
            
            }else{
              console.log('Élse case');
            }
          } );
          pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
        }
     
      });
    this.initializeApp();
   // debugger;

    // set our app's pages
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'My Shoots & Scores', component: MyshootsScoresPage },
      { title: 'Find Shoots', component: FindShootsPage },
      { title: 'Find Clubs', component: ClubNearMePage },
      { title: 'My Averages', component: MyAveragePage },
      { title: 'Classify Me', component: ClassifyMePage },
      { title: 'My Notes', component: MyNotesPage },
      { title: 'My Favorites', component: MyFavPage },
      { title: 'Settings', component: SettingsPage }
    ];
    this.activePage = this.pages[0];
    this.user_profile = window.localStorage.getItem("profile_picture");
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want to exit The Trap app?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            this.alert = null;
            console.log('cancel clicked');
          }
        },
        {
          text: 'ok',
          handler: () => {
            this.platform.exitApp();
            this.logOut();
            console.log('Ok clicked');
          }
        }
      ]
    });

    alert.present();
  }

  logOut(){
    this.events.publish('user:deleted', this.currentUser);
    localStorage.clear();
    window.localStorage.removeItem("profile_picture");
    window.localStorage.removeItem("page");
    window.localStorage.removeItem("data_id");
  }

  notfication(title, text) {
    const alert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: text,
      buttons: ['Ok']

    });
    alert.present();
  }
  initializeApp() {


    this.platform.ready().then(() => {
      this.mainService.getLogo().subscribe(success => {
        this.logo = success.logo;

        this.appName = success.text;
        console.log(success);
      },
        error => {
          console.log(error);
        });
      this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
      this.statusbar.styleDefault();
      this.splashscreen.hide();
      this.introScreen = window.localStorage.getItem("IntroScreen");
      this.appInstall = window.localStorage.getItem("Install");
      if (this.platform.is('cordova')) {
       
      } else {
        // alert('browser');
      }
      this.gelocation.getCurrentPosition().then((resp) => {
       // alert("In geolocation");
       
        //  alert('Lat :'+resp.coords.latitude);
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      this.events.subscribe('user:created', (user) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log(user);
        this.currentUser = user;
        if (window.localStorage.getItem("currentUser")) {
          window.localStorage.removeItem("currentUser");
          window.localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          window.localStorage.setItem("currentUser", JSON.stringify(user));
        }
      });
      this.events.subscribe('fbuser:created', (fbuser) => {
        this.currentUser = fbuser;
        if (window.localStorage.getItem("currentUser")) {
          window.localStorage.removeItem("currentUser");
          window.localStorage.setItem("currentUser", JSON.stringify(fbuser));
        } else {
          window.localStorage.setItem("currentUser", JSON.stringify(fbuser));
        }
      });
      this.events.subscribe('user:deleted', (currentUser) => {
        console.log('logout');
        // user and time are the same arguments passed in `events.publish(user, time)`
        window.localStorage.removeItem("currentUser");
      });

      if (this.introScreen && this.currentUser) {
       
        if(window.localStorage.getItem('page')){
          var PageName = window.localStorage.getItem('page');
  
          switch(PageName){
              case 'shoot_summary':
                  this.rootPage=MyShootSummeryPage;
                  break;
              default:
                this.rootPage=DashboardPage;
                break;
  
          }
    }
    else{
      this.rootPage = DashboardPage;
    }
      }
      else if (this.introScreen && !this.currentUser && this.appInstall) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = IntroSliderPage;
      }
     

      this.platform.pause.subscribe(() => {
        this.badge.clear();
        if (this.currentUser) {
          this.SessionLogout();
          this.mainService.getLogo().subscribe(success => {
            this.logo = success.logo;
            this.appName = success.text;
            console.log(success);
          },
            error => {
              console.log(error);
            });
        }
      });
      this.platform.resume.subscribe(() => {
        this.badge.clear();
        if (this.currentUser) {
          this.mainService.getLogo().subscribe(success => {
            this.logo = success.logo;
            this.appName = success.text;
            console.log(success);
          },
            error => {
              console.log(error);
            });
          this.getSession();

        }
      });
    });
    document.addEventListener("pause", onPause, false);
    function onPause() {
      if (this.currentUser) {
        this.SessionLogout();
      }
    }
    this.platform.registerBackButtonAction(() => {
      if (this.nav.canGoBack()) {
        this.nav.pop();
      } else {
        if (this.alert) {
          this.alert.dismiss();
          this.alert = null;
        } else {
          this.showAlert();
        }
      }
    });
  }

  SessionLogout() {
    this.mainService.daily_sessions_logout(this.currentUser.user_id).subscribe(success => {
    },
      error => {
      });
  }
  getSession() {
    this.mainService.daily_sessions_login(this.currentUser.user_id, this.lat, this.lng).subscribe(success => {
      console.log(success);
    },
      error => {
        console.log(error);
      });
  }
  hideSplashScreen() {
    if (this.splashscreen) {
      setTimeout(() => {
        this.splashscreen.hide();
      }, 100);
    }
  }
  get_profile() {
  }
  openPage(event, page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.user_profile = window.localStorage.getItem("profile_picture");
    // navigate to the new page if it is not the current page
    this.nav.push(page.component);
    this.activePage = page;
  }
  onMenuClose() {
    this.user_profile = window.localStorage.getItem("profile_picture");
  }
  isOpen() {
    this.user_profile = window.localStorage.getItem("profile_picture")
  }
  checkActive(page) {
    return page == this.activePage;
  }

//   UpdateDeviceToken()
// {
//   let token=window.localStorage.getItem("token");
//   let device_type=this.getDeviceType();
//   var json = JSON.stringify({  device_token: window.localStorage.getItem('token') });
//   var headers = new Headers();
//   headers.append("Accept", 'application/json');
//   headers.append('Content-Type', 'application/json');
//   let options = new RequestOptions({ headers: headers });
//   return this.http.post("http://node.bizmoapps.com:4500/update_device_tokens", json, options)
//     .map(data => data.json());
// }
// getDeviceType()
// {
//   let device=this.device.platform;
// let deviceType = '';
//   switch(device){
//     case 'ios':
//       deviceType = 'ios';
//       break;
//     case 'android':
//       deviceType = 'Android';
//       break;
//      default:
//         deviceType = 'Android';
//         break;

//   }
//     return deviceType;
// }

}
