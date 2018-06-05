import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading , MenuController ,Events , Platform} from 'ionic-angular';
import { Facebook ,FacebookLoginResponse , NativeStorage, Geolocation} from 'ionic-native';
import { AuthService } from '../../providers/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
import { RegistrationPagePage } from '../registration-page/registration-page';
import { MainService } from '../../providers/main-service';
import{ ForgetPasswordPage } from '../forget-password/forget-password';
import { GooglePlus } from '@ionic-native/google-plus';

declare var device: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public currentUser : any;
  selectedItem: any;
  loading: Loading;
  loginCredentials = {email: '', password: ''};
  FB_APP_ID: number = 1511175088938670;//193695101116038;
  createSuccess = false;
  userid:any;
  fbuser : any;
      lat : number;
  lng : number;
  deviceDetails = { model : '', deviceID : '', deviceVersion : '' , platform : '' , imei_no : ''};
  constructor(public navCtrl: NavController, private menu: MenuController ,   private mainService: MainService,
    private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController ,public events: Events, public platform: Platform) {
    //ScreenOrientation.lockOrientation('landscape');
    //console.log(orientation);
    Facebook.browserInit(this.FB_APP_ID, "v2.9");
    this.initializeApp(); 
  }
  initializeApp(){
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.deviceDetails.model = device.model;
        this.deviceDetails.deviceID = window.localStorage.getItem("deviceToken");
        // alert(this.deviceDetails.deviceID);
        this.deviceDetails.deviceVersion = device.version;
        this.deviceDetails.platform = device.platform;
        this.deviceDetails.imei_no = device.uuid;
      }
    });
  }


  ionViewDidLoad() {
    console.log('login page');
    //console.log('Orientation is ' + screen.orientation);
    //window.localStorage.removeItem("currentUser");
    this.menu.swipeEnable(false);
    NativeStorage.remove('Currentuser');
        Geolocation.getCurrentPosition().then((resp) => {
    //  alert('Lat :'+resp.coords.latitude);
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    
      
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  

  }
  
  public createAccount() { 
    this.navCtrl.push(RegistrationPagePage);
  }

  public login() {
    this.showLoading()
    this.initializeApp();
  //  console.log(this.deviceDetails);
    this.auth.login(this.loginCredentials ).subscribe(success => {
      //console.log(success);
      if(success.status == 1){
        console.log(success.data[0]);
        this.loading.dismiss();
        //this.navCtrl.setRoot(DashboardPage);
        this.events.publish('user:created', success.data[0]);
        
        this.userid=success.data[0].user_id;
        NativeStorage.setItem('Currentuser',{
          name: success.data[0].name,
          username: success.data[0].username,
          gender: success.data[0].gender,
          user_id: success.data[0].user_id,
          picture: success.data[0].profile_picture,
          zipcode:success.data[0].zipcode

        });
        window.localStorage.setItem('Currentuser',JSON.stringify({
          name: success.data[0].name,
          username: success.data[0].username,
          gender: success.data[0].gender,
          user_id: success.data[0].user_id,
          picture: success.data[0].profile_picture
        }));
        window.localStorage.setItem("profile_picture",success.data[0].profile_picture);
        this.getSession();
        this.navCtrl.setRoot(DashboardPage);
      }else{
        console.log(success);
        this.loading.dismiss();
        this.showPopup(success.statusinfo);
      }
    },
    error => {
      this.loading.dismiss();
      console.log(error);
    });
  }
getSession(){
 this.mainService.daily_sessions_login(this.userid,this.lat,this.lng).subscribe(success => {
    console.log(success);
    },
    error => {
    console.log(error);
    });
}
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showPopup(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             //this.navCtrl.popToRoot();
             this.navCtrl.setRoot(DashboardPage);
           }
         }
       }
     ]
    });
    alert.present();
  }

  openDashboardPage() {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    this.navCtrl.setRoot(DashboardPage);
  }
  openRegistrationPage() {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    this.navCtrl.setRoot(RegistrationPagePage);
  }


  profileManagePage(){
    this.navCtrl.push(ForgetPasswordPage);
  }

  
  doFbLogin() 
  {
   debugger;
    console.log('Facebook');
   Facebook.getLoginStatus().then(function(res){
     if(res == 'connetced'){
     Facebook.logout();
     }
    })
    .catch(e => console.log('Error Facebook logout', e));

    Facebook.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
    
    //  console.log(JSON.stringify(res));
      if(res){
       
          let params = new Array();
          //Getting name and gender properties
          Facebook.api("/me?fields=name,gender,email", params)
          .then( (user : any ) => {
                console.log('Facebook Response:');
                // console.log(JSON.stringify(user));
                // console.log('response 3');
               this.finalFb(user)
            
          }
          )      

      }else{
        console.log('No response Received');
      }
    }
    )
    .catch(e => console.log('Error logging into Facebook', e));
  }


  finalFb(user){
  
    //debugger;
      user.picture = "https://graph.facebook.com/" + user.id + "/picture?type=large";
      this.showLoading();
      this.auth.fbLogin(user).subscribe(success => {

        console.log(success);
            if(success.status == 1){
            
              //console.log(success.data[0]); 
              this.loading.dismiss();
              //this.fbuser = success.data;
              this.events.publish('fbuser:created', success.data[0]);
              // this.navCtrl.push(DashboardPage);
              this.events.publish('user:created', success.data[0]);
             // console.log('finalFb1');
               this.userid=success.data[0].user_id;
               //console.log('finalFb2');
              NativeStorage.setItem('Currentuser',{
                name: success.data[0].name,
                username: success.data[0].username,
                gender: success.data[0].gender,
                user_id: success.data[0].user_id,
                picture: success.data[0].profile_picture
              });
           //   console.log('finalFb3');
              window.localStorage.setItem('Currentuser',JSON.stringify({
                name: success.data[0].name,
                username: success.data[0].username,
                gender: success.data[0].gender,
                user_id: success.data[0].user_id,
                picture: success.data[0].profile_picture
              }));
             // console.log('finalFb4');
              window.localStorage.setItem("profile_picture",success.data[0].profile_picture);
              //console.log('finalFb5');
              this.getSession();
             // console.log('finalFb6');
               this.navCtrl.push(DashboardPage);
            }else{
             // console.log('Facebook LoginIssue')
              this.loading.dismiss();
              // alert(success);
              //this.showPopup(success.statusinfo);
            }
          
          },
          error => {
            this.loading.dismiss();
            //console.log(error);
          })
  }

  logOut(){    
    Facebook.logout();
    this.events.publish('user:deleted', this.currentUser);
    this.navCtrl.setRoot(LoginPage);
    window.localStorage.removeItem("profile_picture");
  }

}
