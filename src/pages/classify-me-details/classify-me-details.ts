import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { MainService } from '../../providers/main-service';

/*
  Generated class for the ClassifyMeDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classify-me-details',
  templateUrl: 'classify-me-details.html'
})
export class ClassifyMeDetailsPage {
  timeZone:any;
  segment: string = 'sgl';
  level_id: string;
  currentUser: any;
  loading: Loading;
  targetYear: any;
  targetYears: any;
  myAvgScores = {

    'singles': { average: '', total: '', fivehundred: '', onethousand: '' },
    'doubles': { average: '', total: '', fivehundred: '', onethousand: '' },
    'handicap': { average: '', total: '', fivehundred: '', onethousand: '' },
    'eventlist': []
  };
  noMyAvgScores: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mainService: MainService, private loadingCtrl: LoadingController) {
    this.level_id = navParams.get('level_id');
    //  console.log(this.level_id);

    //  this.targetYear =new Date().getFullYear().toString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyMeDetailsPage');
  }

  ngOnInit() {
    this.loadCurrenrUser();
    this.getTargetear();

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

  filterByTargetYear(newValue) {
    // console.log(newValue);
    this.showLoading();
    this.mainService.classify_me(newValue, this.currentUser.user_id, this.level_id).subscribe(success => {
      if (success.status == 1) {
        this.loading.dismiss();
        console.log(success);
        if (success.data.length == 0) {
          this.noMyAvgScores = true;
        } else {
          this.noMyAvgScores = false;
          this.myAvgScores = success.data;
        }

      } else {
        this.loading.dismiss();
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  getTargetear() {
    debugger;
    this.convertDate();
    this.mainService.get_target_year(this.timeZone).subscribe(success => {
      if (success.status == 1) {
        this.targetYear = success.data;
        this.targetYears = success.atatargetyear;
        console.log(this.targetYear);
        this.classify_me();
      } else {
        //this.loading.dismiss();
        this.targetYears = success.atatargetyear;
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  classify_me() {
    this.showLoading();
    this.mainService.classify_me(this.targetYears, this.currentUser.user_id, this.level_id).subscribe(success => {


      if (success.status == 1) {
        this.loading.dismiss();
        console.log(success);
        if (success.data.length == 0) {
          this.noMyAvgScores = true;
        } else {
          this.noMyAvgScores = false;
          this.myAvgScores = success.data;
        }
      } else {
        this.loading.dismiss();
        console.log(success);
      }

    },
      error => {
        console.log(error);
      });
  }

}
