import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MainService } from '../../providers/main-service';
import { MyShootSummeryPage } from '../my-shoot-summery/my-shoot-summery';
import { MyNotesPage } from '../my-notes/my-notes';

/*
  Generated class for the EventEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html'
})
export class EventEditPage {
  //eventDetails : any;
  loading: Loading;
  createSuccess: false;
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
  eventDetails: any;
  currentUser: any;
  level: String;
  allClass: any;
  allCategory: any;
  alllevels: any;
  allPlaces: any;
  allEarnedYardage: any;
  EarnedYardage: any;
  earnedYardage: any;
  yardage: any;
  allTypes: any;
  userYardageId:any;
  timeZone:any;
  addShootDetails = { shoot_id: '', shoot_name: '', club_id: '', event_no: '', event_name: '', yardage_id: '', earned_yardage_id: '', category_id: '', level_id: '', event_start_date: '', event_end_date: '', place_id: '', class_id: '', traps: [{}], note: '', event_id: '', show: true }

  trap1: boolean = true;
  trap2: boolean;
  trap3: boolean;
  trap4: boolean;
  trap5: boolean;
  trap6: boolean;
  trap7: boolean;
  trap8: boolean;
  trap9: boolean;
  trap10: boolean;
  trap11: boolean;
  trap12: boolean;
  notes: any;
  ranges: any = [];
  range: any = 0;
  roundLength: any = 25;
  round: boolean = false;
  traps: number = 0;
  tempTraps: number = 0;
  userSettings: any;
  shootDetails: any;
  mainshoot:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private mainService: MainService, private toastCtrl: ToastController) {
    this.eventDetails = navParams.get('event');
    this.shootDetails = navParams.get('evendetail');
    this.mainshoot=navParams.get('mainshoot');
     console.log(this.shootDetails);
      console.log(this.eventDetails);
    this.notes = navParams.get('notes');

    for (let i = 0; i < this.eventDetails.traps.length; i++) {
      this.ranges.push({
        range: this.eventDetails.traps[i].score,
        roundLength: this.eventDetails.traps[i].maxscore
      });
    }
    this.setTrap();
    // console.log(this.eventDetails);
   
    if (this.eventDetails.type_id != 3) {
      if (this.eventDetails.category_id != null && this.eventDetails.category_id != 0) {
        this.addShootDetails.show = false;
      }
    } else {
      if (this.eventDetails.yardage_id != null && this.eventDetails.yardage_id != 0) {
        this.addShootDetails.show = false;
      }
    }

    this.timeStarts = '05/01/17';
    this.timeEnds = '05/02/17';
    //this.shootdetails = navParams.get('shoot');
    //  this.eventDetails = navParams.get('event');
    this.loadCurrenrUser();
    //this.level = this.shootdetails.levelname;
    //this.addShootDetails.shoot_id = this.shootdetails.shoot_id;
    //this.addShootDetails.shoot_name = this.shootdetails.shoot_name;
    this.addShootDetails.event_name = this.eventDetails.event_name;
    this.addShootDetails.event_id = this.eventDetails.shoot_event_id;
    //this.addShootDetails.level_id = this.shootdetails.level_id;
    //console.log(this.shootdetails);.typename
    //console.log(this.eventDetails);
    if ((this.eventDetails.levelname == 'ATA' || this.eventDetails.levelname == 'PITA') && (this.eventDetails.typename == 'Singles' || this.eventDetails.typename == 'Handicap')) {
      //console.log('25');
      // this.maxTrapNumber = 4;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
    }
    if ((this.eventDetails.levelname == 'ATA' && this.eventDetails.typename == '') || (this.eventDetails.levelname == 'PITA' && this.eventDetails.typename == '')) {
      //console.log('25');
      // this.maxTrapNumber = 4;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
    }
    if ((this.eventDetails.levelname == 'ATA' && this.eventDetails.typename == 'Doubles') || (this.eventDetails.levelname == 'PITA' && this.eventDetails.typename == 'Doubles')) {
      //console.log('50');
      // this.maxTrapNumber = 2;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 50;
    }
    if ((this.eventDetails.levelname == 'LEAGUE' && this.eventDetails.typename == 'Doubles') || (this.eventDetails.levelname == 'PRACTICE' && this.eventDetails.typename == 'Doubles')) {
      //console.log('50');
      // this.maxTrapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 50;
    }
    if ((this.eventDetails.levelname == 'LEAGUE' && this.eventDetails.typename == 'Singles') || (this.eventDetails.levelname == 'PRACTICE' && this.eventDetails.typename == 'Singles')) {
      //console.log('50');
      // this.maxTrapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
    }
    if ((this.eventDetails.levelname == 'LEAGUE' && this.eventDetails.typename == 'Handicap') || (this.eventDetails.levelname == 'PRACTICE' && this.eventDetails.typename == 'Handicap')) {
      //console.log('50');
      // this.maxTrapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
    }
  }


  ionViewDidLoad() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(this.eventDetails);
    console.log('ionViewDidLoad EventEditPage');
    this.getClass();
    this.getCategory();
    this.getTypes();
    this.getPlace();
    this.getEarnedYardage();
    this.EarnedYardages();
    this.get_user_settings();
  }
  loadCurrenrUser() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  }
  changeClass() {
    if(this.addShootDetails.show==true){
      this.eventDetails.category_id='';
    }else{
      this.eventDetails.class_id='';
    }
  }
  changeCategory() {
    if(this.addShootDetails.show==true){
      this.eventDetails.yardage_id='';
    }else{
      this.eventDetails.category_id='';
    }
  }
  get_user_settings() {
    debugger;
    this.convertDate();
    this.mainService.get_user_settings(this.currentUser.user_id, this.timeZone).subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.userSettings = success.data[0];

        if (this.userSettings != undefined) {
          if (this.eventDetails.level_id == '1' && this.eventDetails.type_id == '3') {
            this.userYardageId = this.userSettings.ata_handicap;
          }
          if (this.eventDetails.level_id == '2' && this.eventDetails.type_id == '3') {
            this.userYardageId = this.userSettings.pita_handicap;
          }
        }
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
   setStartDate() {
    if (this.eventDetails.start_date.split('T')[0] > this.eventDetails.shoot_end_date.split('T')[0]) {
      this.eventDetails.start_date = this.eventDetails.shoot_date;
     // this.errorMsg('Please ensure that Event start date is between shoot start & end date.')
       this.errorMsg('Please select the Event date in between shoot start ' +this.eventDetails.shoot_date.split('T')[0]+ ' & end date '+this.eventDetails.shoot_end_date.split('T')[0])
    }
    if (this.eventDetails.start_date.split('T')[0] < this.eventDetails.shoot_date.split('T')[0]) {
      this.eventDetails.event_start_date = this.eventDetails.shoot_date;
      //this.errorMsg('Please ensure that Event start date is between shoot start & end date.')
      this.errorMsg('Please select the Event date in between shoot start ' +this.eventDetails.shoot_date.split('T')[0]+ ' & end date '+this.eventDetails.shoot_end_date.split('T')[0])
    }
  }
  setEndDate() {
    if (this.eventDetails.start_date) {
      if (this.eventDetails.end_date.split('T')[0] > this.eventDetails.shoot_end_date.split('T')[0]) {
        this.eventDetails.end_date = this.eventDetails.shoot_end_date;
        //this.errorMsg('Please ensure that Event end date is between shoot start & end date.')
         this.errorMsg('Please select the Event end date in between shoot start ' +this.eventDetails.shoot_date.split('T')[0]+ ' & end date '+this.eventDetails.shoot_end_date.split('T')[0])
      }
      if (this.eventDetails.end_date.split('T')[0] < this.eventDetails.shoot_date.split('T')[0]) {
        this.eventDetails.end_date = this.eventDetails.shoot_end_date;
        this.errorMsg('Please select the Event date in between shoot start ' +this.eventDetails.shoot_date.split('T')[0]+ ' & end date '+this.eventDetails.shoot_end_date.split('T')[0])
      }
    }
    else {
      this.errorMsg('Please Select Event Start Date.')
      this.eventDetails.end_date = '';
    }
    // console.log(this.addShootDetails.event_start_date);
    // this.startDateSelected = true;
    // this.minEndDate = this.addShootDetails.event_start_date.split('T');
    // this.minEndDate = this.minEndDate[0];
    // this.addShootDetails.event_end_date = this.addShootDetails.event_start_date;
  }

  setEvent(eventId) {
    if (this.mainshoot.events.length > 0) {
      for (let i = 0; i < this.mainshoot.events.length; i++) {
        if (this.mainshoot.events[i].event_no == eventId) {
          this.eventDetails.event_no = this.mainshoot.events[i].event_no ;
          return this.errorMsg('This Event Number has been selected for this shoot');
        }
      }

    }
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
        //console.log(success);
      }
    },
      error => {
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
  }
  addDTrap() {
    debugger;
    this.ranges.push({ range: 50, roundLength: 50 });
    this.setTrap();
  }
  deleteTraps(tempRange) {
    this.ranges.splice(this.ranges.indexOf(tempRange), 1);
    this.setTrap();
  }
  changeRound(tempRange) {
    debugger;
    tempRange.round = !tempRange.round;
    tempRange.range = 0;
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
  resetTrap(tempRange) {
    tempRange.range = 0;
   }

  addShoots() {
    debugger;
    this.convertDate();
    this.eventDetails.traps = [];
    for (let i = 0; i < this.ranges.length; i++) {
      this.eventDetails.traps.push({ "max": this.ranges[i].roundLength, "min": this.ranges[i].range });
    }
    if (this.eventDetails.type_id == 3) {
      if (this.addShootDetails.show == true) {
        this.eventDetails.yardage_id = '';
      } else {
        this.eventDetails.category_id = '';
      }
    }
    if (this.eventDetails.type_id != 3) {
      if (this.addShootDetails.show == true) {
        this.eventDetails.category_id = '';
         this.eventDetails.earned_yardage_id = '';
           this.eventDetails.yardage_id = '';
      } else {
        this.eventDetails.class_id = '';
        this.eventDetails.earned_yardage_id = '';
          this.eventDetails.yardage_id = '';
      }
    }
    console.log(this.addShootDetails);

    this.mainService.updateShoot(this.currentUser, this.eventDetails, this.addShootDetails, this.timeZone).subscribe(success => {
      console.log('timeZone',this.timeZone);
      debugger;
      if (success.status == 1) {
        console.log(success);
        
        if ((this.eventDetails.level_id == '1' ||this.eventDetails.level_id == '2') && (this.eventDetails.type_id == '3' && this.eventDetails.earned_yardage_id!='')) {
          this.changeUserYardage(this.eventDetails);
          }

        this.presentToast('Added Successfully');
        if (this.notes) {
          this.navCtrl.push(MyNotesPage);
        } else {
            this.navCtrl.setRoot(MyShootSummeryPage, {
          shoot: success.shoot_id
        })
        }

      } else {
        this.showPopup(success.statusinfo);
        console.log(success);
      }
    },
      error => {
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

  convertDate(){
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }



  confirmShoots() {
    this.convertDate();
    if (this.eventDetails.type_id == '1' || this.eventDetails.type_id == '2') {
      if (this.eventDetails.category_id != '0' && this.eventDetails.category_id != undefined && this.eventDetails.category_id != '') {
        if (this.eventDetails.place_id == '' || this.eventDetails.place_id == '0' || this.eventDetails.place_id == undefined) {
          //alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.eventDetails.class_id != '0' && this.eventDetails.class_id != undefined && this.eventDetails.class_id != '') {
        if (this.eventDetails.place_id == '' || this.eventDetails.place_id == '0' || this.eventDetails.place_id == undefined) {
          // alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.eventDetails.place_id == '' || this.eventDetails.place_id == '0' || this.eventDetails.place_id == undefined) {
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
    if (this.eventDetails.type_id == '3') {
      if (this.eventDetails.category_id != '0' && this.eventDetails.category_id != undefined && this.eventDetails.category_id != '') {
        if (this.eventDetails.place_id == '' || this.eventDetails.place_id == '0' || this.eventDetails.place_id == undefined) {
          //alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.eventDetails.yardage_id != '0' && this.eventDetails.yardage_id != undefined && this.eventDetails.yardage_id != '') {
        if (this.eventDetails.place_id == '' || this.eventDetails.place_id == '0' || this.eventDetails.place_id == undefined) {
          // alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.eventDetails.place_id == '' || this.eventDetails.place_id == '0' || this.eventDetails.place_id == undefined) {
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
  AddEarnedYardage(EarnedYardages) {

    for(let i=0;i<EarnedYardages.length;i++){
      if(this.eventDetails.earned_yardage_id==EarnedYardages[i].earned_yardage_id){
        this.eventDetails.earned_yardage_value=EarnedYardages[i].earned_yardage_value;
      }
    }

    if(this.userYardageId){
   if( this.eventDetails.earned_yardage_id >'0'){
        return this.errorMsg("Congratulations on your punch!  We have updated your yardage in the Settings.");
    }}else{
      this.errorMsg("Congratulations on your punch!  Please update your yardage in the Settings so we can automatically update any future earned yardage changes.");
    }
  }
  setMaxTrapNumber() {
    console.log(this.eventDetails.type_id);
    // if(this.eventDetails.level_id == '1' && this.eventDetails.type_id == '1'){
    //   if(this.userSettings != undefined){
    //     this.eventDetails.class_id = this.userSettings.ata_single;
    //     this.eventDetails.category_id = this.userSettings.ata_category;
    //   }

    // }
    // if(this.eventDetails.level_id == '1' && this.eventDetails.type_id == '2'){
    //   if(this.userSettings != undefined){
    //    this.eventDetails.class_id = this.userSettings.ata_double;
    //    this.eventDetails.category_id = this.userSettings.ata_category;
    //   }
    // }

    if (this.eventDetails.level_id == '1' && this.eventDetails.type_id == '3') {
      if (this.userSettings != undefined) {
        //  this.eventDetails.class_id = this.userSettings.ata_handicap;
        //  this.eventDetails.category_id = this.userSettings.ata_category;
       // this.eventDetails.yardage_id = this.userSettings.ata_handicap;
        this.userYardageId=this.userSettings.ata_handicap;
      }
    }
    // if(this.eventDetails.level_id == '2' && this.eventDetails.type_id == '1'){
    //   if(this.userSettings != undefined){
    //    this.eventDetails.class_id = this.userSettings.pita_single;
    //    this.eventDetails.category_id = this.userSettings.pita_category;
    //   }
    // }
    // if(this.eventDetails.level_id == '2' && this.eventDetails.type_id == '2'){
    //   if(this.userSettings != undefined){
    //    this.eventDetails.class_id = this.userSettings.pita_double;
    //    this.eventDetails.category_id = this.userSettings.pita_category;
    //   }
    // }
    if (this.eventDetails.level_id == '2' && this.eventDetails.type_id == '3') {
      if (this.userSettings != undefined) {
        //  this.eventDetails.class_id = this.userSettings.pita_handicap;
        //  this.eventDetails.category_id = this.userSettings.pita_category;
        //this.eventDetails.yardage_id = this.userSettings.pita_handicap;
        this.userYardageId=this.userSettings.pita_handicap;
      }
    }



    if ((this.eventDetails.level_id == '1' || this.eventDetails.level_id == '2') && (this.eventDetails.type_id == '1' || this.eventDetails.type_id == '3')) {
      this.ranges = [];
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.trapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
      this.range1 = this.range2 = this.range3 = this.range4 = this.range5 = this.range6 = this.range7 = this.range8 = this.range9 = this.range10 = this.range11 = this.range12 = 25;
    }
    if ((this.eventDetails.level_id == '1' && this.eventDetails.type_id == '') || (this.eventDetails.level_id == '2' && this.eventDetails.type_id == '')) {
      this.ranges = [];
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.trapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
      this.range1 = this.range2 = this.range3 = this.range4 = this.range5 = this.range6 = this.range7 = this.range8 = this.range9 = this.range10 = this.range11 = this.range12 = 25;
    }
    if ((this.eventDetails.level_id == '1' && this.eventDetails.type_id == '2') || (this.eventDetails.level_id == '2' && this.eventDetails.type_id == '2')) {
      this.ranges = [];
      this.ranges.push({ range: 50, roundLength: 50 });
      this.ranges.push({ range: 50, roundLength: 50 });
      
      this.trapNumber = 1;
      this.range1 = this.range2 = this.range3 = this.range4 = this.range5 = this.range6 = this.range7 = this.range8 = this.range9 = this.range10 = this.range11 = this.range12 = 50;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 50;
    }
    if ((this.eventDetails.level_id == '3' && this.eventDetails.type_id == '2') || (this.eventDetails.level_id == '4' && this.eventDetails.type_id == '2')) {
      this.ranges = [];
      this.ranges.push({
        range: 50,
        roundLength: 50
      });
      this.trapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 50;
      this.range1 = this.range2 = this.range3 = this.range4 = this.range5 = this.range6 = this.range7 = this.range8 = this.range9 = this.range10 = this.range11 = this.range12 = 50;
    }
    if ((this.eventDetails.level_id == '3' && this.eventDetails.type_id == '1') || (this.eventDetails.level_id == '4' && this.eventDetails.type_id == '1')) {
      this.ranges = [];
      this.ranges.push({
        range: 25,
        roundLength: 25
      });
      this.trapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
      this.range1 = this.range2 = this.range3 = this.range4 = this.range5 = this.range6 = this.range7 = this.range8 = this.range9 = this.range10 = this.range11 = this.range12 = 25;
    }
    if ((this.eventDetails.level_id == '3' && this.eventDetails.type_id == '3') || (this.eventDetails.level_id == '4' && this.eventDetails.type_id == '3')) {
      this.ranges = [];
      this.ranges.push({
        range: 25,
        roundLength: 25
      });
      this.trapNumber = 1;
      this.roundLength1 = this.roundLength2 = this.roundLength3 = this.roundLength3 = this.roundLength4 = this.roundLength5 = this.roundLength6 = this.roundLength7 = this.roundLength8 = this.roundLength9 = this.roundLength10 = this.roundLength11 = this.roundLength12 = 25;
      this.range1 = this.range2 = this.range3 = this.range4 = this.range5 = this.range6 = this.range7 = this.range8 = this.range9 = this.range10 = this.range11 = this.range12 = 25;
    }
      this.setTrap();
  }

}
