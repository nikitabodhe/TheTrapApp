import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
//import { Geolocation } from 'ionic-native';
import { ClubDetailsPage } from '../club-details/club-details';
import { MainService } from '../../providers/main-service';


/*
  Generated class for the ClubNearMe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-club-near-me',
  templateUrl: 'club-near-me.html'
})
export class ClubNearMePage {
  shootsTemp: any;
  searchQuery: string = '';
  noClubsFound: boolean = false;
  items: string[];
  loading: Loading;
  segment: string = 'all';
  distance: string = '0';
  zip_code: string = '';
  search_string: string = ' ';
  clubs = [];
  lat: number;
  lng: number;
  banners: any;
  currentUser: any;
  searching: boolean = false;
  offset: any;
  timeZone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mainService: MainService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.offset = 0;

  }
  ionViewDidLoad() {
    this.loadCurrenrUser();
    this.getAllBanner();
    this.getNearestClub();
  }
  ionViewDidEnter() {


    console.log('ionViewDidLoad ClubNearMePage');
    // Geolocation.getCurrentPosition().then((resp) => {
    //   //alert('Lat :'+resp.coords.latitude);
    //   this.lat = resp.coords.latitude;
    //   this.lng = resp.coords.longitude;
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
    //this.getNearestClub();

  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'

    ];
  }
  ngOnInit() {
    // this.loadCurrenrUser();
    // console.log('everytime');
    // //this.getNearestClub();
    // this.getAllBanner();

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    this.search_string = ev.target.value;
    //console.log(val);
    this.searching = true;
    this.mainService.getNearestClub(this.currentUser.user_id, this.lat, this.lng, this.distance, this.search_string, this.offset).subscribe(success => {
      if (success.status == 1) {
        this.searching = false;
        console.log(success);

        if (success.data.length == 0) {
          this.noClubsFound = true;
        } else {
          this.noClubsFound = false;
        }
        this.clubs = success.data;
        if (this.search_string && this.search_string.trim() != '') {
          this.clubs = this.shootsTemp.filter((item) => {
            // return (item.club_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1);
            if ((item.club_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            if ((item.address.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            if ((item.zip_code.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            if ((item.city.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            if ((item.state.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            return false;
          })
        } else {
          // this.getNearestClub();
          this.clubs = this.shootsTemp;
        }

      } else {
        this.searching = false;
        console.log(success);

      }
    },
      error => {
        this.searching = false;
        console.log(error);
      });


    // if the value is an empty string don't filter the items

  }

  loadCurrenrUser() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
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
  searchClubs() {
    //console.log(this.zip_code);
    if (this.zip_code != '') {
      this.mainService.get_lat_long(this.zip_code).subscribe(success => {
        //console.log(success.results[0].geometry.location);
        this.lat = success.results[0].geometry.location.lat;
        this.lng = success.results[0].geometry.location.lng;
        this.getNearestClub();
      },
        error => {
          //this.loading.dismiss();
          console.log(error);
        });
    } else {
      this.getNearestClub();
    }


  }
  clubDetails(event, club) {

    this.navCtrl.push(ClubDetailsPage, {
      club: club
    });

  }
  makeFav(club) {
    //console.log(club);
    this.showLoading();
    this.mainService.makeFav(this.currentUser.user_id, club.club_id, 'club').subscribe(success => {
      if (success.status == 1) {
        this.getNearestClub();
        console.log(success);
        this.presentToast("Added to your favorite list");
        this.loading.dismiss();
        //console.log(this.clubs);
      } else {
        //this.loading.dismiss();
        this.presentToast(success.statusinfo);
        console.log(success);
        this.loading.dismiss();
      }
    },
      error => {
        this.loading.dismiss();
        console.log(error);
      });
  }
  deleteFav(club) {
    console.log(club);
    this.showLoading();
    this.mainService.deleteFav(this.currentUser.user_id, club.is_favorite).subscribe(success => {
      console.log(JSON.stringify(success));
      if (success.status == 1) {
        this.getNearestClub();
        console.log(success);
        this.presentToast("Removed from your favorite list");
        this.loading.dismiss();
      } else {
        this.presentToast(success.statusinfo);
        console.log(success);
        this.loading.dismiss();
      }
    },
      error => {
        this.loading.dismiss();
        console.log(error);
      });
  }
  getNearestClub() {
    this.offset = 0;
    //this.showLoading();
    //this.searching = true;
    this.mainService.getNearestClub(this.currentUser.user_id, this.lat, this.lng, this.distance, this.search_string, this.offset).subscribe(success => {
      if (success.status == 1) {
        if (success.data.length == 0) {
          // alert("Error");
          this.noClubsFound = true;
        } else {
          // alert("Success");
          this.noClubsFound = false;
        }
        this.clubs = success.data;
        this.shootsTemp = success.data;
        console.log(this.clubs);
      } else {
      }
    },
      error => {
        this.searching = false;
        console.log(error);
      });
  }

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  getAllBanner() {
    debugger;
    this.convertDate();
    this.mainService.getBanner('findclub', this.timeZone).subscribe(success => {
      if (success.status == 1) {
        console.log(success);
        this.banners = success.data;
        //this.clubs.push(this.banners);
        console.log(this.clubs);
      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }

  doInfinite(infiniteScroll) {
    console.log(this.offset);
    this.offset = this.offset + 1;
    setTimeout(() => {
      this.mainService.getNearestClub(this.currentUser.user_id, this.lat, this.lng,
        this.distance, this.search_string, this.offset).subscribe(success => {
          if (success.status == 1) {
            if (success.data.length == 0) {
            } else {
              for (let i = 0; i < success.data.length; i++) {
                let data = {
                  club_id: success.data[i]['club_id'],
                  address: success.data[i]['address'],
                  city: success.data[i]['city'],
                  club_image: success.data[i]['club_image'],
                  club_name: success.data[i]['club_name'],
                  contact_email: success.data[i]['contact_email'],
                  contact_firstname: success.data[i]['contact_firstname'],
                  contact_lastname: success.data[i]['contact_lastname'],
                  contact_name: success.data[i]['contact_name'],
                  created_date: success.data[i]['created_date'],
                  is_favorite: success.data[i]['is_favorite'],
                  is_my_shoot: success.data[i]['is_my_shoot'],
                  lat: success.data[i]['lat'],
                  lng: success.data[i]['lng'],
                  phone_number: success.data[i]['phone_number'],
                  shoots: success.data[i]['shoots'],
                  state: success.data[i]['state'],
                  url: success.data[i]['url'],
                  zip_code: success.data[i]['zip_code'],

                }
                // this.clubs.push(success.data[i]['club_id']);
                this.clubs.push(data);
              }
              console.log(this.clubs);
            }
          } else {
            console.log(success);
          }
        });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
