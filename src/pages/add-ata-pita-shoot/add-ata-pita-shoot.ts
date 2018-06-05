import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MainService } from '../../providers/main-service';
import { MyShootSummeryPage } from '../my-shoot-summery/my-shoot-summery';

@Component({
  selector: 'page-add-ata-pita-shoot',
  templateUrl: 'add-ata-pita-shoot.html'
})
export class AddAtaPitaShootPage {
  timeZone:any;
  loading: Loading;
  createSuccess: false;
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
  userSettings: any;
  allEarnedYardage: any;
  EarnedYardage: any;
  trapNumber: number = 1;
  maxTrapNumber: number = 12;
  addShootDetails = { shoot_id: '', shoot_name: '', club_id: '', event_name: '', yardage_id: '', earned_yardage_id: '', earned_yardage_value: '', category_id: '', level_id: '', event_no: '', event_start_date: '', event_end_date: '', place_id: '', class_id: '', note: '', event_id: '', show: true}
  addTimeZone = { timeZone: '' }
  score_id: boolean;
  ranges: any = [];
  range: any = 0;
  roundLength: any = 25;
  round: boolean = false;
  traps: number = 0;
  tempTraps: number = 0;
  userYardageId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private mainService: MainService, private toastCtrl: ToastController) {
    this.timeStarts = '05/01/17';
    this.timeEnds = '05/02/17';
    this.shootdetails = navParams.get('shoot');
    this.eventDetails = navParams.get('event');
    if (this.eventDetails.type_id != 0) {
      if (this.eventDetails.yardage_id) {
        this.addShootDetails.show = false;
      } else {
        this.addShootDetails.show = true;
      }
    }
    this.eventDetails.shoot_name = this.shootdetails.shoot_name;
    this.eventDetails.level_id = this.shootdetails.level_id;

    for (let i = 0; i < this.eventDetails.traps.length; i++) {
      this.ranges.push({
        range: this.eventDetails.traps[i].score,
        roundLength: this.eventDetails.traps[i].maxscore
      });
    }
    this.setTrap();
    if (!this.eventDetails.score_id) {
      this.score_id = true;
    }
    this.loadCurrenrUser();
    this.level = this.shootdetails.levelname;
    this.addShootDetails.shoot_id = this.shootdetails.shoot_id;
    this.addShootDetails.shoot_name = this.shootdetails.shoot_name;
    this.addShootDetails.event_name = this.eventDetails.event_name;
    this.addShootDetails.event_id = this.eventDetails.shoot_event_id;
    this.addShootDetails.level_id = this.shootdetails.level_id;
    this.addShootDetails.event_no = this.eventDetails.event_no;
    if ((this.shootdetails.level_id == '1' || this.shootdetails.level_id == '2') && (this.eventDetails.typename == 'Singles' || this.eventDetails.typename == 'Handicap')) {

      if (this.eventDetails.traps.length == 0) {
        this.ranges = [];
        if (this.eventDetails.targets) {
          let tempTargetEvents = parseInt(this.eventDetails.targets) / 25;

          for (let i = 0; i < tempTargetEvents; i++) {
            this.ranges.push({ range: 25, roundLength: 25 });
          }
        } else {

          this.ranges.push({ range: 25, roundLength: 25 });
          this.ranges.push({ range: 25, roundLength: 25 });
          this.ranges.push({ range: 25, roundLength: 25 });
          this.ranges.push({ range: 25, roundLength: 25 });
        }

      }
    }
    if ((this.shootdetails.level_id == '1' && this.eventDetails.typename == '') || (this.shootdetails.level_id == '2' && this.eventDetails.typename == '')) {

      if (this.eventDetails.traps.length == 0) {
        this.ranges = [];
        if (this.eventDetails.targets) {
          let tempTargetEvents = parseInt(this.eventDetails.targets) / 25;

          for (let i = 0; i < tempTargetEvents; i++) {
            this.ranges.push({ range: 25, roundLength: 25 });
          }
        } else {

          this.ranges.push({ range: 25, roundLength: 25 });
          this.ranges.push({ range: 25, roundLength: 25 });
          this.ranges.push({ range: 25, roundLength: 25 });
          this.ranges.push({ range: 25, roundLength: 25 });
        }

      }
    }

    if ((this.shootdetails.level_id == '1' && this.eventDetails.typename == 'Doubles') || (this.shootdetails.level_id == '2' && this.eventDetails.typename == 'Doubles')) {

      if (this.eventDetails.traps.length == 0) {
        this.ranges = [];
        if (this.eventDetails.targets) {
          let tempTargetEvents = parseInt(this.eventDetails.targets) / 50;

          for (let i = 0; i < tempTargetEvents; i++) {
            this.ranges.push({ range: 50, roundLength: 50 });
          }
        } else {

          this.ranges.push({ range: 50, roundLength: 50 });
          this.ranges.push({ range: 50, roundLength: 50 });
        }

      }

      // if (this.eventDetails.traps.length == 0) {
      //   this.ranges = [];
      //   this.ranges.push({ range: 50, roundLength: 50 });
      //   this.ranges.push({ range: 50, roundLength: 50 });

      // }
    }

    if ((this.shootdetails.level_id == '3' && this.eventDetails.typename == 'Doubles') || (this.shootdetails.level_id == '4' && this.eventDetails.typename == 'Doubles')) {


      if (this.eventDetails.traps.length == 0) {
        this.ranges = [];
        if (this.eventDetails.targets) {
          let tempTargetEvents = parseInt(this.eventDetails.targets) / 50;

          for (let i = 0; i < tempTargetEvents; i++) {
            this.ranges.push({ range: 50, roundLength: 50 });
          }
        } else {

          this.ranges.push({ range: 50, roundLength: 50 });

        }

      }

      // if (this.eventDetails.traps.length == 0) {
      //   this.ranges = [];
      //   this.ranges.push({ range: 50, roundLength: 50 });
      // }
    }
    if ((this.shootdetails.level_id == '3' && this.eventDetails.typename == 'Singles') || (this.shootdetails.level_id == '4' && this.eventDetails.typename == 'Singles')) {

      if (this.eventDetails.traps.length == 0) {
        this.ranges = [];
        if (this.eventDetails.targets) {
          let tempTargetEvents = parseInt(this.eventDetails.targets) / 25;

          for (let i = 0; i < tempTargetEvents; i++) {
            this.ranges.push({ range: 25, roundLength: 25 });
          }
        } else {
          this.ranges.push({ range: 25, roundLength: 25 });
        }
      }
      // if (this.eventDetails.traps.length == 0) {
      //   this.ranges = [];
      //   this.ranges.push({ range: 25, roundLength: 25 });
      // }
    }
    if ((this.shootdetails.level_id == '3' && this.eventDetails.typename == 'Handicap') || (this.shootdetails.level_id == '4' && this.eventDetails.typename == 'Handicap')) {
      if (this.eventDetails.traps.length == 0) {
        this.ranges = [];
        if (this.eventDetails.targets) {
          let tempTargetEvents = parseInt(this.eventDetails.targets) / 25;

          for (let i = 0; i < tempTargetEvents; i++) {
            this.ranges.push({ range: 25, roundLength: 25 });
          }
        } else {
          this.ranges.push({ range: 25, roundLength: 25 });
        }
      }
      // if (this.eventDetails.traps.length == 0) {
      //   this.ranges = [];
      //   this.ranges.push({ range: 25, roundLength: 25 });
      // }
    }
    if (this.eventDetails.traps.length == 0) {
      this.setTrap();
    }
  }
  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Cancel');
    console.log('ionViewDidLoad AddAtaPitaShootPage');
    this.get_user_settings();
  }
  loadCurrenrUser() {

    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  }
  ngOnInit() {

    this.getLevels();
    this.getClass();
    this.getPlace();
    this.getEarnedYardage();
    this.EarnedYardages();
    this.getCategory();

  }
  get_user_settings() {
    this.mainService.get_user_settings(this.currentUser.user_id, this.timeZone).subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.userSettings = success.data[0];
        console.log(this.userSettings);
        if (this.userSettings != undefined) {
          if (this.shootdetails.level_id == '1' && this.eventDetails.type_id == '3') {
            //  this.addShootDetails.class_id = this.userSettings.ata_handicap;
            //  this.addShootDetails.category_id = this.userSettings.ata_category;
            //this.addShootDetails.yardage_id = this.userSettings.ata_handicap;
            this.userYardageId = this.userSettings.ata_handicap;
          }
          if (this.shootdetails.level_id == '2' && this.eventDetails.type_id == '3') {
            //  this.addShootDetails.class_id = this.userSettings.ata_handicap;
            //  this.addShootDetails.category_id = this.userSettings.ata_category;
            //this.addShootDetails.yardage_id = this.userSettings.ata_handicap;
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
  AddEarnedYardage(EarnedYardages) {

    for (let i = 0; i < EarnedYardages.length; i++) {
      if (this.eventDetails.earned_yardage_id == EarnedYardages[i].earned_yardage_id) {
        this.eventDetails.earned_yardage_value = EarnedYardages[i].earned_yardage_value;
      }
    }


    if (this.userYardageId) {
      if (this.eventDetails.earned_yardage_id > '0') {
        return this.errorMsg("Congratulations on your punch!  We have updated your yardage in the Settings.");
      }
    } else {
      this.errorMsg("Congratulations on your punch!  Please update your yardage in the Settings so we can automatically update any future earned yardage changes.");
    }
  }
  setTrap() {
    let temp = 0;
    for (let i = 0; i < this.ranges.length; i++) {
      temp = temp + parseInt(this.ranges[i].range);
    }
    this.tempTraps = temp;
  }
  changeClass() {
    if (this.addShootDetails.show == true) {
      this.eventDetails.category_id = '';
    } else {
      this.eventDetails.class_id = '';
    }
  }
  chekTrap() {
    if (this.eventDetails.targets) {
      if (this.eventDetails.targets > this.tempTraps) {

      } else { }

    }
  }
  changeCategory() {
    if (this.addShootDetails.show == true) {
      this.eventDetails.yardage_id = '';
    } else {
      this.eventDetails.category_id = '';
    }
  }
  addTrap() {
    if (this.trapNumber < this.maxTrapNumber) {
      this.trapNumber = this.trapNumber + 1;
    }
  }
  addTraps() {

    //let last_element = this.ranges[this.ranges.length-1];
    //this.ranges.splice(this.ranges.indexOf(this.ranges.length-1), 1);
    this.ranges.push({ range:25,roundLength:25});
    this.setTrap();
   
  }
  addDTrap() {
    // let last_element = this.ranges[this.ranges.length-1];
    // this.ranges.splice(this.ranges.indexOf(this.ranges.length-1), 1);
    // this.ranges.push({ range:last_element.range,roundLength:last_element.roundLength},
    //   { range: 50, roundLength: 50 });
    // this.setTrap();
    this.ranges.push({ range:50,roundLength:50});
    this.setTrap();
  }
  // addTraps() {
  //   if (this.eventDetails.targets) {
  //     //this.tempTraps
  //     if (this.eventDetails.targets > this.tempTraps && (this.tempTraps + 25) <= this.eventDetails.targets) {
  //       let last_element = this.ranges[this.ranges.length - 1];
  //       this.ranges.splice(this.ranges.indexOf(this.ranges.length - 1), 1);
  //       this.ranges.push({ range: last_element.range, roundLength: last_element.roundLength },
  //         { range: 25, roundLength: 25 });
  //     } else {
  //       return this.errorMsg('Targets Limit is ' + this.eventDetails.targets);
  //     }


  //   } else {
  //     let last_element = this.ranges[this.ranges.length - 1];
  //     this.ranges.splice(this.ranges.indexOf(this.ranges.length - 1), 1);
  //     this.ranges.push({ range: last_element.range, roundLength: last_element.roundLength },
  //       { range: 25, roundLength: 25 });
  //   }
  //   this.setTrap();

  // }
  // addDTrap() {
  //   if (this.eventDetails.targets) {
  //     //this.tempTraps
  //     if (this.eventDetails.targets > this.tempTraps && (this.tempTraps + 50) <= this.eventDetails.targets) {
  //       let last_element = this.ranges[this.ranges.length - 1];
  //       this.ranges.splice(this.ranges.indexOf(this.ranges.length - 1), 1);
  //       this.ranges.push({ range: last_element.range, roundLength: last_element.roundLength },
  //         { range: 50, roundLength: 50 });
  //     } else {
  //       return this.errorMsg('Targets Limit is ' + this.eventDetails.targets);
  //     }
  //   } else {
  //     let last_element = this.ranges[this.ranges.length - 1];
  //     this.ranges.splice(this.ranges.indexOf(this.ranges.length - 1), 1);
  //     this.ranges.push({ range: last_element.range, roundLength: last_element.roundLength },
  //       { range: 50, roundLength: 50 });
  //   }
  //   this.setTrap();
  // }
  deleteTraps(tempRange) {
    this.ranges.splice(this.ranges.indexOf(tempRange), 1);
    this.setTrap();
  }
  changeRound(tempRange) {
    debugger;
    tempRange.round = !tempRange.round;
    tempRange.range = 0;
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
  getLevels() {
    this.mainService.getLevels(this.timeZone).subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.alllevels = success.data;
      } else {
        // console.log(success);
      }
    },
      error => {
        // console.log( error);
      });
  }
  getClass() {
    this.mainService.getClass().subscribe(success => {
      if (success.status == 1) {
        //console.log(success);
        this.allClass = success.data;

      } else {
        // console.log(success);

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
        // console.log(success);

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
        // console.log(success);

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
        // console.log(success);

      }
    },
      error => {
        // console.log( error);
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
      // console.log('Dismissed toast');
    });

    toast.present();
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
    return false;
  }
  confirm() {
    
    if (this.eventDetails.targets) {
      //this.tempTraps
      if (this.eventDetails.targets < this.tempTraps) {
        return this.errorMsg('Targets Limit is ' + this.eventDetails.targets);
      }
    }
    if (this.eventDetails.type_id == '1' || this.eventDetails.type_id == '2') {
      if (this.eventDetails.category_id != '0' && this.eventDetails.category_id != undefined && this.eventDetails.category_id != null) {
        //if (this.eventDetails.place_id == '' || this.eventDetails.place_id == '0' || this.eventDetails.place_id == undefined) {
          //alert('select place')
         // return this.errorMsg('Please correct your trophy Place');
        //} else {
          this.confirmShoot();
       // }
      } else if (this.eventDetails.class_id != '0' && this.eventDetails.class_id != undefined && this.eventDetails.class_id != null) {

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
        return this.errorMsg('Please correct your trophy category or class');
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
  addShoots() {
    this.eventDetails.traps = [];
    for (let i = 0; i < this.ranges.length; i++) {
      this.eventDetails.traps.push({ "max": this.ranges[i].roundLength, "min": this.ranges[i].range });
    }
    console.log(this.eventDetails);
    console.log(this.addShootDetails);
    this.showLoading();
    this.mainService.addShoot(this.currentUser, this.eventDetails, this.addShootDetails, this.addTimeZone).subscribe(success => {
      if (success.status == 1) {
        if ((this.eventDetails.level_id == '1' || this.eventDetails.level_id == '2') && (this.eventDetails.type_id == '3' && this.eventDetails.earned_yardage_id != '')) {
          this.changeUserYardage(this.eventDetails);
        }
        this.loading.dismiss();
        console.log(success);
        this.presentToast('Added Successfully');
        this.navCtrl.setRoot(MyShootSummeryPage, {
          shoot: success.shoot_id
        })
      } else {
        this.loading.dismiss();
        this.showPopup(success.statusinfo);
        console.log(success);
      }
    },
      error => {
        console.log(error);
      });
  }
  changeUserYardage(userdata) {
    this.mainService.change_yardage(this.currentUser, userdata).subscribe(success => {
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
}
