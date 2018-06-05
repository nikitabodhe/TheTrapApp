import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MainService } from '../../providers/main-service';
//import { DashboardPage } from '../dashboard/dashboard';

import { MyShootSummeryPage } from '../my-shoot-summery/my-shoot-summery';
/*
  Generated class for the AddEventOnShoot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-event-on-shoot',
  templateUrl: 'add-event-on-shoot.html'
})
export class AddEventOnShootPage {
  loading: Loading;
  timeZone:any;
  createSuccess: false;
  ranges: any = [];
  range: any = 0;
  roundLength: any = 25;
  round: boolean = false;
  traps: number = 0;
  tempTraps: number = 0;
  range1: number;
  range2: number;
  range3: number;
  range4: number;
  range5: number;
  range6: number;
  range7: number;
  range8: number;
  range9: number;
  range10: number;
  range11: number;
  range12: number;
  total: number;
  trapNumber: number = 1;
  maxTrapNumber: number = 12;
  roundLength1: number = 25;
  roundLength2: number = 25;
  roundLength3: number = 25;
  roundLength4: number = 25;
  roundLength5: number = 25;
  roundLength6: number = 25;
  roundLength7: number = 25;
  roundLength8: number = 25;
  roundLength9: number = 25;
  roundLength10: number = 25;
  roundLength11: number = 25;
  roundLength12: number = 25;
  round1: boolean;
  round2: boolean;
  round3: boolean;
  round4: boolean;
  round5: boolean;
  round6: boolean;
  round7: boolean;
  round8: boolean;
  round9: boolean;
  round10: boolean;
  round11: boolean;
  round12: boolean;
  timeStarts: String = new Date().toISOString();
  timeEnds: String = new Date().toISOString();
  shootdetails: any;
  currentUser: any;
  level: String;
  allClass: any;
  allCategory: any;
  alllevels: any;
  allPlaces: any;
  allTypes: any;
  userSettings: any;
  allEarnedYardage: any;
  EarnedYardage: any;
  earnedYardage: any;
  yardage: any;
  userYardageId:any;
  addShootDetails = { shoot_id: '', shoot_name: '', club_id: '', event_name: '', event_no: '', yardage_id: '', earned_yardage_id: '',earned_yardage_value:'', category_id: '', level_id: '', event_start_date: '', event_end_date: '', place_id: '', class_id: '', traps: [{}], note: '', event_id: '', type_id: '', show: true, timeZone: '' }
 //event_no: '',traps: [{}], note: '', event_id: '', type_id: '',
 // addTimeZone =  this.timeZone;

  startDateSelected: boolean;

  minEndDate: any;
  event:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private mainService: MainService, private toastCtrl: ToastController) {
    // this.tempTraps = 0;
    this.range1 = 25;
    this.range2 = 25;
    this.range3 = 25;
    this.range4 = 25;
    this.range5 = 25;
    this.range6 = 25;
    this.range7 = 25;
    this.range8 = 25;
    this.range9 = 25;
    this.range10 = 25;
    this.range11 = 25;
    this.range12 = 25;
    this.timeStarts = '05/01/17';
    this.timeEnds = '05/02/17';
    this.shootdetails = navParams.get('shoot');
    this.event=navParams.get('event');

    if(this.event){
    this.shootdetails.events=navParams.get('event');
    }
    this.loadCurrenrUser();
    this.level = this.shootdetails.levelname;
    this.addShootDetails.shoot_id = this.shootdetails.shoot_id;
    this.addShootDetails.shoot_name = this.shootdetails.shoot_name;
    this.addShootDetails.level_id = this.shootdetails.level_id;
    this.addShootDetails.event_start_date = this.shootdetails.shoot_date;
    this.addShootDetails.event_no = '5';
    //console.log(this.shootdetails.events.length + 1);
    console.log(this.shootdetails);
    // this.maxTrapNumber = 4;
    // this.trapNumber = 4;
  
 this.addShootDetails.event_end_date = this.shootdetails.shoot_end_date;
  }
  ionViewDidLoad() {
      // this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = 25;
      this.get_user_settings();
      this.getClass();
      this.getPlace();
      this.getEarnedYardage();
      this.EarnedYardages();
      this.getCategory();
      this.getTypes();
      this.setMaxTrapNumber();
  }
  setStartDate() {
    if (this.addShootDetails.event_start_date.split('T')[0] > this.shootdetails.shoot_end_date.split('T')[0]) {
      this.addShootDetails.event_start_date = this.shootdetails.shoot_date;
      this.errorMsg('Please select the Event date in between shoot start ' +this.shootdetails.shoot_date.split('T')[0]+ ' & end date '+this.shootdetails.shoot_end_date.split('T')[0] )
    }
    if (this.addShootDetails.event_start_date.split('T')[0] < this.shootdetails.shoot_date.split('T')[0]) {
      this.addShootDetails.event_start_date = this.shootdetails.shoot_date;
     this.errorMsg('Please select the Event date in between shoot start ' +this.shootdetails.shoot_date.split('T')[0]+ ' & end date '+this.shootdetails.shoot_end_date.split('T')[0])

    }
  }
  setEndDate() {
    if (this.addShootDetails.event_start_date) {
      if (this.addShootDetails.event_end_date.split('T') > this.shootdetails.shoot_end_date.split('T')) {

        this.addShootDetails.event_end_date = this.shootdetails.shoot_end_date;
        this.errorMsg('Please ensure that Event end date is betdeleteTrapsween shoot start & end date.')

      }

      if (this.addShootDetails.event_end_date.split('T') < this.addShootDetails.event_start_date.split('T')) {
        this.addShootDetails.event_end_date = this.shootdetails.shoot_end_date;
        this.errorMsg('Please ensure that Event end date is after event start date.')
      }
    }
    else {

      this.errorMsg('Please Select Event Start Date.')
      this.addShootDetails.event_end_date = '';
    }
    

    console.log(this.minEndDate);
  }
  setClass(classId) {
    if (classId == '0' || classId == undefined || classId == null) {
      this.addShootDetails.category_id = '0';
    }
  }
  setCategory(catId) {
    if (catId == '0' || catId == undefined || catId == null) {
      this.addShootDetails.class_id = '0';
    }
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
  setMaxTrapNumber() {
    if (this.userSettings != undefined) {
      // if(this.shootdetails.level_id == '1' && this.addShootDetails.type_id == '1'){
      //     this.addShootDetails.class_id = this.userSettings.ata_single;
      //     this.addShootDetails.category_id = this.userSettings.ata_category;
      // }
      // if(this.shootdetails.level_id == '1' && this.addShootDetails.type_id == '2'){
      //    this.addShootDetails.class_id = this.userSettings.ata_double;
      //    this.addShootDetails.category_id = this.userSettings.ata_category;
      // }
      if (this.shootdetails.level_id == '1' && this.addShootDetails.type_id == '3') {
        //  this.addShootDetails.class_id = this.userSettings.ata_handicap;
        //  this.addShootDetails.category_id = this.userSettings.ata_category;
        //this.addShootDetails.yardage_id = this.userSettings.ata_handicap;
        this.userYardageId=this.userSettings.ata_handicap;
      }
      // if(this.shootdetails.level_id == '2' && this.addShootDetails.type_id == '1'){
      //    this.addShootDetails.class_id = this.userSettings.pita_single;
      //    this.addShootDetails.category_id = this.userSettings.pita_category;

      // }
      // if(this.shootdetails.level_id == '2' && this.addShootDetails.type_id == '2'){
      //    this.addShootDetails.class_id = this.userSettings.pita_double;
      //    this.addShootDetails.category_id = this.userSettings.pita_category;
      // }

      if (this.shootdetails.level_id == '2' && this.addShootDetails.type_id == '3') {
        //  this.addShootDetails.class_id = this.userSettings.pita_handicap;
        //  this.addShootDetails.category_id = this.userSettings.pita_category;
        //this.addShootDetails.yardage_id = this.userSettings.pita_handicap;
        this.userYardageId=this.userSettings.pita_handicap;
      }
    }
    if ((this.shootdetails.level_id == '1' || this.shootdetails.level_id == '2') && (this.addShootDetails.type_id == '1' || this.addShootDetails.type_id == '3')) {
      //console.log('25');
      // this.maxTrapNumber = 4;
      this.ranges = [];
     this.ranges.push({range: 25,roundLength: 25});
      this.ranges.push({range: 25,roundLength: 25});
      this.ranges.push({range: 25,roundLength: 25});
      this.ranges.push({range: 25,roundLength: 25});
    }
    if ((this.shootdetails.level_id == '1' && this.addShootDetails.type_id == '') || (this.shootdetails.level_id == '2' && this.addShootDetails.type_id == '')) {
      //console.log('25');
      // this.maxTrapNumber = 4;
      this.ranges = [];
     this.ranges.push({range: 25,roundLength: 25});
      this.ranges.push({range: 25,roundLength: 25});
      this.ranges.push({range: 25,roundLength: 25});
      this.ranges.push({range: 25,roundLength: 25});
     }
    if ((this.shootdetails.level_id == '1' && this.addShootDetails.type_id == '2') || (this.shootdetails.level_id == '2' && this.addShootDetails.type_id == '2')) {
      //console.log('50');
      // this.maxTrapNumber = 2;
      this.ranges = [];
     this.ranges.push({range: 50,roundLength: 50});
      this.ranges.push({range: 50,roundLength: 50});
      }
    if ((this.shootdetails.level_id == '3' && this.addShootDetails.type_id == '2') || (this.shootdetails.level_id == '4' && this.addShootDetails.type_id == '2')) {
      this.ranges = [];
      this.ranges.push({
        range: 50,
        roundLength: 50
      });
    }
    if ((this.shootdetails.level_id == '3' && this.addShootDetails.type_id == '1') || (this.shootdetails.level_id == '4' && this.addShootDetails.type_id == '1')) {
      this.ranges = [];
      this.ranges.push({
        range: 25,
        roundLength: 25
      });
    }
    if ((this.shootdetails.level_id == '3' && this.addShootDetails.type_id == '3') || (this.shootdetails.level_id == '4' && this.addShootDetails.type_id == '3')) {
      //console.log('50');
      // this.maxTrapNumber = 1;
      this.ranges = [];
      this.ranges.push({
        range: 25,
        roundLength: 25
      });
    }
    if ((this.shootdetails.level_id == '3' && (this.addShootDetails.type_id == '' || this.addShootDetails.type_id == undefined)) || (this.shootdetails.level_id == '4' && (this.addShootDetails.type_id == ''||this.addShootDetails.type_id == undefined))) {
      this.ranges = [];
      this.ranges.push({
        range: 25,
        roundLength: 25
      });
    }
    this.setTrap();
  }
  AddEarnedYardage(EarnedYardages) {

    for(let i=0;i<EarnedYardages.length;i++){
      if(this.addShootDetails.earned_yardage_id==EarnedYardages[i].earned_yardage_id){
        this.addShootDetails.earned_yardage_value=EarnedYardages[i].earned_yardage_value;
      }
    }
    if(this.userYardageId){
      if( this.addShootDetails.earned_yardage_id >'0'){
        return this.errorMsg("Congratulations on your punch!  We have updated your yardage in the Settings.");
    }
    }else{
      this.errorMsg("Congratulations on your punch!  Please update your yardage in the Settings so we can automatically update any future earned yardage changes.");
    }
  
  }
  ngOnInit() {
    //this.getLevels();
    // this.get_user_settings();
    // this.getClass();
    // this.getPlace();
    // this.getEarnedYardage();
    // this.getCategory();
    // this.getTypes();
  }
  changeClass() {
    if(this.addShootDetails.show==true){
      this.addShootDetails.category_id='';
    }else{
      this.addShootDetails.class_id='';
    }
  }
  changeCategory() {
    if(this.addShootDetails.show==true){
      this.addShootDetails.yardage_id='';
    }else{
      this.addShootDetails.category_id='';
    }
  }
  setEvent(eventId) {
    if (this.shootdetails.events.length > 0) {
      for (let i = 0; i < this.shootdetails.events.length; i++) {
        if (this.shootdetails.events[i].event_no == eventId) {
          this.addShootDetails.event_id = '0';
          return this.errorMsg('This Event Number has been selected for this shoot');
        }
      }

    }
  }
  setTrap() {

    let temp = 0;
    for (let i = 0; i < this.ranges.length; i++) {
      temp = temp + parseInt(this.ranges[i].range);
    }
    this.tempTraps = temp;
  }
  addTraps() {
    debugger;
    this.ranges.push({ range: 25, roundLength: 25 });
    this.setTrap();
    //let last_element = this.ranges[this.ranges.length-1];
    //this.ranges.splice(this.ranges.indexOf(this.ranges.length-1), 1);
  }

  
  addDTrap() {
    debugger;
  
    // let last_element = this.ranges[this.ranges.length-1];
    // this.ranges.splice(this.ranges.indexOf(this.ranges.length-1), 1);
    this.ranges.push({ range: 50, roundLength: 50 });
    this.setTrap();
   
  }
  deleteTraps(tempRange) {
    
    this.ranges.splice(this.ranges.indexOf(tempRange), 1);
    this.setTrap();
  }
  changeRound(tempRange) {
    tempRange.round = !tempRange.round;
    tempRange.range = 0;
    
  }
  getTypes() {
    this.mainService.getTypes().subscribe(success => {


      if (success.status == 1) {
        //console.log(success);

        this.allTypes = success.data;



      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  getLevels() {
    this.mainService.getLevels(this.timeZone).subscribe(success => {


      if (success.status == 1) {
        //console.log(success);

        this.alllevels = success.data;



      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  getClass() {
    this.mainService.getClass().subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.allClass = success.data;

      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  getCategory() {
    this.mainService.getCategory().subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.allCategory = success.data;

      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  getPlace() {
    this.mainService.getPlace().subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.allPlaces = success.data;
        //console.log(this.allPlace); 

      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  getEarnedYardage() {
    this.mainService.getEarnedYardage().subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.allEarnedYardage = success.data;

      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  showPopup(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              //this.navCtrl.popToRoot();
              //this.navCtrl.setRoot(DashboardPage);
            }
          }
        }
      ]
    });
    alert.present();
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  errorMsg(val) {
    let alert = this.alertCtrl.create({
      subTitle: val,
      buttons: [
        {
          text: 'OK',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }
  confirmShoot() {
    let alert = this.alertCtrl.create({
      subTitle: 'Would you like to add this event?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.addShoots();
          }
        }

      ]
    });
    alert.present();
  }
  confirm() {
    this.convertDate();
    if (this.addShootDetails.level_id != '4' && this.addShootDetails.level_id != '3') {
      if (this.addShootDetails.type_id == '1' || this.addShootDetails.type_id == '2') {

        if (this.addShootDetails.category_id != '0' && this.addShootDetails.category_id != undefined && this.addShootDetails.category_id != '') {
          if (this.addShootDetails.place_id == '' || this.addShootDetails.place_id == '0' || this.addShootDetails.place_id == undefined) {
            //alert('select place')
            //return this.errorMsg('Please correct your trophy Place');
            this.confirmShoot();
          } else {
            this.confirmShoot();
          }
        } else if (this.addShootDetails.class_id != '0' && this.addShootDetails.class_id != undefined && this.addShootDetails.class_id != '') {
          if (this.addShootDetails.place_id == '' || this.addShootDetails.place_id == '0' || this.addShootDetails.place_id == undefined) {
            // alert('select place')
            return this.errorMsg('Please correct your trophy Place');
          } else {
            this.confirmShoot();
          }
        } else if (this.addShootDetails.place_id == '' || this.addShootDetails.place_id == '0' || this.addShootDetails.place_id == undefined) {
          this.confirmShoot();
        } else {
          //alert('select cat or class');
          if (this.addShootDetails.show == true) {
            return this.errorMsg('Please correct your trophy class');
          } else {
            return this.errorMsg('Please correct your trophy category');
          }

        }
      }
      if (this.addShootDetails.type_id == '3') {
        if (this.addShootDetails.category_id != '0' && this.addShootDetails.category_id != undefined && this.addShootDetails.category_id != '') {
          if (this.addShootDetails.place_id == '' || this.addShootDetails.place_id == '0' || this.addShootDetails.place_id == undefined) {
            //alert('select place')
            return this.errorMsg('Please correct your trophy Place');
          } else {
            this.confirmShoot();
          }
        } else if (this.addShootDetails.yardage_id != '0' && this.addShootDetails.yardage_id != undefined && this.addShootDetails.yardage_id != '') {
          if (this.addShootDetails.place_id == '' || this.addShootDetails.place_id == '0' || this.addShootDetails.place_id == undefined) {
            // alert('select place')
            return this.errorMsg('Please correct your trophy Place');
          } else {
            this.confirmShoot();
          }
        } else if (this.addShootDetails.place_id == '' || this.addShootDetails.place_id == '0' || this.addShootDetails.place_id == undefined) {
          this.confirmShoot();
        } else {
          //alert('select cat or earned');
          if (this.addShootDetails.show == true) {
            return this.errorMsg('Please correct your trophy category');
          } else {
            return this.errorMsg('Please correct your trophy earned yardage');
          }

        }
      }
    }
    else {
      this.confirmShoot();
    }

  }

  convertDate(){
    debugger;
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  addShoots() {
    this.addShootDetails.traps = [];
    for (let i = 0; i < this.ranges.length; i++) {
      this.addShootDetails.traps.push({ "max": this.ranges[i].roundLength, "min": this.ranges[i].range });
    }
    if(this.addShootDetails.type_id=='3'){
        if(this.addShootDetails.show==true){
      this.addShootDetails.yardage_id='';
    }
     if(this.addShootDetails.show==false){
      this.addShootDetails.category_id='';
    }
    }else{
      if(this.addShootDetails.show==true){
      this.addShootDetails.category_id='';
    }
     if(this.addShootDetails.show==false){
      this.addShootDetails.class_id='';
    }
    }
    console.log( 'shootDetails',this.addShootDetails, this.timeZone);
    this.showLoading();
    debugger;
    this.mainService.addShoot(this.currentUser, this.addShootDetails, this.addShootDetails,this.timeZone).subscribe(success => {
      console.log('mainService.addShootaddTimeZone',this.timeZone);
      if (success.status == 1) {

      if ((this.addShootDetails.level_id == '1' ||this.addShootDetails.level_id == '2') && (this.addShootDetails.type_id == '3' && this.addShootDetails.earned_yardage_id!='')) {
      this.changeUserYardage(this.addShootDetails);
      }
        this.loading.dismiss();
        console.log(success);
        this.presentToast('Added Successfully');
         this.navCtrl.setRoot(MyShootSummeryPage, {
          shoot: success.shoot_id
        })
        //this.navCtrl.setRoot(MyshootsScoresPage);
      } else {
        this.loading.dismiss();
        this.showPopup(success.statusinfo);
        console.log(success);
      }
    },
      error => {
        this.loading.dismiss();
        console.log(error);
      });
  }
  changeUserYardage(userdata){
    this.mainService.change_yardage(this.currentUser,userdata).subscribe(success => {
      if (success.status == 1) {
        console.log(success);
      } else {
        console.log(success);
      }
    },
      error => {
        this.loading.dismiss();
        console.log(error);
      });
  }
  EarnedYardages() {
    this.mainService.EarnedYardage().subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.EarnedYardage = success.data;
      } else {
        //console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  get_user_settings() {
    this.mainService.get_user_settings(this.currentUser.user_id, this.timeZone).subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.userSettings = success.data[0];
        console.log(this.userSettings);
        if (this.userSettings != undefined) {
          /*if( this.shootdetails.levelname == 'ATA' && this.eventDetails.type == 'Single' ){
              this.addShootDetails.class_id = this.userSettings.ata_single;
              this.addShootDetails.category_id = this.userSettings.ata_category;   
          }
          if( this.shootdetails.levelname == 'ATA' && this.eventDetails.type == 'Double' ){
              this.addShootDetails.class_id = this.userSettings.ata_double;
              this.addShootDetails.category_id = this.userSettings.ata_category;
          }
          if( this.shootdetails.levelname == 'ATA' && this.eventDetails.type == 'Handicap' ){
              this.addShootDetails.class_id = this.userSettings.ata_handicap;
              this.addShootDetails.category_id = this.userSettings.ata_category;
          }
          if( this.shootdetails.levelname == 'PITA' && this.eventDetails.type == 'Single' ){
              this.addShootDetails.class_id = this.userSettings.pita_single;
              this.addShootDetails.category_id = this.userSettings.pita_category;   
          }
          if( this.shootdetails.levelname == 'PITA' && this.eventDetails.type == 'Double' ){
              this.addShootDetails.class_id = this.userSettings.pita_double;
              this.addShootDetails.category_id = this.userSettings.pita_category;
          }
          if( this.shootdetails.levelname == 'PITA' && this.eventDetails.type == 'Handicap' ){
              this.addShootDetails.class_id = this.userSettings.pita_handicap;
              this.addShootDetails.category_id = this.userSettings.pita_category;
          }*/
        }
      } else {
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }

  resetTrap(tempRange) {
    debugger;
    tempRange.range = 0;
   }
}
