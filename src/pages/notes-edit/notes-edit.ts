import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the NotesEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notes-edit',
  templateUrl: 'notes-edit.html'
})
export class NotesEditPage {
range1:number;
range2:number;
range3:number;
range4:number;
total:number;
notes:any;
selectedItem : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notes = navParams.get('note');
    console.log( this.notes);
    this.range1=20;
    this.range2=14;
    this.range3=10;
    this.range4=22;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesEditPage');
    
  }

}
