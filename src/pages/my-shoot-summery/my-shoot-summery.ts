import { Component, ViewChild, ElementRef } from '@angular/core';
import { InAppBrowser } from 'ionic-native';
import { NavController, NavParams, LoadingController, Loading, ToastController, AlertController, Platform,ItemSliding } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MainService } from '../../providers/main-service';
import { EventDetailsPage } from '../event-details/event-details';
import { AddAtaPitaShootPage } from '../add-ata-pita-shoot/add-ata-pita-shoot';
import { AddEventOnShootPage } from '../add-event-on-shoot/add-event-on-shoot';
//import {AppSettings} from '../../providers/app-settings';
/*
  Generated class for the MyShootSummery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;
//declare var Connection;
@Component({
  selector: 'page-my-shoot-summery',
  templateUrl: 'my-shoot-summery.html',
  providers: [Geolocation]
})
export class MyShootSummeryPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  apiKey: string;
  shoot: any;
  shootId: any;
  currentUser: any;
  loading: Loading;
  myShootDetails = { events: [], scores: {} ,extra_details:[] };
  shootdetails: any;
  segment: any;
  banners: any = [];
  date: string;
  nativeElement: any;
  //myShootDetails.scores = { doubletotal : '', handitotal : '' , singletotal : ''};
  lat: string;
  lng: string;
  searching: boolean;
  S_month: any;
  E_month: any;
  S_date: any;
  E_date: any;
  myShootDetail:any;
  show: boolean = true;
  timeZone:any;
  
  constructor(public platform: Platform, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private mainService: MainService,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.shoot = navParams.get('shoot') ? navParams.get('shoot') : "";
    this.shootdetails = navParams.get('shoots') ? navParams.get('shoots') : "";
    console.log('ok 1 = ',this.shootdetails);
   
    this.shootId =  window.localStorage.getItem('page') ?  parseInt(window.localStorage.getItem('data_id')):this.shoot;
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.getmyShootsSummary();
    // if(window.localStorage.getItem('page'))
    // {
    //   window.localStorage.removeItem("page");
    //   window.localStorage.removeItem("data_id");
    // }
   // window.localStorage.setItem('page',pageName);
        //          window.localStorage.setItem('data_id',notification.additionalData.data_id);
                
    // this.apiKey = 'AIzaSyCFEDoaWvGrKOQk96_DAUCb4qEoLqHsq0U';

    // let script = document.createElement("script");
    // script.src = AppSettings.map_url;
    // document.body.appendChild(script);
 
    this.segment = 'allEvents';
   
    
  }
  showdata() {
    this.show = true;
  }
  loadMap() {
  
    this.lat = this.myShootDetail.lat;
    this.lng = this.myShootDetail.lng;
    console.log('shotdetails',this.myShootDetail.lng);
    this.show = true;
   
    if (this.lat) {
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(this.lat, this.lng);
        let mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(this.lat, this.lng),
          icon: 'assets/images/pin.png'
        });
        var content = "<span id='location' style='color:#0E304D; font-size:14px;'><strong><a target='_blank' href='https://www.google.com/maps/search/" + this.shootdetails.club_name + ',' + this.shootdetails.shoot_address + ',' + this.shootdetails.city + "'>" + this.shootdetails.shoot_name + "</strong><br><p style='color:#000; font-size:10px;'>" + this.shootdetails.shoot_address + "</a></p></span>";
        let infoWindow = new google.maps.InfoWindow({
          content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
        google.maps.event.addListener(infoWindow, 'domready', () => {
          document.getElementById("location").addEventListener("click", (e) => {
            infoWindow.close(this.map, marker)
          });
        });
      }, (err) => {
        let latLng = new google.maps.LatLng(this.lat, this.lng);
        let mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
        
          position: new google.maps.LatLng(this.lat, this.lng),
          icon: 'assets/images/pin.png'
        });
        var content = "<span id='location' style='color:#0E304D; font-size:14px;'><strong><a target='_blank' href='https://www.google.com/maps/search/" + this.lat.trim() + ',' + this.lng.trim() + "'>" + this.shootdetails.shoot_name + "</strong><br><p style='color:#000; font-size:10px;'>" + this.shootdetails.shoot_address + "</a></p></span>";
        let infoWindow = new google.maps.InfoWindow({
          content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
        google.maps.event.addListener(infoWindow, 'domready', () => {
          document.getElementById("location").addEventListener("click", (e) => {
            infoWindow.close(this.map, marker)
            this.getmyShootsSummary();
          });
        });
      });

    }
  }
  shootDetails() {
    this.segment = 'shootDetails';
  }
  ionViewDidEnter() {

  }
  getDate(){
    this.date = this.myShootDetail.shoot_date.split("T")[0].split("-")[2] + "-" + this.myShootDetail.shoot_end_date.split("T")[0].split("-")[2].split("-")[0];
   
    this.S_month = this.myShootDetail.shoot_date.split("T")[0].split("-")[1];
    this.E_month = this.myShootDetail.shoot_end_date.split("T")[0].split("-")[1];
    this.S_date = this.myShootDetail.shoot_date.split("T")[0].split("-")[2];
    this.E_date = this.myShootDetail.shoot_end_date.split("T")[0].split("-")[2];
  }
  getAllBanner() {
    this.mainService.getBanner('shoot_summary', this.timeZone).subscribe(success => {
      if (success.status == 1) {
        if (success.data.length > 0) {
          this.banners = success.data;
        }
        console.log(JSON.stringify(success));
        //this.clubs.push(this.banners);
      } else {
        console.log(success);
      }
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
  openUrl(url) {

    // this.platform.ready().then(() => {
    //  // let browser = new InAppBrowser(url + "", '_system');

    // });
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

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  getmyShootsSummary() {
    this.convertDate();
    this.showLoading();
    this.searching = true;
    this.shootId=window.localStorage.getItem("data_id") ? parseInt(window.localStorage.getItem("data_id")):this.shootId;
   
    this.mainService.get_shot_summary(this.currentUser.user_id, this.shootId, this.timeZone).subscribe(success => {
     console.log('getmyShootsSummary',this.timeZone);
      if (success.status == 1) {
       
        this.loading.dismiss();
        this.searching = false;
        this.myShootDetails = success.data;
       
        console.log('ok 2 =',JSON.stringify(this.myShootDetails.events, this.timeZone));
        console.log('myShootDetails',JSON.stringify(this.myShootDetails.events));
        this.myShootDetail=success.data.extra_details;
        this.getDate();
         //console.log( this.myShootDetails);
        
        // alert(JSON.stringify(this.myShootDetails));
      } else {
        this.loading.dismiss();
        this.searching = false;
         console.log(success);
      }
     
    },
      error => {
        this.loading.dismiss();
        console.log(error);
        this.searching = false;
      });
      window.localStorage.removeItem("page");
      window.localStorage.removeItem("data_id");
      
  }
    ionViewDidLoad(){
    this.getAllBanner();
    }
  eventDetails(event) {
    console.log(event);
    this.navCtrl.push(EventDetailsPage, {
      event: event,
      shootDetails:this.shoot,
      mainShoot: this.shootdetails
    })
  }
  addShootDetails(event, shootDetails, eventDetails) {
    this.navCtrl.push(AddAtaPitaShootPage, {
      shoot: shootDetails,
      event: eventDetails
    });
  }
  addShootDetailsNew(event, shootDetails,events) {

    this.navCtrl.push(AddEventOnShootPage, {
      shoot: shootDetails,
      event:events
    });
  }
  showConfirm(event_id,slidingItem:ItemSliding) {
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to delete this Event?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log(this.currentUser.user_id);
            this.showLoading();
            this.mainService.delete_Event(this.currentUser.user_id, event_id).subscribe(success => {
              if (success.status == 1) {
                this.getmyShootsSummary();
                this.presentToast("Event deleted Successfully");
                this.loading.dismiss();
              } else {
                this.presentToast("Something went wrong!");
                this.loading.dismiss();

              }
            },
              error => {
                this.loading.dismiss();
                this.presentToast("Something went wrong!");
                console.log(error);
              });
          }
        }
      ]
    });
    confirm.present();
  }
  deleteEvent(event,slidingItem) {
    //console.log(this.currentUser.user_id);
    console.log(event);

    this.showConfirm(event.shoot_event_id,slidingItem);


  }
}
