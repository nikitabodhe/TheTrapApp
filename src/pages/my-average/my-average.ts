  import { Component, ViewChild } from '@angular/core';
  import { NavController, NavParams, Events, AlertController, LoadingController, Loading, Slides } from 'ionic-angular';
  import { MainService } from '../../providers/main-service';

  /*
    Generated class for the MyAverage page.

    See http://ionicframework.com/docs/v2/components/#navigation for more info on
    Ionic pages and navigation.
  */
  @Component({
    selector: 'page-my-average',
    templateUrl: 'my-average.html',

  })
  export class MyAveragePage {
    timeZone:any;
    segment: string = 'all';
    noMyAvgScores: boolean = true;
    allavg:any;
    allTotal:any;
    ATAavg:any;
    ATATotal:any;
    PITAavg:any;
    PITATotal:any
    LGEavg:any;
    LGEtotal:any;
    PRCTavg:any;
    PRCTtotal:any;
    @ViewChild(Slides) slides: Slides;
    selectedSegment: string;
    myAvgScores = {
      'ATA': {
        doubleavg: '', doublefivehundred: '', doublelastyear: '', doublesfivehundred: '', doubleslastyear: '', doubletotal: '', handicapavg: '', handicapfivehundred: ''
        , handicaplastyear: '', handicaptotal: '', singleavg: '', singlefivehundred: '', singlelastyear: '', singletotal: ''
      },
      'PITA': {
        doubleavg: '', doublefivehundred: '', doublelastyear: '', doublesfivehundred: '', doubleslastyear: '', doubletotal: '', handicapavg: '', handicapfivehundred: ''
        , handicaplastyear: '', handicaptotal: '', singleavg: '', singlefivehundred: '', singlelastyear: '', singletotal: ''
      },
      'LEAGUE': {
        doubleavg: '', doublefivehundred: '', doublelastyear: '', doublesfivehundred: '', doubleslastyear: '', doubletotal: '', handicapavg: '', handicapfivehundred: ''
        , handicaplastyear: '', handicaptotal: '', singleavg: '', singlefivehundred: '', singlelastyear: '', singletotal: ''
      },
      'PRACTICE': {
        doubleavg: '', doublefivehundred: '', doublelastyear: '', doublesfivehundred: '', doubleslastyear: '', doubletotal: '', handicapavg: '', handicapfivehundred: ''
        , handicaplastyear: '', handicaptotal: '', singleavg: '', singlefivehundred: '', singlelastyear: '', singletotal: ''
      },
      'alllevel': {
        doubleavg: '', doublefivehundred: '', doublelastyear: '', doublesfivehundred: '', doubleslastyear: '', doubletotal: '', handicapavg: '', handicapfivehundred: ''
        , handicaplastyear: '', handicaptotal: '', singleavg: '', singlefivehundred: '', singlelastyear: '', singletotal: ''
      },
      'eventlist': []
    };
    currentUser: any;
    loading: Loading;
    targetYear: any;
    targetYears: any;
    year: any = new Date().toISOString();
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private mainService: MainService,  private loadingCtrl: LoadingController) {
      // this.targetYear = new Date().getFullYear();
      // this.year=new Date().getFullYear();
      //this.targetYear =new Date().getFullYear().toString();
      // this.targetYears='0';
      this.loadCurrenrUser();
      this.getTargetear();
    }

    convertDate(){
      var offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
      console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
      this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    }

    slideChanged(val) {
      let currentIndex = this.slides.getActiveIndex();
      console.log(currentIndex);
      switch (currentIndex) {
        case 0:
          this.segment = 'all';
          break;
        case 1:
          this.segment = 'ata';
          break;
        case 2:
          this.segment = 'pita';
          break;
        case 3:
          this.segment = 'lge';
          break;
        case 4:
          this.segment = 'pract';
          break;
      }

      switch (val) {
        case 'all':
          this.slides.slideTo(0);
          break;
        case 'ata':
          this.slides.slideTo(1);
          break;
        case 'pita':
          this.slides.slideTo(2);
          break;
        case 'lge':
          this.slides.slideTo(3);
          break;
        case 'pract':
          this.slides.slideTo(4);
          break;
      }
    }



    showLoading() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
    }

    loadCurrenrUser() {
      this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    }

    getTargetear() {
      debugger;
      this.convertDate();
      this.mainService.get_target_year(this.timeZone).subscribe(success => {
        if (success.status == 1) {
          this.targetYear = success.data;
          this.targetYears= success.atatargetyear;
          this.getMyAVg();
          console.log(this.targetYear);
        } else {
          //this.loading.dismiss();

          console.log(success);
        }
      },
        error => {
          console.log(error);
        });
    }

    filterByTargetYear(newValue) {
      console.log(newValue);
      this.showLoading();
      this.mainService.getMyAVg(this.currentUser.user_id, newValue).subscribe(success => {
        if (success.status == 1) {
          this.loading.dismiss();
          console.log(success);
          if (success.data.length == 0) {
            this.noMyAvgScores = true;
          } else {
            this.noMyAvgScores = false;
            this.myAvgScores = success.data;
            console.log('myAvgScores', success.data);
              this.allavg= (parseFloat(this.myAvgScores.alllevel.singleavg) + parseFloat(this.myAvgScores.alllevel.handicapavg)+ parseFloat(this.myAvgScores.alllevel.doubleavg))/3;
          this.allTotal=parseFloat(this.myAvgScores.alllevel.singletotal) + parseFloat(this.myAvgScores.alllevel.handicaptotal)+ parseFloat(this.myAvgScores.alllevel.doubletotal);
          
          this.ATAavg= (parseFloat(this.myAvgScores.ATA.singleavg) + parseFloat(this.myAvgScores.ATA.handicapavg)+ parseFloat(this.myAvgScores.ATA.doubleavg))/3;
          this.ATATotal=parseFloat(this.myAvgScores.ATA.singletotal) + parseFloat(this.myAvgScores.ATA.handicaptotal)+ parseFloat(this.myAvgScores.ATA.doubletotal);

          this.PITAavg= (parseFloat(this.myAvgScores.PITA.singleavg) + parseFloat(this.myAvgScores.PITA.handicapavg)+ parseFloat(this.myAvgScores.PITA.doubleavg))/3;
          this.PITATotal=parseFloat(this.myAvgScores.PITA.singletotal) + parseFloat(this.myAvgScores.PITA.handicaptotal)+ parseFloat(this.myAvgScores.PITA.doubletotal);


          this.LGEavg= (parseFloat(this.myAvgScores.LEAGUE.singleavg) + parseFloat(this.myAvgScores.LEAGUE.handicapavg)+ parseFloat(this.myAvgScores.LEAGUE.doubleavg))/3;
          this.LGEtotal=parseFloat(this.myAvgScores.LEAGUE.singletotal) + parseFloat(this.myAvgScores.LEAGUE.handicaptotal)+ parseFloat(this.myAvgScores.LEAGUE.doubletotal);

          this.PRCTavg= (parseFloat(this.myAvgScores.PRACTICE.singleavg) + parseFloat(this.myAvgScores.PRACTICE.handicapavg)+ parseFloat(this.myAvgScores.PRACTICE.doubleavg))/3;
          this.PRCTtotal=parseFloat(this.myAvgScores.PRACTICE.singletotal) + parseFloat(this.myAvgScores.PRACTICE.handicaptotal)+ parseFloat(this.myAvgScores.PRACTICE.doubletotal);
          }
        } else {
          this.loading.dismiss();
          console.log(success);
        }
      },
        error => {
          this.loading.dismiss();
          console.log(error);
        });
    }
    getMyAVg() {
      this.showLoading();
      this.mainService.getMyAVg(this.currentUser.user_id, this.targetYears).subscribe(success => {
        if (success.status == 1) {
          this.loading.dismiss();
          console.log(success);

          if (success.data.length == 0) {
            this.noMyAvgScores = true;
          } else {
            this.noMyAvgScores = false;
            this.myAvgScores = success.data;
          this.allavg= (parseFloat(this.myAvgScores.alllevel.singleavg) + parseFloat(this.myAvgScores.alllevel.handicapavg)+ parseFloat(this.myAvgScores.alllevel.doubleavg))/3;
          this.allTotal=parseFloat(this.myAvgScores.alllevel.singletotal) + parseFloat(this.myAvgScores.alllevel.handicaptotal)+ parseFloat(this.myAvgScores.alllevel.doubletotal);
          
          this.ATAavg= (parseFloat(this.myAvgScores.ATA.singleavg) + parseFloat(this.myAvgScores.ATA.handicapavg)+ parseFloat(this.myAvgScores.ATA.doubleavg))/3;
          this.ATATotal=parseFloat(this.myAvgScores.ATA.singletotal) + parseFloat(this.myAvgScores.ATA.handicaptotal)+ parseFloat(this.myAvgScores.ATA.doubletotal);

          this.PITAavg= (parseFloat(this.myAvgScores.PITA.singleavg) + parseFloat(this.myAvgScores.PITA.handicapavg)+ parseFloat(this.myAvgScores.PITA.doubleavg))/3;
          this.PITATotal=parseFloat(this.myAvgScores.PITA.singletotal) + parseFloat(this.myAvgScores.PITA.handicaptotal)+ parseFloat(this.myAvgScores.PITA.doubletotal);


          this.LGEavg= (parseFloat(this.myAvgScores.LEAGUE.singleavg) + parseFloat(this.myAvgScores.LEAGUE.handicapavg)+ parseFloat(this.myAvgScores.LEAGUE.doubleavg))/3;
          this.LGEtotal=parseFloat(this.myAvgScores.LEAGUE.singletotal) + parseFloat(this.myAvgScores.LEAGUE.handicaptotal)+ parseFloat(this.myAvgScores.LEAGUE.doubletotal);

          this.PRCTavg= (parseFloat(this.myAvgScores.PRACTICE.singleavg) + parseFloat(this.myAvgScores.PRACTICE.handicapavg)+ parseFloat(this.myAvgScores.PRACTICE.doubleavg))/3;
          this.PRCTtotal=parseFloat(this.myAvgScores.PRACTICE.singletotal) + parseFloat(this.myAvgScores.PRACTICE.handicaptotal)+ parseFloat(this.myAvgScores.PRACTICE.doubletotal);

          console.log(  this.PITAavg, this.PITATotal);
          
          }
        } else {
          this.loading.dismiss();
          console.log(success);

        }
      },
        error => {
          this.loading.dismiss();
          console.log(error);
        });
    }

  }
