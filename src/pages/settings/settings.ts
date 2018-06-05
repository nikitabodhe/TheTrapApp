import { Component } from '@angular/core';
import { NavController, NavParams , Events} from 'ionic-angular';
import{ SettingsSubPage } from '../settings-sub/settings-sub';
import { LoginPage } from '../login/login';
import { Facebook ,FacebookLoginResponse , NativeStorage, Geolocation} from 'ionic-native';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers:[Facebook]
})
export class SettingsPage {

  public currentUser : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams , public events: Events,private fb : Facebook) {

    this.loadCurrenrUser();
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');

  }
  helpPage(){
    alert("in help");

  	
  }
  // SentNotification()
  // {
  //   this.navCtrl.push(NotificationPagePage)
  // }
  profileManagePage(page, userInfo){
    this.navCtrl.push(SettingsSubPage, {
      currentPage: page,
      currentUser : userInfo

    });
  }


  loadCurrenrUser() {
    
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

    /*NativeStorage.getItem('Currentuser')
      .then( function (data) {
        alert('UserID '+data.user_id);
        this.name = data.name;
        this.userName = data.username;
        
        
        //this.hideSplashScreen();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        //this.navCtrl.push(LoginPage);
        //this.hideSplashScreen();
      });*/
  }


  
  logOut(){
    Facebook.logout();
    this.events.publish('user:deleted', this.currentUser);
    this.navCtrl.setRoot(LoginPage);
    window.localStorage.removeItem("profile_picture");
  }

}
