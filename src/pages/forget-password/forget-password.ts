import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController,ViewController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { LoginPage } from '../login/login';
/*
  Generated class for the ForgetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html'
})
export class ForgetPasswordPage {
  forgetUser = { email: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private user: UserService,private toastCtrl: ToastController,public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
     this.viewCtrl.setBackButtonText('');
  }
    forgetPassword() {
    console.log(this.forgetUser);

    //this.showLoading();
    this.user.forgetPassword(this.forgetUser).subscribe(success => {
      console.log(success);
   if(success.status == 1){
       //this.loading.dismiss();
        console.log(success.data);
        this.presentToast(success.statusinfo);
        //this.events.publish('user:created', success.data[0]);
      	this.navCtrl.setRoot(LoginPage);
      }else{
        //this.loading.dismiss();
        console.log(success);
        this.presentToast(success.statusinfo);
      }
    },
      error => {
        // this.loading.dismiss();
        console.log(error);
      });

  }

 presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
