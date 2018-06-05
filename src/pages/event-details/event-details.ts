import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventEditPage } from '../event-edit/event-edit';

/*
  Generated class for the EventDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  eventDetails : any;
  shootDetails: any;
  mainShoot:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eventDetails = navParams.get('event');
     this.shootDetails = navParams.get('shootDetails');
     this.mainShoot=navParams.get('mainShoot');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
  }

  eventEdit(){
    this.navCtrl.push(EventEditPage,{
      event : this.eventDetails,
      evendetail: this.shootDetails,
      mainshoot:this.mainShoot
    });
  }

}
