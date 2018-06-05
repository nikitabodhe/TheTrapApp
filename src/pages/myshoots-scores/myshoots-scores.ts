import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Slides, Loading, ToastController, AlertController, ItemSliding } from 'ionic-angular';
import { MainService } from '../../providers/main-service';
import { MyShootSummeryPage } from '../my-shoot-summery/my-shoot-summery';
import { AddNewShootPage } from '../add-new-shoot/add-new-shoot';
import { AddShootsPage } from '../add-shoots/add-shoots';
import { jsonpFactory } from '@angular/http/src/http_module';

/*
  Generated class for the MyshotsScores page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myshoots-scores',
  templateUrl: 'myshoots-scores.html'
})
export class MyshootsScoresPage {
  @ViewChild(Slides) slides: Slides;
  searchQuery: string = '';
  items: string[];
  segment: string = 'all';
  currentUser: any;
  myShootsScores: any = [];
  loading: Loading;
  search_string: string = '';
  searching: boolean = true;
  banners: any = [];
  targetYear: any;
  targetYears: any;
  timeZone:any;
  extraOptions = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private mainService: MainService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, public alertCtrl: AlertController) {
    //this.targetYear1 =new Date().getFullYear().toString();
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.extraOptions = {
      loop: true
    }
    if(window.localStorage.getItem('page'))
    {
      window.localStorage.removeItem("page");
      window.localStorage.removeItem("data_id");
    }
  }
  onSlideChanged() {
    this.extraOptions = {
      loop: 'true',
      pagination: '.swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: 100,
      autoplayDisableOnInteraction: false
    }
  }
  ionViewDidLoad() {
    this.getAllBanner();
    this.getTargetear();
    this.segment = 'all';
  }
  ionViewDidEnter() {
    //this.getmyShootsScores();

  }
  getItems(ev: any) {
 
    // set val to the value of the searchbar
    this.search_string = ev.target.value;
    if (this.search_string && this.search_string.trim() != '' && this.search_string.trim() != undefined) {
      //this.getmyShootsScores();
      this.mainService.get_my_shoots_score(this.currentUser.user_id).subscribe(success => {
        if (success.status == 1) {
          console.log(success);
          this.myShootsScores = success.data;
          this.myShootsScores = this.myShootsScores.filter((item) => {
            //return (item.shoot_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1);
            if ((item.shoot_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            if (item.shoot_address) {
              if ((item.shoot_address.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            }
            if (item.zip_code) {
              if ((item.zip_code.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            }
            if (item.city) {
              if ((item.city.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            }
            if (item.state) {
              if ((item.state.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            }
            if (item.club_name) {
              if ((item.club_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1)) return true;
            }
            return false;
          })
          if (this.myShootsScores == null || this.myShootsScores == '' || this.myShootsScores == undefined) {
            this.showConfirms();
          }
        } else {
          console.log(success);
          this.showConfirms();
        }
      },
        error => {
          //this.loading.dismiss();
          this.showConfirms();
          console.log(error);
        });
    }
  }
  getTargetear() {
 
    this.mainService.get_target_year(this.timeZone).subscribe(success => {
      if (success.status == 1) {
        this.targetYear = success.data;
        this.targetYears = success.atatargetyear;
        console.log(success);
        //this.targetYears= this.targetYear[0].year;
        this.getmyShootsScores();
        // console.log(this.targetYear);
      } else {
        //this.loading.dismiss();
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  filterByLevel(newValue) {

    this.searching = true;
    this.mainService.get_my_shoots_by_level(this.currentUser.user_id, newValue, this.targetYears).subscribe(success => {
      if (success.status == 1) {
        this.searching = false;
        console.log(success);
        this.myShootsScores = success.data;
      

        // if(newValue != 'all'){
        //     this.myShootsScores = this.myShootsScores.filter((item) => {
        //       //return (item.levelname.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1);
        //       // return (item.levelname == newValue);
        //      // return (item.levelname == newValue);
        //        if((item.levelname==newValue)) return true;
        //         if(new Date(item.shoot_date).getFullYear() == newValue) return true;
        //       //return item;
        //     })
        // }
      } else {
        //this.loading.dismiss();
        this.searching = false;
        console.log(success);
      }
    },
      error => {
        //this.loading.dismiss();
        this.searching = false;
        console.log(error);
      });
  }
  filterByTargetYear(newValue) {
  
    console.log(newValue);
    this.searching = true;
    this.mainService.get_my_shoots(this.currentUser.user_id, newValue, this.segment).subscribe(success => {
      if (success.status == 1) {
        //this.loading.dismiss();
        this.searching = false;
        console.log(success);
        this.myShootsScores = success.data;
        // if(newValue=='all'){
        //    this.myShootsScores = success.data;
        // }else{
        // this.myShootsScores = this.myShootsScores.filter((item) => {
        //   console.log(item);
        //   //return (item.levelname.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1);
        //   //return (item.levelname == newValue);
        //   return (new Date(item.shoot_date).getFullYear() == newValue);
        //   //return item;
        // })
        // }
      } else {
        //this.loading.dismiss();
        this.searching = false;
        console.log(success);
      }
    },
      error => {
        //this.loading.dismiss();
        this.searching = false;
        console.log(error);
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
  getmyShootsScores() {
   
   // this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.showLoading();
    this.mainService.get_my_shoots(this.currentUser.user_id, this.targetYears, this.segment).subscribe(success => {
      if (success.status == 1) {
        this.loading.dismiss();
        this.myShootsScores = success.data;
        //console.log(this.myShootsScores);
      } else {
        this.loading.dismiss();
      }
    },
      error => {
        this.loading.dismiss();
      });
  }
  makeFav(shoot) {
    console.log(shoot);
    // this.showLoading();
    this.mainService.makeFav(this.currentUser.user_id, shoot.shoot_id, 'shoot').subscribe(success => {


      if (success.status == 1) {
        this.getmyShootsScores();
        // this.loading.dismiss();
        console.log(success);
        //this.presentToast(success.statusinfo);
        this.presentToast("Added to your favorite list");
        this.segment = 'all';
        //console.log(this.clubs);

      } else {
        // this.loading.dismiss();
        this.presentToast(success.statusinfo);
        console.log(success);

      }
    },
      error => {
        // this.loading.dismiss();
        console.log(error);
      });


  }
  deleteFav(shoot) {
    
    console.log(shoot);
    // this.showLoading();
    this.mainService.deleteFav(this.currentUser.user_id, shoot.is_favorite).subscribe(success => {


      if (success.status == 1) {
        this.getmyShootsScores();
        //console.log(success);
        this.presentToast("Removed from your favorite list");
        // this.loading.dismiss();
        this.segment = 'all';



      } else {
        this.presentToast(success.statusinfo);
        console.log(success);
        // this.loading.dismiss();

      }
    },
      error => {
        // this.loading.dismiss();
        console.log(error);
      });


  }
  shootSummery(event, shoot) {
  
    console.log(shoot);
    this.navCtrl.push(MyShootSummeryPage, {
      shoots: shoot,
      shoot: shoot.shoot_id
    })
  }
  getAllBanner() {
    this.mainService.getBanner('shoot_and_score', this.timeZone).subscribe(success => {
      if (success.status == 1) {
        console.log(success);
        this.banners = success.data;

        // var shuffleArray = function (banners) {
        //   var m = this.banners.length, t, i;
        //   // While there remain elements to shuffle
        //   while (m) {
        //     // Pick a remaining element…
        //     i = Math.floor(Math.random() * m--);
        //     // And swap it with the current element.
        //     t = this.banners[m];
        //     this.banners[m] = this.banners[i];
        //     this.banners[i] = t;
        //   }
        //   return this.banners;
        // }

        //this.clubs.push(this.banners);
      } else {
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  showConfirm(shoot, created, slidingItem: ItemSliding, index) {
  
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you would like to delete this shoot?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log(this.currentUser.user_id, created);
            this.showLoading();
            this.mainService.delete_shoot(this.currentUser.user_id, shoot, created).subscribe(success => {
              if (success.status == 1) {
                this.myShootsScores.splice(index, 1);
                //this.getmyShootsScores();
                this.loading.dismiss();
                // this.ionViewDidEnter();

                console.log(success);
                //this.presentToast(success.statusinfo);
                this.presentToast("Shoot deleted Successfully");

              } else {
                this.presentToast("Something went wrong!");

              }
            },
              error => {
                console.log(error);
              });
          }
        }
      ]
    });
    confirm.present();
  }
  showConfirms() {

    let confirm = this.alertCtrl.create({
      message: 'No Results found.do you want to add new shoot?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //this.getmyShootsScores();
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(this.currentUser.user_id);
            this.navCtrl.push(AddShootsPage);
          }
        }
      ]
    });
    confirm.present();
  }
  addShoots(event) {
    
    this.navCtrl.push(AddNewShootPage, );
  }
  deleteShoot(shoot, created, slidingItem, index) {
    //console.log(this.currentUser.user_id);
    console.log(index);
    this.showConfirm(shoot, created, slidingItem, index);
    // if(this.currentUser.user_id == shoot.created_by){

    // }

  }

}
