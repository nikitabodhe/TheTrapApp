import { Component } from '@angular/core';
import { NavController, NavParams , ViewController , AlertController, LoadingController, Loading , ToastController} from 'ionic-angular';
import { MainService } from '../../providers/main-service';

/*
  Generated class for the Modal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  loading: Loading;
  createSuccess = false;
  allClass : any;
  allCategory : any;
  allEarnedYardage : any;
  currentUser : any;
  userPreference = { ata_single : '' , ata_double : '' , ata_handicap : '' , ata_category : '' , pita_single : '' , pita_double : '' , pita_handicap : '' , pita_category : '' };

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController, private alertCtrl: AlertController, private loadingCtrl: LoadingController , private mainService : MainService, private toastCtrl: ToastController ) {
  	this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  	window.localStorage.setItem("AddScore", "visited");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal() {
   this.viewCtrl.dismiss();
  }

  ngOnInit() {
  	  this.getClass();
  	  this.getEarnedYardage();
      this.getCategory();
      
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
             
           }
         }
       }
     ]
    });
    alert.present();
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

  getClass(){
    this.mainService.getClass().subscribe(success => {
      if(success.status == 1){
        console.log(success);
        this.allClass = success.data; 
        
      }else{
        console.log(success);
        
      }
    },
    error => {
      console.log( error);
    });
  }

  getEarnedYardage(){
    this.mainService.getEarnedYardage().subscribe(success => {
      if(success.status == 1){
        console.log(success);
        this.allEarnedYardage = success.data; 
        
      }else{
        console.log(success);
        
      }
    },
    error => {
      console.log( error);
    });
  }

  getCategory(){
    this.mainService.getCategory().subscribe(success => {
      if(success.status == 1){
        console.log(success);
        this.allCategory = success.data; 
        
      }else{
        console.log(success);
        
      }
    },
    error => {
      console.log( error);
    });
  }

  saveUserPreference(){
  	console.log(this.userPreference);
  	this.showLoading();
  	this.mainService.save_user_settings(this.currentUser.user_id , this.userPreference).subscribe(success => {
  		console.log(success);
      if(success.status == 1){
        console.log(success);
        this.loading.dismiss();
        //console.log(success);
        this.presentToast('Saved Successfully');
        this.viewCtrl.dismiss();
        
      }else{
      	this.loading.dismiss();
        this.presentToast('Please try again!');
        
      }
    },
    error => {
      this.loading.dismiss();
      console.log( error);
    });
  }

}
