import { Component } from '@angular/core';
import { NavController, NavParams , AlertController, LoadingController,ItemSliding, Loading,ToastController} from 'ionic-angular';
import { ClubDetailsPage } from '../club-details/club-details';
import { ShootDetailsPage } from '../shoot-details/shoot-details';
import { NoteDetailsPage } from '../note-details/note-details';
import { MainService } from '../../providers/main-service';

/*
  Generated class for the MyFav page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-fav',
  templateUrl: 'my-fav.html'
})
export class MyFavPage {
  timeZone:any;
  searchQuery: string = '';
  items: string[];
  segment : string = 'all';
  distance : number = 30;
  myFav = {
    'club' : [],
    'shoot' : [],
    'note' : [],
    'event' : []
  };
  isLoading : boolean;
  noMyAvgScores : boolean;
  searching : boolean;
  currentUser : any;
  loading : Loading;

  constructor( private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams , private mainService : MainService,private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    /*this.clubs = [];
    for(let i = 1; i < 4; i++) {
      this.clubs.push({
        title: 'Item ' + i,
        note: 'This is item #' + i
      });
    }
    this.notes = [];
    for(let i = 1; i < 4; i++) {
      this.notes.push({
        title: 'Item ' + i,
        note: 'This is item #' + i
      });
    }*/

  }

  ngOnInit(){
    this.loadCurrenrUser();
    this.getFav();
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

  deleteFav(shoot){
    console.log(shoot);
    // this.showLoading();
    this.mainService.deleteFav(this.currentUser.user_id,shoot.favorite_id).subscribe(success => {
      if(success.status == 1){
        this.getFav();
        console.log(success);
        this.presentToast("Removed from your favorite list");
        // this.loading.dismiss();
        this.segment = 'all';
      }else{
        this.presentToast(success.statusinfo);
        console.log(success);
        // this.loading.dismiss();
      }
    },
    error => {
      // this.loading.dismiss();
      console.log( error);
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
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }
  confirm(note,slidingItem: ItemSliding) {
    let confirm = this.alertCtrl.create({
      message: 'Would you like to remove this item from your favorites?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            
             this.deleteFav(note); 
          }
        }
      ]
    });
    confirm.present();
  }

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  getFav (){
    debugger;
    this.convertDate();
    this.searching = true;
    this.isLoading = true;
    this.mainService.getFav(this.currentUser.user_id, this.timeZone).subscribe(success => {

      
      if(success.status == 1){
        this.searching = false;
        this.isLoading = false;
        console.log(success);

        if(success.data.length == 0 ){
          this.noMyAvgScores = true;
        }else{
          this.noMyAvgScores = false;
        }

        this.myFav = success.data;
        
      }else{
        this.searching = false;
        this.isLoading = false;
        console.log(success);
        
      }
    },
    error => {
      console.log( error);
      this.searching = false;
      this.isLoading = false;
    });
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.searching = true;
      this.mainService.getFav(this.currentUser.user_id, this.timeZone).subscribe(success => {
        if(success.status == 1){
          //this.loading.dismiss();
          this.searching = false;
          console.log(success);

          if(success.data.club.length == 0 && success.data.club.length==0 && success.data.event.length==0 && success.data.note.length==0 && success.data.shoot.length==0 ){
            this.noMyAvgScores = true;
          }else{
            this.noMyAvgScores = false;
          }
          this.myFav = success.data;
          if (val && val.trim() != '') {
              this.myFav.club = this.myFav.club.filter((item) => {
                //console.log(item);
                //return (item.club_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                 if((item.club_name.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                 if((item.city.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                 if((item.state.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                  if((item.zip_code.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                  if((item.address.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                  return false;
              })
              this.myFav.shoot = this.myFav.shoot.filter((item) => {
                //console.log(item);
                // return (item.shoot_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                if((item.shoot_name.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                return false;
              })
              this.myFav.note = this.myFav.note.filter((item) => {
                if((item.shoot_name.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                 if((item.note.toLowerCase().indexOf(val.toLowerCase()) > -1)) return true;
                 return false;
                
                // return (item.shoot_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }else{
              this.getFav();
            }
          }else{
            //this.loading.dismiss();
            this.searching = false;
            console.log(success);
           
          }
      },
      error => {
        console.log( error);
        this.searching = false;
      });
    

    


  }

  shootDetails(event, shoot){
  	//this.navCtrl.push(ShootDetailsPage);

    this.navCtrl.push(ShootDetailsPage,{
      shoot : shoot
    }); 

  }
  clubDetails(event,club){
  	this.navCtrl.push(ClubDetailsPage, {
      club: club
    });
  }
  noteDetails(event, note){

    this.navCtrl.push(NoteDetailsPage, {
      note: note
    });
  	
  }
}
