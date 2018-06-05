import { Component } from '@angular/core';
import { NavController, NavParams,  LoadingController, Loading, ToastController } from 'ionic-angular';
import { NoteDetailsPage } from '../note-details/note-details';
import { MainService } from '../../providers/main-service';
@Component({
  selector: 'page-my-notes',
  templateUrl: 'my-notes.html'

})
export class MyNotesPage {
  searchQuery: string = '';
  loading: Loading;
  segment: any = 'all';
  segment2: any = 'all';
  segment3: any = 'all';
  currentUser: any;
  noNotesFound: boolean;
  searching: boolean;
  notes: any;
  index3: any;
  search_string: string='';
  banners: any=[];
  targetYears:any;
  targetYear:any;
  timeZone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mainService: MainService,  private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
   // this.targetYears= 'all'
  }

ionViewDidLoad(){
this.getAllBanner();
}
  ionViewDidEnter() {
     this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    // this.targetYears='all';
    this.getTargetear();
    
    
    
    console.log('ionViewDidLoad MyNotesPage');
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
    this.mainService.getBanner('mynotes', this.timeZone).subscribe(success => {
      if (success.status == 1) {
        console.log(success);
        this.banners = success.data;
        //this.clubs.push(this.banners);
      } else {
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
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
  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();
    // set val to the value of the searchbar
    this.search_string = ev.target.value;
    //console.log(val);
    this.searching = true;
    this.mainService.getNotes(this.currentUser.user_id,this.segment,this.segment2,this.targetYears,this.segment3).subscribe(success => {
     
      if (success.status == 1) {
        //this.loading.dismiss();
        this.searching = false;
     
        this.notes = success.data;

        //if the value is an empty string don't filter the items
        if (this.search_string && this.search_string.trim() != '') {
          this.notes = this.notes.filter((item) => {
            if (item.shoot_name != null && item.shoot_name.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1) {
              return true;
            }
            if (item.note != null && item.note.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1) {
              return true;
            }

          })
        } else {
          //this.getNotes();
        }

      } else {
        this.searching = false;
        //this.loading.dismiss();
        console.log(success);

      }
    },
      error => {
        //this.loading.dismiss();
        console.log(error);
      });

  }
  filterByYear(year) {
    this.mainService.getNotes(this.currentUser.user_id,this.segment,this.segment2,year,this.segment3).subscribe(success => {
      if (success.status == 1) {
        //this.loading.dismiss();
        this.notes = success.data;
        console.log(success);
        // this.notes = this.notes.filter((item) => {
        //   //return (item.levelname.toLowerCase().indexOf(this.search_string.toLowerCase()) > -1);
        //   //return (item.levelname == newValue);
        //   return (new Date(item.created_on).getFullYear() == newValue);
        //   //return item;
        // })
      } else {
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  getTargetear() {
    this.mainService.get_target_year(this.timeZone).subscribe(success => {
      if (success.status == 1) {
        this.targetYear = success.data;
         this.targetYears= success.atatargetyear;
         this.getNotes();
        console.log(this.targetYears);
      } else {
        //this.loading.dismiss();
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  makeFav(note) { 
    //console.log(note);
    this.mainService.makeFav(this.currentUser.user_id, note.note_id,'note').subscribe(success => {
      if (success.status == 1) {
        this.getNotes();
        console.log(success);
        this.presentToast("Added to your favorite list");
      
      } else {
        this.presentToast(success.statusinfo);
        console.log(success);
        
      }
    },
      error => {
        this.loading.dismiss();
        console.log(error);
      });


  }
  deleteFav(note) {
    console.log(note);
 
    this.mainService.deleteFav(this.currentUser.user_id, note.is_favorite).subscribe(success => {
      if (success.status == 1) {
        this.getNotes();
        console.log(success);
        this.presentToast("Removed from your favorite list");
      } else {
        this.presentToast(success.statusinfo);
        console.log(success);
      }
    },
      error => {
        this.loading.dismiss();
      });
  }
  getNotes() {
    this.showLoading();
    this.mainService.getNotes(this.currentUser.user_id,this.segment,this.segment2,this.targetYears,this.segment3).subscribe(success => {
      if (success.status == 1) {
        this.loading.dismiss();
        if (success.data.length == 0) {
          this.noNotesFound = true;
        } else {
          this.noNotesFound = false;
        }
        console.log('bannerInfo',success);
        this.notes = success.data;
      } else {
        this.loading.dismiss();
      }
    },
      error => {
        this.loading.dismiss();
        console.log(error);
      });
  }
  filterByLevel(level) {
    this.searching = true;
    //console.log(this.currentUser.user_id,this.search_string,newValue,this.segment2,this.targetYears,this.segment3);
    this.mainService.getNotes(this.currentUser.user_id,level,this.segment2,this.targetYears,this.segment3).subscribe(success => {
      if (success.status == 1) {
        this.notes = success.data;
        console.log(success);
        this.searching = false;
        //console.log(this.notes);
        // if (newValue != 'all') {
        //   this.notes = this.notes.filter((item) => {
        //     return (item.levelname == newValue);
        //   })
        // }
      } else {
        this.searching = false;
      }
    },
      error => {
        this.searching = false;
        //this.loading.dismiss();
        console.log(error);
      });
  }
  filterByFav(favorite) {
    this.searching = true;
    this.mainService.getNotes(this.currentUser.user_id,this.segment,favorite,this.targetYears,this.segment3).subscribe(success => {


      if (success.status == 1) {
        this.notes = success.data;
        this.searching = false;
        console.log(success);
        //console.log(this.notes);
        // if (newValue != 'all') {
        //   this.notes = this.notes.filter((item) => {
        //     return (item.is_favorite);
        //   })

        // }

      } else {
        this.searching = false;
        //this.loading.dismiss();
        //console.log(success);

      }
    },
      error => {
        this.searching = false;
        //this.loading.dismiss();
        console.log(error);
      });


  }
  filterByType(type) {
    this.searching = true;
    this.mainService.getNotes(this.currentUser.user_id,this.segment,this.segment2,this.targetYears,type).subscribe(success => {
      if (success.status == 1) {
        this.notes = success.data;
        this.searching = false;
        console.log(success);
        //console.log(this.notes);
        // if (newValue != 'all') {
        //   this.notes = this.notes.filter((item) => {
        //     return (item.typename == newValue);
        //   })

        // }

      } else {
        this.searching = false;
        //this.loading.dismiss();
        //console.log(success);

      }
    },
      error => {
        this.searching = false;
        //this.loading.dismiss();
        console.log(error);
      });


  }
  noteDetails(event, note) {

    this.navCtrl.push(NoteDetailsPage, {
      note: note
    });

  }

}
