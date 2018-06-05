import { Component } from '@angular/core';
import { NavController, NavParams , AlertController, LoadingController, Loading} from 'ionic-angular';
import { ClassifyMeDetailsPage } from '../classify-me-details/classify-me-details';
import { MainService } from '../../providers/main-service';
/*
  Generated class for the ClassifyMe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classify-me',
  templateUrl: 'classify-me.html'
})
export class ClassifyMePage {
  timeZone:any;
  levels : any;
  currentUser : any;
  loading : Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mainService : MainService, ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyMePage');
  }

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  ngOnInit(){
    this.getLevels();
  }

  classifyDetails(level_id){
  	this.navCtrl.push(ClassifyMeDetailsPage,{
        level_id : level_id
    });
  }

  loadCurrenrUser() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  }

  getLevels (){
    debugger;
    this.convertDate();
    this.mainService.getLevels(this.timeZone).subscribe(success => {

      
      if(success.status == 1){
        console.log(success);

        this.levels = success.data;
        //this.clubs.push(this.banners);
        //console.log(this.clubs);
        
      }else{
        console.log(success);
        
      }
    },
    error => {
      console.log( error);
    });
  }

}
