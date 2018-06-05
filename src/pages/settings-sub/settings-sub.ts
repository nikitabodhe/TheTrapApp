  import { Component } from '@angular/core';
  import { NavController, AlertController, LoadingController, Loading, NavParams, ViewController, 
    ToastController, Events, ActionSheetController, Platform } from 'ionic-angular';
  import { Camera, File } from 'ionic-native';

  import { Transfer, TransferObject } from '@ionic-native/transfer';
  import { NativeStorage } from 'ionic-native';
  import { UserService } from '../../providers/user-service';
  import { SettingsPage } from '../settings/settings';
  import { MainService } from '../../providers/main-service';


  var cordova: any;
  @Component({
    selector: 'page-settings-sub',
    templateUrl: 'settings-sub.html',
  providers: [Transfer,Camera]

  })

  export class SettingsSubPage {
    timeZone:any;
    postTitle: any;
    desc: any;
    currentPage: string;
    allClass: any;
    allCategory: any;
    allEarnedYardage: any;
    userSettings: any;
    emailSetting:any;
    loading: Loading;
    settings: number;
    currentUser: any;
    resetPass: boolean;
    updatePrf: boolean;
    pushNotification: boolean;
    emailManagePage:boolean;
    forgetPass: boolean;
    pushSettings: boolean = true;
    passwordDetails = { currentPass: '', newPassword: '', confirmPassword: '' };
    is_my_shoot_score: any;
    is_my_shoot_score1: any;
    is_my_shoot_score11: any;
    is_my_favourite: any;
    is_my_favourite1: boolean;
    is_my_favourite11: boolean;
    frequency_four1:boolean;
    frequency_four:any;
    frequency_ten1:boolean;
    frequency_ten:any;
    frequency_seventeen1:boolean;
    frequency_seventeen:any;
    frequency_twentyfour1:boolean;
    frequency_twentyfour:any;

    email_frequency_four:any;
    email_frequency_ten:any;
    email_frequency_seventeen:any;
    email_frequency_twentyfour:any;
    location: boolean = false;
    locations:boolean= false;
    is_club_located_near_me: number;
    club_located_near_me:number;
    frequency: any;
    emailDis: boolean = true;
    profileDetails = { name: '', email: '',zipcode:'' };
    forgetUser = { email: '' };

    lastImage: string = null;
    imageChosen: any = 0;
    imagePath: any;
    imageNewPath: any;
    user_image:any;
      lat : number;
    lng : number;
    userPreference = { ata_single: '', ata_double: '', ata_handicap: '', ata_category: '', pita_single: '', pita_double: '', pita_handicap: '', pita_category: '' };
    // private transfer: Transfer, private camera: Camera ,
    constructor( private transfer: Transfer, public camera: Camera ,public navCtrl: NavController, private navParams: NavParams,
    public viewCtrl: ViewController, private user: UserService,  private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, public events: Events, public actionSheetCtrl: ActionSheetController, public platform: Platform,
      private mainService: MainService) {
      this.currentPage = navParams.get('currentPage');
      this.currentUser = navParams.get('currentUser');
      this.user_image= window.localStorage.getItem("profile_picture");
      // console.log(this.currentUser);
      this.profileDetails.name = this.currentUser.name;
      this.profileDetails.email = this.currentUser.username;
      this.profileDetails.zipcode = this.currentUser.zipcode;
      // this.user_profile= window.localStorage.getItem("profile_picture");
      // this.profileDetails.gender = this.currentUser.gender;

      if (this.currentPage == 'Reset Password') {
        this.resetPass = true;
        this.updatePrf = false;
        this.pushNotification = false;
        this.forgetPass = false;
        this.emailManagePage = false;
      }
      if (this.currentPage == 'Edit Profile') {
        this.resetPass = false;
        this.updatePrf = true;
        this.pushNotification = false;
        this.forgetPass = false;
        this.emailManagePage = false;
        this.get_user_settings();
        this.getClass();
        this.getEarnedYardage();
        this.getCategory();
      }
      if (this.currentPage == 'Trap App Push Notifications') {
        this.resetPass = false;
        this.updatePrf = false;
        this.pushNotification = true;
        this.forgetPass = false;
        this.emailManagePage = false;
        this.get_user_settings();

      }
      if (this.currentPage == 'Trap App Email Notifications') {
        this.resetPass = false;
        this.updatePrf = false;
        this.emailManagePage = true;
        this.forgetPass = false;
        this.pushNotification = false;
            this.get_email_settings();
      }
      if (this.currentPage == 'Manage My Favorites') {
        this.resetPass = false;
        this.updatePrf = false;
        this.pushNotification = false;
        this.forgetPass = false;
        this.emailManagePage = false;
      }
      if (this.currentPage == 'Forget Password') {
        this.resetPass = false;
        this.updatePrf = false;
        this.pushNotification = false;
        this.forgetPass = true;
        this.emailManagePage = false;
      }

    }


    convertDate(){
      var offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
      console.log((offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2));
      this.timeZone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    }
    
    uploadPhoto() {
    // alert('selected');
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      if(!this.imagePath){
        this.presentToast('Please Select Profile Picture!');
        return;
      }else{
      loader.present();
    // alert('filename');
      let filename = this.imagePath;
    
      let options = {
        fileKey: "profile_picture",
        Filename: filename,
        chunkedMode: false,
        mimeType: "image/*",
        params: { 'user_id':this.currentUser.user_id},
        // headers: {"Content-Type": "multipart/form-data"}
      };
      //const fileTransfer = new Transfer();
      const transferObj: TransferObject = this.transfer.create();

      transferObj.upload( this.imagePath,'http://node.bizmoapps.com:4500/change_profile_picture',options)
      .then((data) => {
        let user_data = JSON.parse(data.response);
        // alert(JSON.stringify(data.response));
        window.localStorage.setItem("profile_picture", user_data.profile_picture);
          this.user_image= window.localStorage.getItem("profile_picture");
          this.presentToast('Profile Picture uploaded successfully');
          //  this.currentUser = NativeStorage.getItem('currentUser');
          //  alert(this.currentUser);
          this.imagePath = '';
          this.imageChosen = 0;
          loader.dismiss();
        }, (err) => {
        // alert(JSON.stringify(err));
          loader.dismiss();
        });
          }
      
    }
    chooseImage() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Choose Picture Source',
        buttons: [
          {
            text: 'Gallery',
            icon: 'albums',
            handler: () => {
              this.actionHandler(1);
            }
          },
          {
            text: 'Camera',
            icon: 'camera',
            handler: () => {
              this.actionHandler(2);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
  
      actionSheet.present();
    }
    // }
    actionHandler(selection: any) {
      var options: any;
      if (selection == 1) {
        options = {
          quality: 75,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
        };
      } else {
        options = {
          quality: 75,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
        };
      }
  
      Camera.getPicture(options).then((imgUrl) => {
          this.user_image= imgUrl;
          this.imagePath = imgUrl;
          //  alert(this.imagePath);
        var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
        var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
        sourceFileName = sourceFileName.split('?').shift();
        File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
          this.imagePath = imgUrl;
        
          // alert(this.imagePath);
          this.imageChosen = 1;

          this.imageNewPath = result.nativeURL;
          // this.uploadPhoto();
          // alert(this.imageNewPath);
        }, (err) => {
          // alert(JSON.stringify(err));
        })
  
      }, (err) => {
        // alert(JSON.stringify(err))
      });
  
    }
    editEmail() {
      this.emailDis = false;
    }
    ngOnInit() {
    }
    showLoading() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
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
    changePass() {
      this.showLoading();
      this.user.changePassword(this.passwordDetails, this.currentUser.user_id).subscribe(success => {
          
        if (success.status == 1) {
          this.loading.dismiss();
          console.log(success);
          this.presentToast(success.statusinfo);
          this.navCtrl.push(SettingsPage);
        } else {
          this.loading.dismiss();
          console.log(success);
          this.presentToast(success.statusinfo);
        }
      },
        error => {
          this.loading.dismiss();
          console.log(error);
        });
    }
    getLatLng(){
        if( this.profileDetails.zipcode){
        this.mainService.get_lat_long(this.profileDetails.zipcode).subscribe(success => {
          this.lat = success.results[0].geometry.location.lat;
          this.lng = success.results[0].geometry.location.lng;
          this.updateProfile();
        },
        error => {
          //this.loading.dismiss();
          console.log( error);
        });
      }else{
        this.updateProfile();
      }
    }
    updateProfile() {
      this.showLoading();
      this.user.updateProfile(this.profileDetails, this.currentUser.user_id, this.userPreference,this.lat,this.lng).subscribe(success => {
        console.log(success);
        if (success.status == 1) {
          this.loading.dismiss();
          console.log(success);

          NativeStorage.setItem('Currentuser',{
      
            zipcode:success.data[0].zipcode

          });
          this.presentToast('Profile updated successfully');
          this.events.publish('user:created', success.data[0]);
          this.navCtrl.push(SettingsPage);
        } else {
          this.loading.dismiss();
          console.log(success);
          this.presentToast('Something went wrong please try again');
        }
      },
        error => {
          this.loading.dismiss();
          console.log(error);
        });
    }
    saveUserSettings() {
      this.showLoading();
      this.user.updatePushNotification(this.is_my_shoot_score, this.is_my_favourite, 
        this.is_club_located_near_me, this.is_club_located_near_me,
        this.currentUser.user_id,this.frequency_four,this.frequency_ten,this.frequency_seventeen,this.frequency_twentyfour).subscribe(success => {
        console.log(success);
        if (success.status == 1) {
          this.loading.dismiss();
          console.log(success.data);
          this.presentToast('Notification Settings Updated');
          this.navCtrl.push(SettingsPage);
          //this.events.publish('user:created', success.data[0]);
          //this.navCtrl.push(SettingsPage);
        } else {
          this.loading.dismiss();
          console.log(success);
          this.presentToast('Something went wrong');
        }
      },
        error => {
          this.loading.dismiss();
          console.log(error);
        });
    }
    forgetPassword() {
      console.log(this.forgetUser);

      //this.showLoading();
      this.user.forgetPassword(this.forgetUser).subscribe(success => {
        console.log(success);
        /*if(success.status == 1){
          this.loading.dismiss();
          console.log(success.data);
          this.presentToast('Notification Settings Updated');
          //this.events.publish('user:created', success.data[0]);
          //this.navCtrl.push(SettingsPage);
        }else{
          this.loading.dismiss();
          console.log(success);
          this.presentToast('Something went wrong');
        }*/
      },
        error => {
          this.loading.dismiss();
          console.log(error);
        });

    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad SettingsSubPage');
    }
    ionViewWillEnter() {
      //this.viewCtrl.showBackButton(false);
      this.viewCtrl.setBackButtonText('');
    }
    getClass() {
      this.mainService.getClass().subscribe(success => {
        if (success.status == 1) {
          console.log(success);
          this.allClass = success.data;

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
          console.log(success);
          this.allEarnedYardage = success.data;

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
          console.log(success);
          this.allCategory = success.data;

        } else {
          console.log(success);

        }
      },
        error => {
          console.log(error);
        });
    }
    saveUserPreference() {
      console.log(this.userPreference);
      this.showLoading();
      this.mainService.save_user_settings(this.currentUser.user_id, this.userPreference).subscribe(success => {
        console.log(success);
        if (success.status == 1) {
          console.log(success);
          this.loading.dismiss();
          //console.log(success);
          this.presentToast('Saved Successfully');

        } else {
          this.loading.dismiss();
          this.presentToast('Please try again!');
        }
      },
        error => {
          this.loading.dismiss();
          console.log(error);
        });
    }
    changePushSettings() {
      if (this.is_my_shoot_score1==true) {
        this.is_my_shoot_score = '1';
      } else {
        this.is_my_shoot_score = '0';
      }
      if (this.is_my_favourite1==true) {
        this.is_my_favourite = '1';
      } else {
        this.is_my_favourite = '0';
      }
      if (this.frequency_four1==true) {
        this.frequency_four = '1';
      } else {
        this.frequency_four = '0';
      }
      if (this.frequency_ten1==true) {
        this.frequency_ten = '1';
      } else {
        this.frequency_ten = '0';
      }

      if (this.frequency_seventeen1==true) {
        this.frequency_seventeen = '1';
      } else {
        this.frequency_seventeen = '0';
      }
      if (this.frequency_twentyfour1==true) {
        this.frequency_twentyfour = '1';
      } else {
        this.frequency_twentyfour = '0';
      }

      if (this.location == false) {
        this.is_club_located_near_me = 0;
      }
      console.log(this.location);
      this.saveUserSettings();
    }
    changeEmailSettings() {

      if (this.is_my_shoot_score11==true) {
        this.is_my_shoot_score = '1';
      } else {
        this.is_my_shoot_score = '0';
      }
      if (this.is_my_favourite11==true) {
        this.is_my_favourite = '1';
      } else {
        this.is_my_favourite = '0';
      }
      if (this.email_frequency_four==true) {
        this.frequency_four = '1';
      } else {
        this.frequency_four = '0';
      }
      if (this.email_frequency_ten==true) {
        this.frequency_ten = '1';
      } else {
        this.frequency_ten = '0';
      }

      if (this.email_frequency_seventeen==true) {
        this.frequency_seventeen = '1';
      } else {
        this.frequency_seventeen = '0';
      }
      if (this.email_frequency_twentyfour==true) {
        this.frequency_twentyfour = '1';
      } else {
        this.frequency_twentyfour = '0';
      }

      if (this.locations == false) {
        this.club_located_near_me = 0;
      }
      this.showLoading();
      this.user.updateEmailhNotification(this.is_my_shoot_score, this.is_my_favourite, 
        this.club_located_near_me, this.frequency,
        this.currentUser.user_id,this.frequency_four,this.frequency_ten,this.frequency_seventeen,this.frequency_twentyfour).subscribe(success => {
        if (success.status == 1) {
          this.loading.dismiss();
          console.log(success.data);
          this.presentToast('Email Notification Settings Updated');
          this.navCtrl.push(SettingsPage);
        } else {
          this.loading.dismiss();
          console.log(success);
          this.presentToast('Something went wrong');
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
            
              this.is_club_located_near_me=this.userSettings.is_club_located_near_me;
              console.log( this.is_club_located_near_me);
              if(this.userSettings.is_club_located_near_me == '0'||this.userSettings.is_club_located_near_me == ''||this.userSettings.is_club_located_near_me == undefined){
                  this.location = false;
              }else{
                  this.location = true;
              }
            if (this.userSettings.is_my_shoot_score == '0') {
              this.is_my_shoot_score1 = false;
            } else {
              this.is_my_shoot_score1 = true;
            }
            if (this.userSettings.is_my_favourite == '0') {
              this.is_my_favourite1 = false;
            } else {
              this.is_my_favourite1 = true;
            }
            if (this.userSettings.frequency_four == '1') {
              this.frequency_four1 = true;
            } else {
              this.frequency_four1 = false;
            }
            if (this.userSettings.frequency_ten == '1') {
              this.frequency_ten1 = true;
            } else {
              this.frequency_ten1 = false;
            }
            if (this.userSettings.frequency_seventeen == '1') {
              this.frequency_seventeen1 = true;
            } else {
              this.frequency_seventeen1 = false;
            }

            if (this.userSettings.frequency_twentyfour == '1') {
              this.frequency_twentyfour1 = true;
            } else {
              this.frequency_twentyfour1 = false;
            }
          
          //alert(this.userSettings);
          if (this.userSettings != undefined) {
            this.userPreference.ata_single = this.userSettings.ata_single;
            this.userPreference.ata_double = this.userSettings.ata_double;
            this.userPreference.ata_handicap = this.userSettings.ata_handicap;
            this.userPreference.ata_category = this.userSettings.ata_category;
            this.userPreference.pita_single = this.userSettings.pita_single;
            this.userPreference.pita_double = this.userSettings.pita_double;
            this.userPreference.pita_handicap = this.userSettings.pita_handicap;
            this.userPreference.pita_category = this.userSettings.pita_category;
            // this.is_my_shoot_score = this.userSettings.is_my_shoot_score;
            // this.is_my_favourite = this.userSettings.is_my_favourite;
            // this.is_club_located_near_me = this.userSettings.is_club_located_near_me;
            // this.frequency = this.userSettings.frequency;
            
          }
        } else {
          console.log(success);
        }
      },
        error => {
          console.log(error);
        });
    }
    get_email_settings() {
      this.mainService.get_email_settings(this.currentUser.user_id).subscribe(success => {
        if (success.status == 1) {
          this.emailSetting = success.data[0];
            console.log( this.emailSetting );
            if(this.emailSetting.email_is_club_located_near_me == '0'||this.emailSetting.email_is_club_located_near_me == ''||this.emailSetting.email_is_club_located_near_me == undefined){
                  this.locations = false;
                  this.club_located_near_me=0
              }else{
                  this.locations = true;
                  this.club_located_near_me=this.emailSetting.email_is_club_located_near_me;
              }
            if (this.emailSetting.email_is_my_shoot_score == '0') {
              this.is_my_shoot_score11 = false;
            } else {
              this.is_my_shoot_score11 = true;
            }
            if (this.emailSetting.email_is_my_favourite == '0') {
              this.is_my_favourite11 = false;
            } else {
              this.is_my_favourite11 = true;
            }
            if (this.emailSetting.email_frequency_four == '1') {
              this.email_frequency_four = true;
            } else {
              this.email_frequency_four = false;
            }
            if (this.emailSetting.email_frequency_ten == '1') {
              this.email_frequency_ten = true;
            } else {
              this.email_frequency_ten = false;
            }
            if (this.emailSetting.email_frequency_seventeen == '1') {
              this.email_frequency_seventeen = true;
            } else {
              this.email_frequency_seventeen = false;
            }

            if (this.emailSetting.email_frequency_twentyfour == '1') {
              this.email_frequency_twentyfour = true;
            } else {
              this.email_frequency_twentyfour = false;
            }
          
          }
    
        },
        error => {
          console.log(error);
        });
    }
  }
