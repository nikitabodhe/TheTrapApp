
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, AlertController, LoadingController, Loading } from 'ionic-angular';
//import { NativeStorage } from 'ionic-native';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { AddShootsPage } from '../add-shoots/add-shoots';
//import { ShootDetailsPage } from '../shoot-details/shoot-details';
import { MainService } from '../../providers/main-service';
//import { LoginPage } from '../login/login';
import { Chart } from 'chart.js';

import { Slides } from 'ionic-angular';
import { MyShootSummeryPage } from '../my-shoot-summery/my-shoot-summery';
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [NativePageTransitions]
})

export class DashboardPage {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas1') lineCanvas1;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas3') lineCanvas3;
  @ViewChild('lineCanvas4') lineCanvas4;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('barCanvas1') barCanvas1;
  @ViewChild('barCanvas2') barCanvas2;
  @ViewChild('barCanvas3') barCanvas3;
  @ViewChild('Slides') slides: Slides;
  lineChart: any;
  barChart: any;
  segment = 'sgl';
  segments = 'onemonth';
  eventDate:any;
   debugger;
   timeZone:any;


  public currentUser: any;
  loading: Loading;
  public name: string;
  public userName: string;
  public user_id: number;
  public picture: string;
  upcomingEvents: any;
  overallRanking = { best_avg: '', best_efforts: '', best_total: '', best_wins: '', me_avg: '', me_efforts: '', me_total: '', me_wins: '' };
  overallRankingday = { effort: '', avg: '', wins: '', overall: '' };
  overallRankingday_1month = { effort: '', avg: '', wins: '', overall: '' };
  overallRankingday_3month = { effort: '', avg: '', wins: '', overall: '' };
  overallRankingday_lastyear = { effort: '', avg: '', wins: '', overall: '' };
  my_progresss: any;
  my_progress: any;
  my_progres3: any;
  my_progresCTY: any;
  my_progresLTY: any;
  my_progresLIFE: any;
  noUpcomingEvents: boolean = false;
  noPowerScores: boolean = false;
  myPowerScores = { total: '', efforts: '', avg: '', wins: '' };
  myCategoryRanking = { best_avg: '', best_efforts: '', best_total: '', best_wins: '', me_avg: '', me_efforts: '', me_total: '', me_wins: '' };
  level_id: any = 0;

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  constructor( public navCtrl: NavController, public navParams: NavParams, public events: Events, private mainService: MainService, private loadingCtrl: LoadingController) {
    // this.currentUser = navParams.get('currentUser');
    window.localStorage.setItem("Install", 'appInstall');
    // this.loadCurrenrUser();

    this.currentUser = JSON.parse(window.localStorage.getItem("Currentuser"));

    console.log(this.currentUser);
    
  }

  goToSlide(index) {
    this.slides.slideTo(index);
    console.log(this.slides.slideTo(index));
  }
  addShoots(event) {
       this.navCtrl.push(AddShootsPage, {
      animate: true, direction: 'top'
    });
  }
  onSlideDidChange() {
    let currentIndex = this.slides.getActiveIndex();
    this.level_id = currentIndex;
    this.myProgress();
    console.log('Current index is', currentIndex);
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  ionViewDidLoad() {
    console.log('in dashboard2');
    //  this.daily_sessions_login();

  }
    loadLineChart(xAxisArray, yAxisArray, labelTxt) {
   
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
       // labels: xAxisArray,
        labels: labelTxt,        
        datasets: [
          {
            label: "All",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'centimeter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yAxisArray,
            spanGaps: true,    
            // yAxisID:yAxisArray
          }
        ]
      }
    });
  }


  loadATALineChart(xAxisArray, yAxisArray) {
    this.lineChart = new Chart(this.lineCanvas1.nativeElement, {
      type: 'line',
      data: {
        labels: xAxisArray,
        datasets: [
          {
            label: "ATA",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'centimeter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yAxisArray,
            spanGaps: true,
          }
        ]
      }
    });
  }
  loadPITALineChart(xAxisArray, yAxisArray) {
    // this.barChart = new Chart(this.barCanvas1.nativeElement, {

    //   type: 'bar',
    //   data: {
    //     labels: xAxisArray,
    //     datasets: [{
    //       label: 'PITA',
    //       data: yAxisArray,
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }

    // });
    this.lineChart = new Chart(this.lineCanvas2.nativeElement, {
      type: 'line',
      data: {
        labels: xAxisArray,
        datasets: [
          {
            label: "PITA",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yAxisArray,
            spanGaps: true,
          }
        ]
      }
    });
  }
  loadLGELineChart(xAxisArray, yAxisArray) {
    // this.barChart = new Chart(this.barCanvas2.nativeElement, {

    //   type: 'bar',
    //   data: {
    //     labels: xAxisArray,
    //     datasets: [{
    //       label: 'LEAGUE',
    //       data: yAxisArray,
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }

    // });
    this.lineChart = new Chart(this.lineCanvas3.nativeElement, {
      type: 'line',
      data: {
        labels: xAxisArray,
        datasets: [
          {
            label: "LEAGUE",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yAxisArray,
            spanGaps: true,
          }
        ]
      }
    });
  }
  loadPRACTLineChart(xAxisArray, yAxisArray) {
    // this.barChart = new Chart(this.barCanvas3.nativeElement, {

    //   type: 'bar',
    //   data: {
    //     labels: xAxisArray,
    //     datasets: [{
    //       label: 'PRTC',
    //       data: yAxisArray,
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }

    // });
    this.lineChart = new Chart(this.lineCanvas4.nativeElement, {
      type: 'line',
      data: {
        labels: xAxisArray,
        datasets: [
          {
            label: "PRTC",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yAxisArray,
            spanGaps: true,
          }
        ]
      }
    });
  }
  shootDetails(event, shoot) {
    this.navCtrl.push(MyShootSummeryPage, {
      shoots: shoot,
      shoot: shoot.shoot_id
    });
  }
  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("Currentuser"));
  
    this.getUpcomingShoots();
    this.getMyPowerScores();
    this.category_ranking();
    this.overall_ranking();
    // this.overall_ranking_days_wise();
    this.myProgress();

  }
  getUpcomingShoots() {
    this.showLoading();
    this.mainService.getUpcomingShoots(this.currentUser.user_id).subscribe(success => {
      if (success.status == 1) {
        this.loading.dismiss();
        //console.log(success);

        if (success.data.length == 0) {
          this.noUpcomingEvents = true;
          //alert('hi');
        } else {
          this.noUpcomingEvents = false;
        }
        this.upcomingEvents = success.data;
        this.convertDate();
      }
       else {
        this.loading.dismiss();
        console.log(success);

      }
    },
      error => {
        console.log(error);
        this.loading.dismiss();
      });
  }

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }


  getMyPowerScores() {
    // this.showLoading();
    this.mainService.getMyPowerScores(this.currentUser.user_id).subscribe(success => {
      if (success.status == 1) {
        // this.loading.dismiss();
        console.log(success.data);

        if (success.data.length == 0) {
          this.noPowerScores = false;

        } else {
          this.noPowerScores = true;
        }
        this.myPowerScores = success.data;
      } else {
        // this.loading.dismiss();
        console.log(success);

      }
    },
      error => {
        // this.loading.dismiss();
        console.log(error);
      });
  }
  category_ranking() {
    //this.showLoading();
    this.mainService.category_ranking(this.currentUser.user_id).subscribe(success => {


      if (success.status == 1) {
        //this.loading.dismiss();
        console.log(success.data);

        this.myCategoryRanking = success.data;

      } else {
        //this.loading.dismiss();
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  overall_ranking() {
    //this.showLoading();
    this.mainService.overall_ranking(this.currentUser.user_id).subscribe(success => {

      console.log(success.data);
      if (success.status == 1) {
        //this.loading.dismiss();


        this.overallRanking = success.data;

      } else {
        //this.loading.dismiss();
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  overall_ranking_days_wise() {
    //this.showLoading();
    this.mainService.overall_ranking_days_wise(this.currentUser.user_id).subscribe(success => {


      if (success.status == 1) {
        //this.loading.dismiss();
        //console.log(success);

        this.overallRankingday = success.data.twoweeks[0];
        this.overallRankingday_1month = success.data.onemonth[0];
        this.overallRankingday_3month = success.data.threemonth[0];
        this.overallRankingday_lastyear = success.data.lastyear[0];

      } else {
        //this.loading.dismiss();
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  myProgress() {
    this.mainService.my_progress(this.currentUser.user_id, this.level_id).subscribe(success => {
      if (success.status == 1) {
        this.my_progress = success.data;
        this.my_progresss = success.data.onemonth.single;
        this.onSegmentClick();
        console.log(this.my_progresss);
      } else {
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  onSegmentClick() {
    let x = [], y = [], lbltxt=[];
    
    switch (this.segment) {
      case 'sgl':
     
        switch (this.segments) {
          case 'onemonth':
            for (let i = 0; i < this.my_progress.onemonth.single.length; i++) 
            {
              let yr=this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[0];
               x.push(this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
             
              y.push(this.my_progress.onemonth.single[i].score);
              lbltxt.push(this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
               // alert(JSON.stringify(this.my_progress.onemonth.single));
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y, lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }  
           break;
        
          case 'threemonth':
          
            for (let i = 0; i < this.my_progress.threemonth.single.length; i++) 
            {
              let yr=this.my_progress.threemonth.single[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.threemonth.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
              // x.push(this.my_progress.threemonth.single[i].shoot_name);
              y.push(this.my_progress.threemonth.single[i].score);
              lbltxt.push(this.my_progress.threemonth.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
            }

            if (this.level_id == 0) {
              this.loadLineChart(x, y, lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
           
          case 'CTY':
          //debugger;
            for (let i = 0; i < this.my_progress.CTY.single.length; i++) {
              //x.push(this.my_progress.CTY.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.single[i].date.split("T")[0].split("-")[2]);
              // x.push(this.my_progress.CTY.single[i].shoot_name);
             // console.log(this.my_progress.CTY.single[i].date.split("T")[0].split("-")[0]);

             let yr=this.my_progress.CTY.single[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.CTY.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
              y.push(this.my_progress.CTY.single[i].score);
              
              
              lbltxt.push(this.my_progress.CTY.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
              
              console.log('year'+lbltxt);
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'LTY':
          //debugger;
            for (let i = 0; i < this.my_progress.LTY.single.length; i++) 
            {
              let yr=this.my_progress.LTY.single[i].date.split("T")[0];
              x.push(this.my_progress.LTY.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
              // x.push(this.my_progress.LTY.single[i].shoot_name);
              y.push(this.my_progress.LTY.single[i].score);
              lbltxt.push(this.my_progress.LTY.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }    
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'LIFE':
            for (let i = 0; i < this.my_progress.LIFE.single.length; i++) 
            {

            //   let yr=this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[0];
            //   x.push(this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
            
            //  y.push(this.my_progress.onemonth.single[i].score);
            //  lbltxt.push(this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));



              let yr=this.my_progress.LIFE.single[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.LIFE.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
              //  x.push(this.my_progress.LIFE.single[i].shoot_name);
              y.push(this.my_progress.LIFE.single[i].score);
              lbltxt.push(this.my_progress.LIFE.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
        }
        break;
      case 'hdcp':
        switch (this.segments) {
          case 'onemonth':
            for (let i = 0; i < this.my_progress.onemonth.handicap.length; i++) 
            {
              let yr=this.my_progress.onemonth.handicap[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.onemonth.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
              // x.push(this.my_progress.onemonth.handicap[i].shoot_name);
              y.push(this.my_progress.onemonth.handicap[i].score);
              lbltxt.push(this.my_progress.onemonth.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));

        
          //   let yr=this.my_progress.onemonth.handicap[i].date.split("T")[0].split("-")[0];
          //   x.push(this.my_progress.onemonth.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
          
          //  y.push(this.my_progress.onemonth.single[i].score);
          //  lbltxt.push(this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.single[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));

            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'threemonth':
            for (let i = 0; i < this.my_progress.threemonth.handicap.length; i++) {
            //   x.push(this.my_progress.threemonth.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.handicap[i].date.split("T")[0].split("-")[2]);
            //   y.push(this.my_progress.threemonth.handicap[i].score);
            //  // lbltxt=this.my_progress.CTY.single[i].date.split("T")[0].split("-")[0];

            let yr=this.my_progress.threemonth.handicap[i].date.split("T")[0].split("-")[0];
            x.push(this.my_progress.threemonth.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
          
           y.push(this.my_progress.threemonth.handicap[i].score);
           lbltxt.push(this.my_progress.threemonth.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));

            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'CTY':
            for (let i = 0; i < this.my_progress.CTY.handicap.length; i++) {
              // x.push(this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.CTY.handicap[i].score);
              // lbltxt=this.my_progress.CTY.single[i].date.split("T")[0].split("-")[0];

              // x.push(this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.CTY.handicap[i].score);

              let yr=this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
            
             y.push(this.my_progress.CTY.handicap[i].score);
             lbltxt.push(this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
  
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'LTY':
            for (let i = 0; i < this.my_progress.LTY.handicap.length; i++) {
              // x.push(this.my_progress.LTY.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.handicap[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.LTY.handicap[i].score);
              //lbltxt=this.my_progress.CTY.single[i].date.split("T")[0].split("-")[0];

              let yr=this.my_progress.LTY.handicap[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.LTY.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
            
             y.push(this.my_progress.threemonth.handicap[i].score);
             lbltxt.push(this.my_progress.LTY.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
  
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'LIFE':
            for (let i = 0; i < this.my_progress.LIFE.handicap.length; i++) {
              // x.push(this.my_progress.LIFE.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.handicap[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.LIFE.handicap[i].score);
             // lbltxt=this.my_progress.CTY.single[i].date.split("T")[0].split("-")[0];

             let yr=this.my_progress.LIFE.handicap[i].date.split("T")[0].split("-")[0];
             x.push(this.my_progress.LIFE.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
           
            y.push(this.my_progress.LIFE.handicap[i].score);
            lbltxt.push(this.my_progress.LIFE.handicap[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.handicap[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
 
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
        }
        break;
      case 'dbl':
        switch (this.segments) {
          // case 'onemonth':
          //   for (let i = 0; i < this.my_progress.onemonth.dbl.length; i++) {
              // x.push(this.my_progress.onemonth.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.dbl[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.onemonth.dbl[i].score);

              case 'onemonth':
              for (let i = 0; i < this.my_progress.onemonth.dbl.length; i++) 
              {
                debugger;
                console.log('chart1');
                let yr=this.my_progress.onemonth.dbl[i].date.split("T")[0].split("-")[0];
                 x.push(this.my_progress.onemonth.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
               
                y.push(this.my_progress.onemonth.dbl[i].score);
                lbltxt.push(this.my_progress.onemonth.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.onemonth.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
                console.log('chart2');
              
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'threemonth':
            for (let i = 0; i < this.my_progress.threemonth.dbl.length; i++) {
              // x.push(this.my_progress.threemonth.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.dbl[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.threemonth.dbl[i].score);

              let yr=this.my_progress.threemonth.dbl[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.threemonth.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
          
              y.push(this.my_progress.threemonth.dbl[i].score);
              lbltxt.push(this.my_progress.threemonth.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.threemonth.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));

              
            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'CTY':
            for (let i = 0; i < this.my_progress.CTY.dbl.length; i++) {
              // x.push(this.my_progress.CTY.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.dbl[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.CTY.dbl[i].score);

              let yr=this.my_progress.CTY.dbl[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.CTY.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
            
             y.push(this.my_progress.CTY.dbl[i].score);
             lbltxt.push(this.my_progress.CTY.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.CTY.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));

            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'LTY':
            for (let i = 0; i < this.my_progress.LTY.dbl.length; i++) {
              // x.push(this.my_progress.LTY.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.dbl[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.LTY.dbl[i].score);

              let yr=this.my_progress.LTY.dbl[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.LTY.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
          
              y.push(this.my_progress.LTY.dbl[i].score);
              lbltxt.push(this.my_progress.LTY.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LTY.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));

            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
          case 'LIFE':
            for (let i = 0; i < this.my_progress.LIFE.dbl.length; i++) {
              // x.push(this.my_progress.LIFE.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.dbl[i].date.split("T")[0].split("-")[2]);
              // y.push(this.my_progress.LIFE.dbl[i].score);

              let yr=this.my_progress.LIFE.dbl[i].date.split("T")[0].split("-")[0];
              x.push(this.my_progress.LIFE.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));
          
              y.push(this.my_progress.LIFE.dbl[i].score);
              lbltxt.push(this.my_progress.LIFE.dbl[i].date.split("T")[0].split("-")[1] + "/" + this.my_progress.LIFE.dbl[i].date.split("T")[0].split("-")[2]+"/"+yr.slice(-2));

            }
            if (this.level_id == 0) {
              this.loadLineChart(x, y,lbltxt);
            }
            if (this.level_id == 1) {
              this.loadATALineChart(x, y);
            }
            if (this.level_id == 2) {
              this.loadPITALineChart(x, y);
            }
            if (this.level_id == 3) {
              this.loadLGELineChart(x, y);
            }
            if (this.level_id == 4) {
              this.loadPRACTLineChart(x, y);
            }
            break;
        }
        break;
    }
  }
}
