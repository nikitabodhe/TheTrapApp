import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Slides } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {  GoogleMaps } from '@ionic-native/google-maps';
import { Platform, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MainService } from '../../providers/main-service';
import { AddAtaPitaShootPage } from '../add-ata-pita-shoot/add-ata-pita-shoot';
import { InAppBrowser } from 'ionic-native';


//declare var Connection: any;
@Component({
  selector: 'page-shoot-details',
  templateUrl: 'shoot-details.html',
  providers: [GoogleMaps, Geolocation]

})
export class ShootDetailsPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  timeZone:any;
  apiKey: string;
  shootdetails: any;
  currentUser: any;
  loading: Loading;
  createSuccess: false;
  lat: string;
  lng: string;
  banners: any = [];
  date: string;
  S_month: any;
  E_month: any;
  S_date: any;
  E_date: any;
  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    public mainService: MainService, public platform: Platform) {
    this.shootdetails = navParams.get('shoot');
    console.log('shootdetails',this.shootdetails);
    this.loadCurrenrUser();
    //   platform.ready().then(() => {
    //   this.apiKey='AIzaSyCFEDoaWvGrKOQk96_DAUCb4qEoLqHsq0U';
    //   let script = document.createElement("script");
    // script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&libraries=places';
    //   document.body.appendChild(script); 
    //     this.loadMap();
    //   });
    this.lat = this.shootdetails.lat;
    this.lng = this.shootdetails.lng;
    this.loadMap();
  }
  loadMap() {
    // this.lat = this.shootdetails.lat;
    // this.lng = this.shootdetails.lng;
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
      var content = "<span id='location' style='color:#0E304D; font-size:14px;'><strong><a target='_blank' href='https://www.google.com/maps/search/" + this.shootdetails.club_name + ',' + this.shootdetails.shoot_address + ',' + this.shootdetails.city + ',' + this.shootdetails.state + ',' + this.shootdetails.zip_code + "'>" + this.shootdetails.shoot_name + "</strong><br><p style='color:#000; font-size:10px;'>" + this.shootdetails.shoot_address + "</a></p></span>";
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
        //position: this.map.getCenter(),
        position: new google.maps.LatLng(this.lat, this.lng),
        icon: 'assets/images/pin.png'
      });
      //var content="<span id='location' style='color:#0E304D; font-size:14px;'><strong><a target='_blank' href='https://www.google.com/maps?ll='"+this.lat+','+this.lng+"&z=16&t=m&hl=en-GB&gl=US&mapclient=apiv3&cid=11063712301362541243 >"+this.shootdetails.shoot_name+"</strong><br><p style='color:#000; font-size:10px;'>"+this.shootdetails.shoot_address+"</a></p></span>";
      //adding infoWindow
      var content = "<span id='location' style='color:#0E304D; font-size:14px;'><strong><a target='_blank' href='https://www.google.com/maps/search/" + this.lat.trim() + ',' + this.lng.trim() + "'>" + this.shootdetails.shoot_name + "</strong><br><p style='color:#000; font-size:10px;'>" + this.shootdetails.shoot_address + "</a></p></span>";
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      google.maps.event.addListener(marker, 'click', () => {
        //this.isPinClicked = true;
        infoWindow.open(this.map, marker);
      });
      google.maps.event.addListener(infoWindow, 'domready', () => {
        document.getElementById("location").addEventListener("click", (e) => {
          infoWindow.close(this.map, marker)
        });
      });
    });
  }
  getAllBanner() {
    debugger;
    this.convertDate();
    this.mainService.getBanner('shoot_details', this.timeZone).subscribe(success => {
        if (success.status == 1) {
        if (success.data.length > 0) {
          this.banners = success.data;
          console.log('banners',this.banners);
        }
      } else {
      }
    },
      error => {
        console.log(error);
      });
  }
  openUrl(url) {
    this.platform.ready().then(() => {
      //let browser = new InAppBrowser(url + "", '_system');
    });
  }
  ionViewDidLoad() {
    this.getAllBanner();
    this.date = this.shootdetails.shoot_date.split("T")[0].split("-")[2] + "-" + this.shootdetails.shoot_end_date.split("T")[0].split("-")[2].split("-")[0];
    this.S_month = this.shootdetails.shoot_date.split("T")[0].split("-")[1];
    this.E_month = this.shootdetails.shoot_end_date.split("T")[0].split("-")[1];
    this.S_date = this.shootdetails.shoot_date.split("T")[0].split("-")[2];
    this.E_date = this.shootdetails.shoot_end_date.split("T")[0].split("-")[2];
  }
  loadCurrenrUser() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(this.currentUser);

  }

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
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
  addShootDetails(event, shootDetails, eventDetails) {

    this.navCtrl.push(AddAtaPitaShootPage, {
      shoot: shootDetails,
      event: eventDetails
    });
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
  makeFav() {
    this.mainService.makeFav(this.currentUser.user_id, this.shootdetails.shoot_id, 'shoot').subscribe(success => {
      if (success.status == 1) {
        console.log(success);
      } else {
      }
    },
      error => {
        console.log(error);
      });
  }
  public addShootTomyShoots() {
    this.showLoading();
    this.mainService.addShootToMyShoots(this.currentUser.user_id, this.shootdetails.shoot_id, this.shootdetails.club_id).subscribe(success => {
      if (success.status == 1) {
        this.shootdetails.is_my_shoot = 1;
        this.loading.dismiss();
        console.log(success);
        this.makeFav()
        this.presentToast('Added Successfully');
        //this.navCtrl.push(FindShootsPage);
      } else {
        this.loading.dismiss();
        this.showPopup(success.statusinfo);
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
}
