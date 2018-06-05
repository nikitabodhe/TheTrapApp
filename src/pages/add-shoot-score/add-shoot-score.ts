import { Component } from '@angular/core';
import { NavController, NavParams , ViewController } from 'ionic-angular';
import{ AddAtaPitaShootPage } from '../add-ata-pita-shoot/add-ata-pita-shoot';
import{ AddEventOnShootPage } from '../add-event-on-shoot/add-event-on-shoot';

/*
  Generated class for the AddShootScore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-shoot-score',
  templateUrl: 'add-shoot-score.html'
})
export class AddShootScorePage {

  shootdetails : any;
  currentUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {
  	this.shootdetails = navParams.get('shoot');
   //console.log(this.shootdetails);
  	this.loadCurrenrUser();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShootScorePage');
    //this.viewCtrl.setBackButtonText('Close');
  }

  addShootDetails(event, shootDetails, eventDetails){
    console.log(eventDetails);
  	this.navCtrl.push(AddAtaPitaShootPage,{
      shoot : shootDetails,
      event : eventDetails
    }); 
  }

  addShootDetailsNew(event, shootDetails ){

    this.navCtrl.push(AddEventOnShootPage,{
      shoot : shootDetails
    });
  }

}
