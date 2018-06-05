import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { NotesEditPage } from '../notes-edit/notes-edit';
import { EventEditPage } from '../event-edit/event-edit';
/*
  Generated class for the NoteDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-note-details',
  templateUrl: 'note-details.html'
})
export class NoteDetailsPage {
  noteDetails: any;
 traps:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.noteDetails = navParams.get('note');
  // this.traps=this.noteDetails.traps;


  if(this.noteDetails.type_id==1){
   
  this.traps='Singles'
  
}
 if(this.noteDetails.type_id==2){

  this.traps='Doubles'
}
 if(this.noteDetails.type_id==3){

  this.traps='Handicap'
  }
     console.log(	this.noteDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteDetailsPage');
  }

  noteEdit(event, note){

    this.navCtrl.push(EventEditPage, {
      event: this.noteDetails,
      notes:'note'
    });
  	
  }

}
