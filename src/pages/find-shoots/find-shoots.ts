import { Component } from '@angular/core';
import { NavController, NavParams , AlertController, LoadingController, Loading , ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { ShootDetailsPage } from '../shoot-details/shoot-details';
import { MainService } from '../../providers/main-service';
//import { Search } from '../../pipes/search';
 import{ AddShootsPage } from '../add-shoots/add-shoots';
//import{ AddNewShootPage } from '../add-new-shoot/add-new-shoot';

@Component({
  selector: 'page-find-shoots',
  templateUrl: 'find-shoots.html'
})
export class FindShootsPage {

  searchQuery: string = '';
  items: string[];
  segment : string = 'all';
  noShootFound : boolean = false;
  shoots = [];
  shootsTemp : any;
  loading: Loading;
  distance : number = 0;
  zip_code : string = '';
  search_string : string = '';
  lat : number;
  lng : number;
  banners : any=[];
  currentUser : any;
  searching : boolean = true;
  offset:any;
  timeZone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mainService : MainService, private loadingCtrl: LoadingController , private toastCtrl: ToastController) {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.offset = 0;
  }
  ionViewDidLoad() {
      this.getAllBanner();
     this.getNearestShoots(); 
  }
  loadLatLong(){
    Geolocation.getCurrentPosition().then((resp) => {
      // alert('Lat :'+resp.coords.latitude);
      // this.lat = resp.coords.latitude;
      // this.lng = resp.coords.longitude;
      // this.getNearestShoots();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  getItems(ev: any) {

    
    // Reset items back to all of the items
   
    // set val to the value of the searchbar
    this.search_string = ev.target.value;
    //console.log(val);
    // if the value is an empty string don't filter the items
    if (this.search_string && this.search_string.trim() != ''|| this.search_string && this.search_string.trim() != null) {
      //this.getNearestShoots();
      this.shoots = this.shootsTemp.filter((item) => {
        //return (item.shoot_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1);
        if((item.shoot_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
        if((item.shoot_address.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
        if((item.zip_code.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
        if((item.city.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
        if((item.state.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
        if((item.club_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
        return false;
      });
    }else{
      this.shoots = this.shootsTemp;
      //this.getNearestShoots();
    }
  }
  shootDetails(event, shoot){

  	this.navCtrl.push(ShootDetailsPage,{
      shoot : shoot
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
  makeFav(shoot){

    console.log(shoot);
    this.showLoading();
    this.mainService.makeFav(this.currentUser.user_id,shoot.shoot_id,'shoot').subscribe(success => {
      if(success.status == 1){
        this.getNearestShoots();
        this.loading.dismiss();
        console.log(success);
        //this.presentToast(success.statusinfo);
        this.presentToast("Added to your favorite list");
        this.segment = 'all';
        //console.log(this.clubs);
      }else{
        this.loading.dismiss();
        this.presentToast(success.statusinfo);
        console.log(success);
        
      }
    },
    error => {
      // this.loading.dismiss();
      console.log( error);
    });


  }
  deleteFav(shoot){

    console.log(shoot);
    this.showLoading();
    this.mainService.deleteFav(this.currentUser.user_id,shoot.is_favorite).subscribe(success => {

      
      if(success.status == 1){
        
        this.getNearestShoots();
        console.log(success);
        this.presentToast("Removed from your favorite list");
        this.loading.dismiss();
        this.segment = 'all';

        
        
      }else{
        this.presentToast(success.statusinfo);
        console.log(success);
        this.loading.dismiss();
        
      }
    },
    error => {
      this.loading.dismiss();
      console.log( error);
    });


  }
  searchShoots(){
    //this.getNearestShoots();
    //console.log(this.zip_code);


    if( this.zip_code != ''){
      this.mainService.get_lat_long(this.zip_code).subscribe(success => {

        //console.log(success.results[0].geometry.location);
        this.lat = success.results[0].geometry.location.lat;
        this.lng = success.results[0].geometry.location.lng;
        this.getNearestShoots();
      },
      error => {
        //this.loading.dismiss();
        console.log( error);
      });
    }else{
      this.getNearestShoots();
    }
    
    
  }
  filterByLevel(newValue) {
    this.searching = true;
    this.mainService.getNearestShoots(this.lat,this.lng,this.distance,this.search_string,
       this.currentUser.user_id,this.offset).subscribe(success => {
      if(success.status == 1){
        //this.loading.dismiss();
        this.searching = false;
        
        this.shoots = success.data;
        console.log(this.shoots);
        // this.shootsTemp = success.data;
        if(newValue != 'all'){
            this.shoots = this.shoots.filter((item) => {
              //return (item.levelname.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1);
              //return (item.levelname == newValue);
              return (item.levelname == newValue);
              //return item;
            })
        }
      }else{
        //this.loading.dismiss();
        this.searching = false;
        console.log(success);
        
      }
    },
    error => {
      //this.loading.dismiss();
      this.searching = false;
      console.log( error);
    });
    
  }
  getNearestShoots (){
    this.offset = 0;
    //this.showLoading();
    this.mainService.getNearestShoots(this.lat,this.lng,this.distance,this.search_string, this.currentUser.user_id,this.offset).subscribe(success => {
      if(success.status == 1){
        //this.loading.dismiss();
        this.searching = false;
        console.log(success);

        if(success.data.length == 0 ){
          this.noShootFound = true;
        }else{
          this.noShootFound = false;
        }
        this.shoots = success.data;
        this.shootsTemp = success.data;
      }else{
        //this.loading.dismiss();
        this.searching = false;
        console.log(success);
      }
    },
    error => {
      // this.loading.dismiss();
      this.searching = false;
      console.log( error);
    });
  }

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  getAllBanner (){
    debugger;
    this.convertDate();
    this.mainService.getBanner('findshoot', this.timeZone).subscribe(success => {
      if(success.status == 1){
        console.log(success);
        console.log(JSON.stringify(success));
        console.log('getAllBanner.res1');
        this.banners = success.data;
        //this.clubs.push(this.banners);
      }else{
        console.log(success);
        console.log('getAllBanner.res2');
        console.log(JSON.stringify(success));
      }
    },
    error => {
      console.log( error);
    });
  }
  addShoots(event){
    this.navCtrl.push(AddShootsPage); 
  }
  doInfinite(infiniteScroll) {
    
    this.offset =this.offset +1;
    console.log(this.lat,this.lng,this.distance,this.search_string, this.currentUser.user_id,this.offset);
    setTimeout(() => {
      this.mainService.getNearestShoots(this.lat,this.lng,this.distance,this.search_string, this.currentUser.user_id,this.offset).subscribe(success => {
          if (success.status == 1) {
            if (success.data.length == 0) {
            } else {
              for (let i = 0; i < success.data.length; i++) {
                let data = {
                  shoot_id: success.data[i]['shoot_id'],
                  shoot_name:success.data[i]['shoot_name'],
                  club_id: success.data[i]['club_id'],
                  shoot_address: success.data[i]['shoot_address'],
                  city: success.data[i]['city'],
                  club_image:success.data[i]['club_image'],
                  club_name:success.data[i]['club_name'],
                  contact_email:success.data[i]['contact_email'],
                  contact_firstname:success.data[i]['contact_firstname'],
                  contact_lastname:success.data[i]['contact_lastname'],
                  contact_name:success.data[i]['contact_name'],
                  distance:success.data[i]['distance'],
                  is_favorite: success.data[i]['is_favorite'],
                  is_my_shoot:success.data[i]['is_my_shoot'],
                  lat:success.data[i]['lat'],
                  lng:success.data[i]['lng'],
                  phone_number:success.data[i]['phone_number'],
                  shoots:success.data[i]['shoots'],
                  state:success.data[i]['state'],
                  url:success.data[i]['url'],
                  zip_code:success.data[i]['zip_code'],
                  level_id:success.data[i]['level_id'],
                  levelname:success.data[i]['levelname'],
                  shoot_date:success.data[i]['shoot_date'],
                  shoot_end_date:success.data[i]['shoot_end_date'],
                }
             
                this.shoots.push(data);
              }
            
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
