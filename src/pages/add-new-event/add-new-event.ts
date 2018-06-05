import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';
import{ AddNewShootPage } from '../add-new-shoot/add-new-shoot';

/*
  Generated class for the AddNewEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-new-event',
  templateUrl: 'add-new-event.html'
})
export class AddNewEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewEventPage');
  }

  addNewShoot(){
  	this.navCtrl.push(AddNewShootPage); 
  }



}
