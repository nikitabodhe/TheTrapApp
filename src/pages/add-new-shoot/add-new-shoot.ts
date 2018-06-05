import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MainService } from '../../providers/main-service';
//import { MyshootsScoresPage } from '../myshoots-scores/myshoots-scores';
import { MyShootSummeryPage } from '../my-shoot-summery/my-shoot-summery';

@Component({
  selector: 'page-add-new-shoot',
  templateUrl: 'add-new-shoot.html'
})
export class AddNewShootPage {
  timeZone:any;
  loading: Loading;
  createSuccess = false;
  parentRg:any;
  currentUser: any;
  allClass: string[];
  alllevels: string[];
  allTypes: string[];
  allPlaces: string[];
  allCategory: string[];
  allEarnedYardage: string[];
  EarnedYardage: string[];
  ranges: any = [];
  range: any;
  roundLength: any = 25;
  round: boolean = false;
  total: number;
  tempTraps: number = 0;
  timeStarts: String = new Date().toISOString();
  timeEnds: String = new Date().toISOString();
  minEndDate: any;
  minStartDate: any;
  userSettings: any;
  yardage: any;
  earnedYardage: any;
  userYardageId:any;
  addNewShoot = { shoot_id: '', shoot_name: '', club_id: '', event_no: '', event_name: '', yardage_id: '', earned_yardage_id: '',earned_yardage_value:'', category_id: '', level_id: '', event_start_date: '', event_end_date: '', place_id: '', class_id: '', traps: [{}], note: '', event_id: '', type_id: '', show: true , timeZone: ''}
  startDateSelected: boolean;
  levels: string;
  tempRange:any = [];
  new_element:any;
  r1:any;
  r2:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private mainService: MainService, private toastCtrl: ToastController) {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.minStartDate = new Date().toISOString();
    this.levels = this.navParams.get('Level');
    console.log(this.addNewShoot);
    this.addNewShoot.level_id = this.navParams.get('id');
    this.tempTraps = 0;
  }
  ionViewDidLoad() {
    this.setMaxTrapNumber();
    console.log('ionViewDidLoad AddNewShootPage');
    console.log('date',new Date().getTimezoneOffset);

    this.loadCurrenrUser();
  }
  changeClass() {
    if(this.addNewShoot.show==true){
      this.addNewShoot.category_id='';
    }else{
      this.addNewShoot.class_id='';
    }
  }
  changeCategory() {
    if(this.addNewShoot.show==true){
      this.addNewShoot.yardage_id='';
    }else{
      this.addNewShoot.category_id='';
    }
  }
  setEndDate() {
    console.log(this.addNewShoot.event_start_date);
    this.startDateSelected = true;
    this.minEndDate = this.addNewShoot.event_start_date.split('T');
    this.minEndDate = this.minEndDate[0];
    this.addNewShoot.event_end_date = this.addNewShoot.event_start_date;
    console.log(this.minEndDate);
  }
  setEndEventDate() {
    if (this.addNewShoot.event_end_date < this.addNewShoot.event_start_date) {
      this.addNewShoot.event_end_date = '';
      this.errorMsg('Please ensure that end date greater than or equal to start date.')
    } else {
    }
  }
  setMaxTrapNumber() {

    console.log(this.addNewShoot.type_id);
   // debugger;
    if (this.addNewShoot.level_id == '1' && this.addNewShoot.type_id == '3') {
      if (this.userSettings != undefined) {
        // this.addNewShoot.yardage_id = this.userSettings.ata_handicap;
        this.userYardageId=this.userSettings.ata_handicap;

      }
    }
    if (this.addNewShoot.level_id == '2' && this.addNewShoot.type_id == '3') {
      if (this.userSettings != undefined) {
        // this.addNewShoot.yardage_id = this.userSettings.pita_handicap;
        this.userYardageId=this.userSettings.pita_handicap;
      }
    }
    if ((this.addNewShoot.level_id == '1' || this.addNewShoot.level_id == '2') && (this.addNewShoot.type_id == '1' || this.addNewShoot.type_id == '3')) {
      this.ranges = [];


      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
    }
    if ((this.addNewShoot.level_id == '1' && this.addNewShoot.type_id == '') || (this.addNewShoot.level_id == '2' && this.addNewShoot.type_id == '')) {

      this.ranges = [];
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
      this.ranges.push({ range: 25, roundLength: 25 });
    }
    if ((this.addNewShoot.level_id == '1' && this.addNewShoot.type_id == '2') || (this.addNewShoot.level_id == '2' && this.addNewShoot.type_id == '2')) {
      this.ranges = [];
      this.ranges.push({ range: 50, roundLength: 50 });
      this.ranges.push({ range: 50, roundLength: 50 });
    }
    if ((this.addNewShoot.level_id == '3' || this.addNewShoot.level_id == '4') && (this.addNewShoot.type_id == '1' || this.addNewShoot.type_id == '3')) {
      this.ranges = [];
      this.ranges = [
        {
          range: 25,
          roundLength: 25
        }
      ];
    }
    if ((this.addNewShoot.level_id == '3' && this.addNewShoot.type_id == '2') || (this.addNewShoot.level_id == '4' && this.addNewShoot.type_id == '2')) {
      this.ranges = [];
      this.ranges.push({
        range: 50,
        roundLength: 50
      });
    }
    if ((this.addNewShoot.level_id == '3' && this.addNewShoot.type_id == '') || (this.addNewShoot.level_id == '4' && this.addNewShoot.type_id == '')) {
      this.ranges = [];
      this.ranges.push({
        range: 25,
        roundLength: 25
      });
    }
    this.setTrap();
  }
  AddEarnedYardage(EarnedYardages) {
    //this.addNewShoot.earned_yardage_id;
    //console.log(EarnedYardages);

    for(let i=0;i<EarnedYardages.length;i++){
      if(this.addNewShoot.earned_yardage_id==EarnedYardages[i].earned_yardage_id){
        this.addNewShoot.earned_yardage_value=EarnedYardages[i].earned_yardage_value;
      }
    }

    if(this.userYardageId){
      if (this.addNewShoot.earned_yardage_id > '0') {
        this.errorMsg("Congratulations on your punch!  We have updated your yardage in the Settings.");
      }
    }else{
      this.errorMsg("Congratulations on your punch!  Please update your yardage in the Settings so we can automatically update any future earned yardage changes.");
    }
    
  }
  ngOnInit() {
    this.getClass();
    // this.getLevels();
    this.getTypes();
    this.getCategory();
    this.getPlace();
    this.getEarnedYardage();
    this.EarnedYardages();
    this.get_user_settings();
  }
  setTrap() {
 
   console.log('setTrap',this.ranges);
    let temp = 0;

    for (let i = 0; i < this.ranges.length; i++) {
      temp = temp + parseInt(this.ranges[i].range);
    }
    this.tempTraps = temp;

    

  }
  loadCurrenrUser() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(this.currentUser.user_id);
  }
  changeRound(tempRange) {
   debugger;
    tempRange.round = !tempRange.round;
    tempRange.range = 0;
   
  }  

  resetTrap(tempRange) {
    tempRange.range = 0;
   }

  addTraps() {
      this.ranges.push({ range: 25, roundLength: 25 });
      this.setTrap();
      console.log('100 range: '+this.ranges);
    }

  addDTrap() {
    this.ranges.push({ range: 50, roundLength: 50 });
    this.setTrap();
    console.log(this.ranges);
  }

  
  deleteTraps(tempRange) {
    // debugger;
    this.ranges.splice(this.ranges.indexOf(tempRange), 1);
    this.setTrap();
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
            this.addNewShootFunc();
          }
        }

      ]
    });
    alert.present();
  }

  convertDate(){
    debugger;
    var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
    console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
    this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }


  confirmShoots() {
debugger;
this.convertDate();
    if (this.addNewShoot.type_id == '1' || this.addNewShoot.type_id == '2') {
      if (this.addNewShoot.category_id != '0' && this.addNewShoot.category_id != undefined && this.addNewShoot.category_id != '') {
        if (this.addNewShoot.place_id == '' || this.addNewShoot.place_id == '0' || this.addNewShoot.place_id == undefined) {
          //alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.addNewShoot.class_id != '0' && this.addNewShoot.class_id != undefined && this.addNewShoot.class_id != '') {
        if (this.addNewShoot.place_id == '' || this.addNewShoot.place_id == '0' || this.addNewShoot.place_id == undefined) {
          // alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.addNewShoot.place_id == '' || this.addNewShoot.place_id == '0' || this.addNewShoot.place_id == undefined) {
        this.confirmShoot();
      } else {
        //alert('select cat or class');
        if (this.addNewShoot.show == true) {
          return this.errorMsg('Please correct your trophy class');
        } else {
          return this.errorMsg('Please correct your trophy category');
        }
      }
    }
    if (this.addNewShoot.type_id == '3') {
      if (this.addNewShoot.category_id != '0' && this.addNewShoot.category_id != undefined && this.addNewShoot.category_id != '') {
        if (this.addNewShoot.place_id == '' || this.addNewShoot.place_id == '0' || this.addNewShoot.place_id == undefined) {
          //alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.addNewShoot.yardage_id != '0' && this.addNewShoot.yardage_id != undefined && this.addNewShoot.yardage_id != '') {
        if (this.addNewShoot.place_id == '' || this.addNewShoot.place_id == '0' || this.addNewShoot.place_id == undefined) {
          // alert('select place')
          return this.errorMsg('Please correct your trophy Place');
        } else {
          this.confirmShoot();
        }
      } else if (this.addNewShoot.place_id == '' || this.addNewShoot.place_id == '0' || this.addNewShoot.place_id == undefined) {
        this.confirmShoot();
      } else {
        //alert('select cat or earned');
        if (this.addNewShoot.show == true) {
          return this.errorMsg('Please correct your trophy category');
        } else {
          return this.errorMsg('Please correct your trophy earned yardage');
        }

      }
    }
    //  if(this.addNewShoot.type_id=='3'){   
    //   if(this.addNewShoot.category_id!='0' && this.addNewShoot.category_id!=undefined && this.addNewShoot.category_id!=''){

    //     if((this.addNewShoot.place_id==''||this.addNewShoot.place_id=='0'||this.addNewShoot.place_id==undefined) && (this.addNewShoot.earned_yardage==''||this.addNewShoot.earned_yardage=='0'||this.addNewShoot.earned_yardage==undefined)){
    //       //alert('select place')
    //       return this.errorMsg('Please correct your trophy Place and eaned yardage');

    //     }else if((this.addNewShoot.place_id==''||this.addNewShoot.place_id=='0'||this.addNewShoot.place_id==undefined)){
    //         return this.errorMsg('Please correct your trophy Place');
    //     }
    //     else if((this.addNewShoot.earned_yardage==''||this.addNewShoot.earned_yardage=='0'||this.addNewShoot.earned_yardage==undefined)){
    //       return this.errorMsg('Please correct your trophy  eaned yardage');
    //     }

    //     else{
    //      this.confirmShoot();
    //     }
    //   }else if(this.addNewShoot.class_id!='0' && this.addNewShoot.class_id!=undefined && this.addNewShoot.class_id!=''){
    //     if((this.addNewShoot.place_id==''||this.addNewShoot.place_id=='0'||this.addNewShoot.place_id==undefined) ||(this.addNewShoot.earned_yardage==''||this.addNewShoot.earned_yardage=='0'||this.addNewShoot.earned_yardage==undefined)){
    //      // alert('select place')
    //        return this.errorMsg('Please correct your trophy Place and earned yardage');
    //     }else{
    //       this.confirmShoot();
    //     }
    //   }else if((this.addNewShoot.place_id==''||this.addNewShoot.place_id=='0'||this.addNewShoot.place_id==undefined)&& (this.addNewShoot.earned_yardage==''||this.addNewShoot.earned_yardage=='0'||this.addNewShoot.earned_yardage==undefined)){
    //     this.confirmShoot();
    //   }else{
    //     //alert('select cat or class');
    //      return this.errorMsg('Please correct your trophy category');
    //   }
    // }
  }
  addNewShootFunc() {
    debugger;
    this.addNewShoot.traps = [];
    for (let i = 0; i < this.ranges.length; i++) {
      this.addNewShoot.traps.push({ "max": this.ranges[i].roundLength, "min": this.ranges[i].range });
    }
    if (this.addNewShoot.type_id == '3') {
      if (this.addNewShoot.show == true) {
        this.addNewShoot.yardage_id = '';
      }
      if (this.addNewShoot.show == false) {
        this.addNewShoot.category_id = '';
      }
    } else {
      if (this.addNewShoot.show == true) {
        this.addNewShoot.category_id = '';
      }
      if (this.addNewShoot.show == false) {
        this.addNewShoot.class_id = '';
      }
    }
    console.log(this.addNewShoot);
    this.addNewShoot.event_no = '1';
    this.showLoading();
    this.mainService.addShoot(this.currentUser, this.addNewShoot, this.addNewShoot, this.timeZone).subscribe(success => {
      console.log('addShoot',this.timeZone);
     
      if (success.status == 1) 
      {
        this.loading.dismiss();
        console.log(success,'addshot');
        if ((this.addNewShoot.level_id == '1' ||this.addNewShoot.level_id == '2') && (this.addNewShoot.type_id == '3' && this.addNewShoot.earned_yardage_id!='')) {
          this.changeUserYardage(this.addNewShoot);
          }
        this.presentToast('Added Successfully');
        // this.navCtrl.setRoot(AddShootsPage);
        // this.navCtrl.push(MyshootsScoresPage);

        this.navCtrl.setRoot(MyShootSummeryPage, {
          shoot: success.shoot_id
        })
      } else {
        this.loading.dismiss();
        this.showPopup(success.statusinfo);
        //console.log(success);
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

  get_user_settings() {
    this.mainService.get_user_settings(this.currentUser.user_id, this.timeZone).subscribe(success => {
      if (success.status == 1) {
        console.log(success);
        this.userSettings = success.data[0];

        console.log(this.userSettings);

      } else {
        console.log(success);

      }
    },
      error => {
        console.log(error);
      });
  }


}
