import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MainService } from '../../providers/main-service';
import { ShootDetailsPage } from '../shoot-details/shoot-details';
import { InAppBrowser } from 'ionic-native';
//import { OrderByPipe } from "../../pipes/orderby";

declare var google;
//declare var Connection;
//var cordova: any;
@Component({
  selector: 'page-club-details',
  templateUrl: 'club-details.html',
  providers: [Geolocation]
})
export class ClubDetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  apiKey: string;
  clubdetails: any;
  clubs:any;
  currentUser: any;
  loading: Loading;
  createSuccess: false;
  lat: string;
  lng: string;
  date: any = [];
  show: boolean;
  timeZone:any;
  constructor(public platform: Platform, private geolocation: Geolocation, public navCtrl: NavController,
    public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, public mainService: MainService) {

    this.clubdetails = navParams.get('club');
     console.log(this.clubdetails);
    if (this.clubdetails.shoots.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }

    this.loadCurrenrUser();

    this.platform = platform;

    // this.apiKey = 'AIzaSyCFEDoaWvGrKOQk96_DAUCb4qEoLqHsq0U';
    // let script = document.createElement("script");
    // script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&libraries=places';
    // document.body.appendChild(script);
    this.lat = this.clubdetails.lat;
    this.lng = this.clubdetails.lng;


     if (this.clubdetails.shoots.length > 0) {
      for (let i = 0; i < this.clubdetails.shoots.length; i++) {
        this.clubdetails.shoots[i].date = this.clubdetails.shoots[i].shoot_date.split("T")[0].split("-")[2] + "-" +
          this.clubdetails.shoots[i].shoot_end_date.split("T")[0].split("-")[2].split("-")[0];

            this.clubdetails.shoots[i].S_month =this.clubdetails.shoots[i].shoot_date.split("T")[0].split("-")[1];
              this.clubdetails.shoots[i].E_month = this.clubdetails.shoots[i].shoot_end_date.split("T")[0].split("-")[1];
               this.clubdetails.shoots[i].S_date = this.clubdetails.shoots[i].shoot_date.split("T")[0].split("-")[2];
                this.clubdetails.shoots[i].E_date = this.clubdetails.shoots[i].shoot_end_date.split("T")[0].split("-")[2];
          
      }
        
    }

    this.loadMap();
   
  }

  ionViewDidLoad() {
    this.convertDate();

    console.log('ionViewDidLoad ClubDetailsPage');
  }
   openUrl(url) {

        this.platform.ready().then(() => {
            //let browser = new InAppBrowser(url+"",'_system');

        });
}

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(this.lat, this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        //position: this.map.getCenter(),
        position: new google.maps.LatLng(this.lat, this.lng),
        icon: 'images/pin.png'
      });
      var content = "<span id='location' style='color:#0E304D; font-size:14px;'><strong><a target='_blank' href='https://www.google.com/maps/search/" + this.clubdetails.club_name + ',' + this.clubdetails.address + ',' + this.clubdetails.city + ',' + this.clubdetails.state + ',' + this.clubdetails.zip_code + "'>" + this.clubdetails.club_name + "</strong><br><p style='color:#000; font-size:10px;'>" + this.clubdetails.address + "</a></p></span>";
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

    }, (err) => {
      let latLng = new google.maps.LatLng(this.lat, this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        //position: this.map.getCenter(),
        position: new google.maps.LatLng(this.lat, this.lng),
        icon: 'images/pin.png'
      });

      var content = "<span id='location' style='color:#0E304D; font-size:14px;'><strong><a target='_blank' href='https://www.google.com/maps/places/" + this.clubdetails.address + ',' + this.clubdetails.city + ',' + this.clubdetails.state + ',' + this.clubdetails.zip_code + "'>" + this.clubdetails.club_name + "</strong><br><p style='color:#000; font-size:10px;'>" + this.clubdetails.address + "</a></p></span>";
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
  loadCurrenrUser() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(this.currentUser);
  }
  mailto(email) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        window.open('mailto:' + email);
      } else {
        alert(email);
      }
    });
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
    this.mainService.makeFav(this.currentUser.user_id, this.clubdetails.club_id, 'club').subscribe(success => {
      if (success.status == 1) {
          console.log(success);
      } else {
          console.log(success);
      }
    },
      error => {
        this.loading.dismiss();
        console.log(error);
      });
  }

  convertDate(){
    debugger;
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  public addClubTomyShoots() {
    debugger;
    this.showLoading();
    this.mainService.addClubTomyShoots(this.currentUser.user_id, this.clubdetails.club_id, this.timeZone).subscribe(success => {
      if (success.status == 1) {
        this.loading.dismiss();
        this.clubdetails.is_my_shoot=1;
        this.show=true;
        console.log(success);
        this.makeFav();
        this.presentToast('Added Successfully');
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
  
  shootDetails(event, shoot) {
    this.navCtrl.push(ShootDetailsPage, {
      shoot: shoot
    });
  }

}
