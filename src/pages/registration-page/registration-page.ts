import { Component } from '@angular/core';
import { NavController,PopoverController, NavParams , AlertController , LoadingController, Loading , Events ,Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NewLoginPage } from '../new-login/new-login';
import { Geolocation } from 'ionic-native';
//import { IntroSliderPage } from '../intro-slider/intro-slider';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { MainService } from '../../providers/main-service';

/*
  Generated class for the RegistrationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var device: any;
@Component({
  selector: 'page-registration-page',
  templateUrl: 'registration-page.html'
})
export class RegistrationPagePage {

  createSuccess = false;
  loading: Loading;
  passwordR:any;
  checkpass:any=false;
  checkEmail:any=false;
  checkpasss:any=false;
  userid:any;
  lat : number;
  lng : number;
  registerCredentials = {email: '', password: '',terms:false};
  deviceDetails = { model : '', deviceID : '', deviceVersion : '' , platform : '' , imei_no : ''};

  constructor( public popoverCtrl: PopoverController,public navParams: NavParams ,   private mainService: MainService,private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController , private loadingCtrl: LoadingController, public events: Events, public platform: Platform) {

    this.initializeApp();
  }
 presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(LoginPage);
    popover.present({
      ev: myEvent
    });
  }
  termsAndroid(){
       let alert = this.alertCtrl.create({
         title:'Terms of Service & Privacy Policy',
        message: `The trap app is licensed, not sold, to you for use only under the terms of this license. The
Licensor the trap app, llc (“application provider”) reserves all rights not expressly granted
To you. The product that is subject to this license is referred to in this license as the “licensed
Application.” your continued use of the licensed application indicates on-going agreement to
Be bound by the terms of this agreement.
A. Scope of license: this license granted to you for the licensed application by application
Provider is limited to a non-transferable license to use the licensed application on any android
Device that you own or control. This license does not allow you to use the licensed application
On any device that you do not own or control, and you may not distribute or make the licensed
Application available over a network where it could be used by multiple devices at the same
Time. You may not rent, lease, lend, sell, redistribute or sublicense the licensed application. You
May not copy (except as expressly permitted by this license), decompile, reverse engineer,
Disassemble, attempt to derive the source code of, modify, or create derivative works of the
Licensed application, any updates, or any part thereof (except as and only to the extent any
Foregoing restriction is prohibited by applicable law or to the extent as may be permitted by the
Licensing terms governing use of any open sourced components included with the licensed
Application). Any attempt to do so is a violation of the rights of the application provider and its
Licensors. If you breach this restriction, you may be subject to prosecution and damages. The
Terms of the license will govern any upgrades provided by application provider that replace
And/or supplement the original product, unless such upgrade is accompanied by a separate
License in which case the terms of that license will govern.
B. Consent to use of data: you agree that application provider may collect and use technical
Data and non-personal information (“td/npi”), including but not limited to technical
Information about your device, system and application software, and peripherals, that is gathered
Periodically to facilitate the provision of improvements, software updates, product support and
Other services to you (if any) related to the licensed application. Application provider may use
This td/npi for any purpose, as long as it is in a form that does not personally identify you, to
Improve its products or to provide to you services (including targeted and/or non-targeted
Advertising) or technologies. The following are some non-limiting examples of non-personal
Information that may be collected and how it may be used:
information may be collected such as occupation, language, zip code, area code, unique
Device identifier, referrer url, location, and the time zone so that customer behavior
When using the licensed application may be better understood and so as to improve
Products, services, and advertising.
 collected td/npi may be aggregated and used to help application provider provide
More useful information to you and to understand which parts of application provider’s
Products, services (including advertising) and website are of most interest. Aggregated
Data also is considered td/npi for the purposes of this agreement.
C. Termination. The license is effective until terminated by you or application provider. Your
Rights under this license will terminate automatically without notice from the application
Provider if you fail to comply with any term(s) of this license. Upon termination of the license,
You shall cease all use of the licensed application, and destroy all copies, full or partial, of the
Licensed application.
D. Services; third party materials. The licensed application may enable access to application
Provider’s and third party services and web sites (collectively and individually, &quot;services&quot;). Use
Of the services may require internet access and that you accept additional terms of service.
You understand that by using any of the services, you may encounter content that may be
Deemed offensive, indecent, or objectionable, which content may or may not be identified as
Having explicit language, and that the results of any search or entering of a particular url may
Automatically and unintentionally generate links or references to objectionable material.
Nevertheless, you agree to use the services at your sole risk and that the application provider
Shall not have any liability to you for content that may be found to be offensive, indecent, or
Objectionable.
Certain services may display, include or make available content, data, information, applications
Or materials from third parties (“third party materials”) or provide links to certain third party
Web sites. By using the services, you acknowledge and agree that the application provider is
Not responsible for examining or evaluating the content, accuracy, completeness, timeliness,
Validity, copyright compliance, legality, decency, quality or any other aspect of such third party
Materials or web sites. The application provider does not warrant or endorse and does not
Assume and will not have any liability or responsibility to you or any other person for any third-
Party services, third party materials or web sites, or for any other materials, products, or
Services of third parties. Third party materials and links to other web sites are provided solely as
A convenience to you. Financial information displayed by any services is for general
Informational purposes only and is not intended to be relied upon as investment advice. Before
Executing any securities transaction based upon information obtained through the services, you
Should consult with a financial professional. Location data provided by any services is for basic
Navigational purposes only and is not intended to be relied upon in situations where precise
Location information is needed or where erroneous, inaccurate or incomplete location data may
Lead to death, personal injury, property or environmental damage. Neither the application
Provider, nor any of its content providers, guarantees the availability, accuracy, completeness,
Reliability, or timeliness of stock information or location data displayed by any services.
You agree that any services contain proprietary content, information and material that is
Protected by applicable intellectual property and other laws, including but not limited to
Copyright, and that you will not use such proprietary content, information or materials in any
Way whatsoever except for permitted use of the services. No portion of the services may be
Reproduced in any form or by any means. You agree not to modify, rent, lease, loan, sell,
Distribute, or create derivative works based on the services, in any manner, and you shall not
Exploit the services in any unauthorized way whatsoever, including but not limited to, by
Trespass or burdening network capacity. You further agree not to use the services in any manner
To harass, abuse, stalk, threaten, defame or otherwise infringe or violate the rights of any other
Party, and that the application provider is not in any way responsible for any such use by you,

Nor for any harassing, threatening, defamatory, offensive or illegal messages or transmissions
That you may receive as a result of using any of the services.
In addition, third party services and third party materials that may be accessed from, displayed
On or linked to from the android device are not available in all languages or in all countries. The
Application provider makes no representation that such services and materials are appropriate or
Available for use in any particular location. To the extent you choose to access such services or
Materials, you do so at your own initiative and are responsible for compliance with any
Applicable laws, including but not limited to applicable local laws. The application provider, and
Its licensors, reserve the right to change, suspend, remove, or disable access to any services at
Any time without notice. In no event will the application provider be liable for the removal of or
Disabling of access to any such services. The application provider may also impose limits on the
Use of or access to certain services, in any case and without notice or liability.
E. No warranty: you expressly acknowledge and agree that use of
The licensed application is at your sole risk and that the entire risk
As to satisfactory quality, performance, accuracy and effort is
With you. To the maximum extent permitted by applicable law, the
Licensed application and any services performed or provided by the
Licensed application (&quot;services&quot;) are provided &quot;as is&quot; and “as
Available”, with all faults and without warranty of any kind, and
Application provider hereby disclaims all warranties and
Conditions with respect to the licensed application and any
Services, either express, implied or statutory, including, but not
Limited to, the implied warranties and/or conditions of
Merchantability, of satisfactory quality, of fitness for a
Particular purpose, of accuracy, of quiet enjoyment, and non-
Infringement of third party rights. Application provider does not
Warrant against interference with your enjoyment of the licensed
Application, that the functions contained in, or services performed
Or provided by, the licensed application will meet your
Requirements, that the operation of the licensed application or
Services will be uninterrupted or error-free, or that defects in the
Licensed application or services will be corrected. No oral or
Written information or advice given by application provider or its
Authorized representative shall create a warranty. Should the
Licensed application or services prove defective, you assume the
Entire cost of all necessary servicing, repair or correction. Some
Jurisdictions do not allow the exclusion of implied warranties or
Limitations on applicable statutory rights of a consumer, so the
Above exclusion and limitations may not apply to you.
F. Limitation of liability. To the extent not prohibited by law, in no event
Shall application provider be liable for personal injury, or any
Incidental, special, indirect or consequential damages whatsoever,
Including, without limitation, damages for loss of profits, loss of

Data, business interruption or any other commercial damages or
Losses, arising out of or related to your use or inability to use the
Licensed application, however caused, regardless of the theory of
Liability (contract, tort or otherwise) and even if application
Provider has been advised of the possibility of such damages. Some
Jurisdictions do not allow the limitation of liability for personal
Injury, or of incidental or consequential damages, so this
Limitation may not apply to you. In no event shall application provider’s total
Liability to you for all damages (other than as may be required by applicable law in cases
Involving personal injury) exceed the amount of fifty dollars ($50.00). The foregoing limitations
Will apply even if the above stated remedy fails of its essential purpose.
G. You may not use or otherwise export or re-export the licensed application except as
Authorized by united states law and the laws of the jurisdiction in which the licensed
Application was obtained. In particular, but without limitation, the licensed application may not
Be exported or re-exported (a) into any u.S. Embargoed countries or (b) to anyone on the u.S.
Treasury department&#39;s list of specially designated nationals or the u.S. Department of
Commerce denied person’s list or entity list. By using the licensed application, you represent
And warrant that you are not located in any such country or on any such list. You also agree that
You will not use these products for any purposes prohibited by united states law, including,
Without limitation, the development, design, manufacture or production of nuclear, missiles, or
Chemical or biological weapons.
H. The licensed application and related documentation are &quot;commercial items&quot;, as that term is
Defined at 48 c.F.R. §2.101, consisting of &quot;commercial computer software&quot; and &quot;commercial
Computer software documentation&quot;, as such terms are used in 48 c.F.R. §12.212 or 48 c.F.R.
§227.7202, as applicable. Consistent with 48 c.F.R. §12.212 or 48 c.F.R. §227.7202-1 through
227.7202-4, as applicable, the commercial computer software and commercial computer
Software documentation are being licensed to u.S. Government end users (a) only as
Commercial items and (b) with only those rights as are granted to all other end users pursuant to
The terms and conditions herein. Unpublished-rights reserved under the copyright laws of the
United states.
I. The laws of the commonwealth of virginia, excluding its conflicts of law rules, govern this
License and your use of the licensed application. Your use of the licensed application may also
Be subject to other local, state, national, or international laws.`,
      
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
    termsIos(){
       let alert = this.alertCtrl.create({
         title:'Terms of Service & Privacy Policy',
        message: `The Trap App Is Licensed, Not Sold, To You For Use Only Under The Terms Of This License. The
Licensor, The Trap App, Llc (“application Provider”) Reserves All Rights Not Expressly Granted
To You. The Product That Is Subject To This License Is Referred To In This License As The “licensed
Application.” Your Continued Use Of The Licensed Application Indicates On-going Agreement To
Be Bound By The Terms Of This Agreement.
A. Scope Of License: This License Granted To You For The Licensed Application By Application
Provider Is Limited To A Non-transferable License To Use The Licensed Application On Any Iphone,
Ipad Or Ipod Touch That You Own Or Control And As Permitted By The Usage Rules Set Forth In
Section 9.b. Of The App Store Terms And Conditions (The “usage Rules”). This License Does Not
Allow You To Use The Licensed Application On Any Iphone, Ipad Or Ipod Touch That You Do Not
Own Or Control, And You May Not Distribute Or Make The Licensed Application Available Over A
Network Where It Could Be Used By Multiple Devices At The Same Time. You May Not Rent, Lease,
Lend, Sell, Redistribute Or Sublicense The Licensed Application. You May Not Copy (Except As
Expressly Permitted By This License And The Usage Rules), Decompile, Reverse Engineer,
Disassemble, Attempt To Derive The Source Code Of, Modify, Or Create Derivative Works Of The
Licensed Application, Any Updates, Or Any Part Thereof (Except As And Only To The Extent Any
Foregoing Restriction Is Prohibited By Applicable Law Or To The Extent As May Be Permitted By The
Licensing Terms Governing Use Of Any Open Sourced Components Included With The Licensed
Application). Any Attempt To Do So Is A Violation Of The Rights Of The Application Provider And Its
Licensors. If You Breach This Restriction, You May Be Subject To Prosecution And Damages. The
Terms Of The License Will Govern Any Upgrades Provided By Application Provider That Replace
And/or Supplement The Original Product, Unless Such Upgrade Is Accompanied By A Separate
License In Which Case The Terms Of That License Will Govern.
B. Consent To Use Of Data: You Agree That Application Provider May Collect And Use Technical
Data And Non-personal Information (“td/npi”), Including But Not Limited To Technical
Information About Your Device, System And Application Software, And Peripherals, That Is Gathered
Periodically To Facilitate The Provision Of Improvements, Software Updates, Product Support And
Other Services To You (If Any) Related To The Licensed Application. Application Provider May Use
This Td/npi For Any Purpose, As Long As It Is In A Form That Does Not Personally Identify You, To
Improve Its Products Or To Provide To You Services (Including Targeted And/or Non-targeted
Advertising) Or Technologies. The Following Are Some Non-limiting Examples Of Non-personal
Information That May Be Collected And How It May Be Used:
1.information May Be Collected Such As Occupation, Language, Zip Code, Area Code, Unique
Device Identifier, Referrer Url, Location, And The Time Zone So That Customer Behavior
When Using The Licensed Application May Be Better Understood And So As To Improve
Products, Services, And Advertising.
2.collected Td/npi May Be Aggregated And Used To Help Application Provider Provide
More Useful Information To You And To Understand Which Parts Of Application Provider’s
Products, Services (Including Advertising) And Website Are Of Most Interest. Aggregated
Data Also Is Considered Td/npi For The Purposes Of This Agreement.
C. Termination. The License Is Effective Until Terminated By You Or Application Provider. Your
Rights Under This License Will Terminate Automatically Without Notice From The Application
Provider If You Fail To Comply With Any Term(S) Of This License. Upon Termination Of The License,
You Shall Cease All Use Of The Licensed Application, And Destroy All Copies, Full Or Partial, Of The
Licensed Application.
D. Services; Third Party Materials. The Licensed Application May Enable Access To Application
Provider’s And Third Party Services And Web Sites (Collectively And Individually, &quot;services&quot;). Use
Of The Services May Require Internet Access And That You Accept Additional Terms Of Service.
You Understand That By Using Any Of The Services, You May Encounter Content That May Be
Deemed Offensive, Indecent, Or Objectionable, Which Content May Or May Not Be Identified As
Having Explicit Language, And That The Results Of Any Search Or Entering Of A Particular Url May
Automatically And Unintentionally Generate Links Or References To Objectionable Material.
Nevertheless, You Agree To Use The Services At Your Sole Risk And That The Application Provider
Shall Not Have Any Liability To You For Content That May Be Found To Be Offensive, Indecent, Or
Objectionable.
Certain Services May Display, Include Or Make Available Content, Data, Information, Applications
Or Materials From Third Parties (“third Party Materials”) Or Provide Links To Certain Third Party
Web Sites. By Using The Services, You Acknowledge And Agree That The Application Provider Is
Not Responsible For Examining Or Evaluating The Content, Accuracy, Completeness, Timeliness,
Validity, Copyright Compliance, Legality, Decency, Quality Or Any Other Aspect Of Such Third Party
Materials Or Web Sites. The Application Provider Does Not Warrant Or Endorse And Does Not
Assume And Will Not Have Any Liability Or Responsibility To You Or Any Other Person For Any Third-
Party Services, Third Party Materials Or Web Sites, Or For Any Other Materials, Products, Or
Services Of Third Parties. Third Party Materials And Links To Other Web Sites Are Provided Solely As
A Convenience To You. Financial Information Displayed By Any Services Is For General
Informational Purposes Only And Is Not Intended To Be Relied Upon As Investment Advice. Before
Executing Any Securities Transaction Based Upon Information Obtained Through The Services, You
Should Consult With A Financial Professional. Location Data Provided By Any Services Is For Basic
Navigational Purposes Only And Is Not Intended To Be Relied Upon In Situations Where Precise
Location Information Is Needed Or Where Erroneous, Inaccurate Or Incomplete Location Data May
Lead To Death, Personal Injury, Property Or Environmental Damage. Neither The Application
Provider, Nor Any Of Its Content Providers, Guarantees The Availability, Accuracy, Completeness,
Reliability, Or Timeliness Of Stock Information Or Location Data Displayed By Any Services.
You Agree That Any Services Contain Proprietary Content, Information And Material That Is
Protected By Applicable Intellectual Property And Other Laws, Including But Not Limited To
Copyright, And That You Will Not Use Such Proprietary Content, Information Or Materials In Any
Way Whatsoever Except For Permitted Use Of The Services. No Portion Of The Services May Be
Reproduced In Any Form Or By Any Means. You Agree Not To Modify, Rent, Lease, Loan, Sell,
Distribute, Or Create Derivative Works Based On The Services, In Any Manner, And You Shall Not
Exploit The Services In Any Unauthorized Way Whatsoever, Including But Not Limited To, By
Trespass Or Burdening Network Capacity. You Further Agree Not To Use The Services In Any Manner
To Harass, Abuse, Stalk, Threaten, Defame Or Otherwise Infringe Or Violate The Rights Of Any Other
Party, And That The Application Provider Is Not In Any Way Responsible For Any Such Use By You,
Nor For Any Harassing, Threatening, Defamatory, Offensive Or Illegal Messages Or Transmissions
That You May Receive As A Result Of Using Any Of The Services.
In Addition, Third Party Services And Third Party Materials That May Be Accessed From, Displayed
On Or Linked To From The Iphone, Ipad Or Ipod Touch Are Not Available In All Languages Or In All
Countries. The Application Provider Makes No Representation That Such Services And Materials
Are Appropriate Or Available For Use In Any Particular Location. To The Extent You Choose To Access
Such Services Or Materials, You Do So At Your Own Initiative And Are Responsible For Compliance
With Any Applicable Laws, Including But Not Limited To Applicable Local Laws. The Application
Provider, And Its Licensors, Reserve The Right To Change, Suspend, Remove, Or Disable Access To Any
Services At Any Time Without Notice. In No Event Will The Application Provider Be Liable For The
Removal Of Or Disabling Of Access To Any Such Services. The Application Provider May Also
Impose Limits On The Use Of Or Access To Certain Services, In Any Case And Without Notice Or
Liability.
E. No Warranty: You Expressly Acknowledge And Agree That Use Of
The Licensed Application Is At Your Sole Risk And That The Entire Risk
As To Satisfactory Quality, Performance, Accuracy And Effort Is
With You. To The Maximum Extent Permitted By Applicable Law, The
Licensed Application And Any Services Performed Or Provided By The
Licensed Application (&quot;services&quot;) Are Provided &quot;as Is&quot; And “as
Available”, With All Faults And Without Warranty Of Any Kind, And
Application Provider Hereby Disclaims All Warranties And
Conditions With Respect To The Licensed Application And Any
Services, Either Express, Implied Or Statutory, Including, But Not
Limited To, The Implied Warranties And/or Conditions Of
Merchantability, Of Satisfactory Quality, Of Fitness For A
Particular Purpose, Of Accuracy, Of Quiet Enjoyment, And Non-
Infringement Of Third Party Rights. Application Provider Does Not
Warrant Against Interference With Your Enjoyment Of The Licensed
Application, That The Functions Contained In, Or Services Performed
Or Provided By, The Licensed Application Will Meet Your
Requirements, That The Operation Of The Licensed Application Or
Services Will Be Uninterrupted Or Error-free, Or That Defects In The
Licensed Application Or Services Will Be Corrected. No Oral Or
Written Information Or Advice Given By Application Provider Or Its
Authorized Representative Shall Create A Warranty. Should The
Licensed Application Or Services Prove Defective, You Assume The
Entire Cost Of All Necessary Servicing, Repair Or Correction. Some
Jurisdictions Do Not Allow The Exclusion Of Implied Warranties Or
Limitations On Applicable Statutory Rights Of A Consumer, So The
Above Exclusion And Limitations May Not Apply To You.
F. Limitation Of Liability. To The Extent Not Prohibited By Law, In No Event
Shall Application Provider Be Liable For Personal Injury, Or Any
Incidental, Special, Indirect Or Consequential Damages Whatsoever,
Including, Without Limitation, Damages For Loss Of Profits, Loss Of
Data, Business Interruption Or Any Other Commercial Damages Or
Losses, Arising Out Of Or Related To Your Use Or Inability To Use The
Licensed Application, However Caused, Regardless Of The Theory Of
Liability (Contract, Tort Or Otherwise) And Even If Application
Provider Has Been Advised Of The Possibility Of Such Damages. Some
Jurisdictions Do Not Allow The Limitation Of Liability For Personal
Injury, Or Of Incidental Or Consequential Damages, So This
Limitation May Not Apply To You. In No Event Shall Application Provider’s Total
Liability To You For All Damages (Other Than As May Be Required By Applicable Law In Cases
Involving Personal Injury) Exceed The Amount Of Fifty Dollars ($50.00). The Foregoing Limitations
Will Apply Even If The Above Stated Remedy Fails Of Its Essential Purpose.
G. You May Not Use Or Otherwise Export Or Re-export The Licensed Application Except As
Authorized By United States Law And The Laws Of The Jurisdiction In Which The Licensed
Application Was Obtained. In Particular, But Without Limitation, The Licensed Application May Not
Be Exported Or Re-exported (A) Into Any U.s. Embargoed Countries Or (B) To Anyone On The U.s.
Treasury Department&#39;s List Of Specially Designated Nationals Or The U.s. Department Of
Commerce Denied Person’s List Or Entity List. By Using The Licensed Application, You Represent
And Warrant That You Are Not Located In Any Such Country Or On Any Such List. You Also Agree That
You Will Not Use These Products For Any Purposes Prohibited By United States Law, Including,
Without Limitation, The Development, Design, Manufacture Or Production Of Nuclear, Missiles, Or
Chemical Or Biological Weapons.
H. The Licensed Application And Related Documentation Are &quot;commercial Items&quot;, As That Term Is
Defined At 48 C.f.r. §2.101, Consisting Of &quot;commercial Computer Software&quot; And &quot;commercial
Computer Software Documentation&quot;, As Such Terms Are Used In 48 C.f.r. §12.212 Or 48 C.f.r.
§227.7202, As Applicable. Consistent With 48 C.f.r. §12.212 Or 48 C.f.r. §227.7202-1 Through
227.7202-4, As Applicable, The Commercial Computer Software And Commercial Computer
Software Documentation Are Being Licensed To U.s. Government End Users (A) Only As
Commercial Items And (B) With Only Those Rights As Are Granted To All Other End Users Pursuant To
The Terms And Conditions Herein. Unpublished-rights Reserved Under The Copyright Laws Of The
United States.
I. The Laws Of The Commonwealth Of Virginia, Excluding Its Conflicts Of Law Rules, Govern This
License And Your Use Of The Licensed Application. Your Use Of The Licensed Application May Also
Be Subject To Other Local, State, National, Or International Laws.`,
      
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
onChange(){
  console.log(this.registerCredentials.password);
    console.log(this.passwordR);
 if(this.registerCredentials.password == this.passwordR){
     
      this.checkpass=false;
    }else{
       this.checkpass=true;
    }
}
  initializeApp(){
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.deviceDetails.model = device.model;
        this.deviceDetails.deviceID = window.localStorage.getItem("deviceToken");
        this.deviceDetails.deviceVersion = device.version;
        this.deviceDetails.platform = device.platform;
        this.deviceDetails.imei_no = device.uuid;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPagePage');
            Geolocation.getCurrentPosition().then((resp) => {
    //  alert('Lat :'+resp.coords.latitude);
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    
      
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  openLoginPage() {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    this.navCtrl.setRoot(LoginPage);
  }
  openDashboardPage() {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    this.navCtrl.setRoot(DashboardPage);
  }
pushFb(){
   this.navCtrl.push(NewLoginPage);
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
  
 Email(username){
let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!mailFormat.test(username)){
        // return this.errorMsg('Please enter valid email');
         this.checkEmail=true;
      }else{
         this.checkEmail=false;
      }
}
onChangepass(){
  if(this.registerCredentials.password.length <= 5){
      this.checkpasss=true;
     
    }else{
        this.checkpasss=false;
    }
}
  public register(register) {
    debugger;
    this.initializeApp();
      let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!mailFormat.test(register.username)){
        return this.errorMsg(      'Please enter valid email');
      }
      if(register.terms==false){
          return this.errorMsg('Please accept terms & condition');
      }
    if(this.registerCredentials.password.length <=5){
     
      return this.errorMsg('Password must be 6 digit length!');
    }
    if(this.registerCredentials.password != this.passwordR){
     
    return this.errorMsg("Confirm Password didn't match!");
    }
     if(register.username==null||register.username==undefined||register.username==''){
     
      return this.errorMsg('Please fill the all field');
    }
    this.showLoading();
    debugger;
    this.auth.register(this.registerCredentials).subscribe(success => {
      debugger
       window.localStorage.removeItem("profile_picture");
       console.log(success);
      if(success.status == 1){
        //console.log(success.data[0]);
        this.loading.dismiss();
        console.log(success);
        //window.localStorage.removeItem("AddScore");
        this.events.publish('user:created', success.data[0]);
         this.userid=success.data[0].user_id;
       this.navCtrl.setRoot(DashboardPage);
        //console.log(success);
        this.getSession();
      }else{
        console.log(success.statusinfo);
        this.loading.dismiss();
        this.showPopup(success.statusinfo);
      }

    },
    error => {
      this.loading.dismiss();
      this.showPopup( error);
    });
  }
getSession(){
 this.mainService.daily_sessions_login(this.userid, this.lat, this.lng).subscribe(success => {
    console.log(success);
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
             this.navCtrl.setRoot(DashboardPage);
           }
         }
       }
     ]
    });
    alert.present();
  }

}