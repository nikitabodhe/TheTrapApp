import { Component } from '@angular/core';
import { NavController, NavParams , ViewController , ModalController } from 'ionic-angular';
//import{ AddAtaPitaShootPage } from '../add-ata-pita-shoot/add-ata-pita-shoot';
//import{ ShootLeaguePage } from '../shoot-league/shoot-league';
import{ AddShootScorePage } from '../add-shoot-score/add-shoot-score';
//import{ AddNewEventPage } from '../add-new-event/add-new-event';
import { MainService } from '../../providers/main-service';
//import { ModalPage } from '../modal/modal';
import{ AddNewShootPage } from '../add-new-shoot/add-new-shoot';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
/*
  Generated class for the AddShoots page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-shoots',
  templateUrl: 'add-shoots.html',
  providers:[NativePageTransitions]
})
export class AddShootsPage {

  allShoots : any;
  //selectedItem: any;
  currentUser : any;
  pageViewed : any;
  range:any=0;
  roundLength:any=25;
  ranges: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController , public modalCtrl: ModalController , private mainService : MainService) {
  	//this.selectedItem = navParams.get('page');
    this.loadCurrenrUser();
    //this.pageViewed = window.localStorage.getItem("AddScore");
    this.getAllShoots();
    this.ranges = [
      {
        range: 0,
        roundLength: 25
      }
    ];
  }

  // openModal() {
  //   let profileModal = this.modalCtrl.create(ModalPage);
  //   profileModal.present();
  // }
  addTrap(){
    this.ranges.push({
        range: 0,
        roundLength: 25
    });
  }
deleteTrap(tempRange){
  this.ranges.splice(this.ranges.indexOf(tempRange),1);
}
  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Close');
    console.log(this.pageViewed);
    if(this.pageViewed == null){
      //alert('pop up');
      // this.openModal();
    }
  }

  // ionViewDidEnter(){
  //   this.getAllShoots();
  // }

  addShootDetails(event, shoot){
    console.log(shoot);
    this.navCtrl.push(AddShootScorePage,{
      shoot : shoot
    }); 
  }
  addNewShootPage(val,id){
  //debugger;
  	this.navCtrl.push(AddNewShootPage,{
      'Level':val,
      'id':id

    }); 
  }

  loadCurrenrUser() {
    
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

    /*NativeStorage.getItem('Currentuser')
      .then( function (data) {
        alert('UserID '+data.user_id);
        this.name = data.name;
        this.userName = data.username;
        
        
        //this.hideSplashScreen();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        //this.navCtrl.push(LoginPage);
        //this.hideSplashScreen();
      });*/
  }

  ngOnInit() {
      
  }

   getAllShoots(){
    this.mainService.getAddScores(this.currentUser.user_id).subscribe(success => {
      if(success.status == 1){
        console.log(success);
        this.allShoots = success.data;
         console.log(this.allShoots);
      }else{
        console.log(success);
      }
    },
    error => {
      console.log( error);
    });
  }

  //window.localStorage.setItem("IntroScreen", 'loaded');

}
