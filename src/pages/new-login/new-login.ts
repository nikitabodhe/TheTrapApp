import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading , MenuController ,Events , Platform} from 'ionic-angular';
import { Facebook ,FacebookLoginResponse,NativeStorage } from 'ionic-native';
import { AuthService } from '../../providers/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
import { RegistrationPagePage } from '../registration-page/registration-page';
import { LoginPage } from '../login/login';

/*
  Generated class for the NewLogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var device: any;
@Component({
  selector: 'page-new-login',
  templateUrl: 'new-login.html'
})
export class NewLoginPage {

  selectedItem: any;
  loading: Loading;
  loginCredentials = {email: '', password: ''};
  FB_APP_ID: number = 1511175088938670;
  createSuccess = false;
  fbuser : any;
  deviceDetails = { model : '', deviceID : '', deviceVersion : '' , platform : '' , imei_no : ''};

  constructor(public navCtrl: NavController, private menu: MenuController ,  private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController ,public events: Events, public platform: Platform) {
  	Facebook.browserInit(this.FB_APP_ID, "v2.9");
    this.initializeApp(); 
  }

  initializeApp(){
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.deviceDetails.model = device.model;
        this.deviceDetails.deviceID = window.localStorage.getItem("deviceToken");;
        this.deviceDetails.deviceVersion = device.version;
        this.deviceDetails.platform = device.platform;
        this.deviceDetails.imei_no = device.uuid;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewLoginPage');
    this.menu.swipeEnable(false);
  }
  public createAccount() { 
    this.navCtrl.push(RegistrationPagePage);
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
  doFbLogin(){
    Facebook.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => 
      this.getUserDetails(res)
    )
    .catch(e => console.log('Error logging into Facebook', e));
  }
  getUserDetails(res){
      //this.loading.dismiss();
      //let userId = res.authResponse.userID;
      let params = new Array();
      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender,email", params)
      .then( (user : any ) => 
          this.finalFb(user)
          //alert('user  :'+user)
      )
  }

  finalFb(user){
      user.picture = "https://graph.facebook.com/" + user.id + "/picture?type=large";
      this.showLoading();
      this.auth.fbLogin(user).subscribe(success => {
            if(success.status == 1){
              //alert(success.data);
              //console.log(success.data[0]); 
              this.loading.dismiss();
              //this.fbuser = success.data;
              this.events.publish('fbuser:created', success.data[0]);
              this.navCtrl.push(DashboardPage);
              this.events.publish('user:created', success.data[0]);
              // this.navCtrl.push(DashboardPage);
              NativeStorage.setItem('Currentuser',{
                name: success.data[0].name,
                username: success.data[0].username,
                gender: success.data[0].gender,
                user_id: success.data[0].user_id,
                picture: success.data[0].profile_picture
              });
            }else{
              this.loading.dismiss();
              alert(success);
              //this.showPopup(success.statusinfo);
            }
            /*
            if (success) {
                //this.createSuccess = true;
                //this.showPopup("Success", "Account created.");
                this.loading.dismiss();
                this.navCtrl.setRoot(DashboardPage);
            } else {
              this.showPopup("Error", "Problem creating account.");
            }
            NativeStorage.setItem('Currentuser',
                  {
                    name: res.data[0].username,
                    gender: res.data[0].gender,
                    user_id: res.data[0].user_id,
                    picture: res.data[0].profile_picture
                  });
            */
          },
          error => {
            this.loading.dismiss();
            console.log(error);
          })
  }

  goToLogin(){
  	this.navCtrl.push(LoginPage);
  }

  goToSignup(){
  	this.navCtrl.push(RegistrationPagePage);
  }

}
