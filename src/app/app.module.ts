import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ScreenOrientation  } from '@ionic-native/screen-orientation';
import { NativeStorage } from '@ionic-native/native-storage';
import {Facebook} from '@ionic-native/facebook';
//import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';

import {AtaDetailsPage} from '../pages/ata-details/ata-details';
import {LeagueDetailsPage} from '../pages/league-details/league-details';
import { DashboardPage } from '../pages/dashboard/dashboard';
import{ AddShootsPage } from '../pages/add-shoots/add-shoots';
import{ AddAtaPitaShootPage } from '../pages/add-ata-pita-shoot/add-ata-pita-shoot';
import{ ShootLeaguePage } from '../pages/shoot-league/shoot-league';
import { NoteDetailsPage } from '../pages/note-details/note-details';
import { NotesEditPage } from '../pages/notes-edit/notes-edit';
import { RegistrationPagePage } from '../pages/registration-page/registration-page';

import { MyshootsScoresPage } from '../pages/myshoots-scores/myshoots-scores';
import { FindShootsPage } from '../pages/find-shoots/find-shoots';
import { ShootDetailsPage } from '../pages/shoot-details/shoot-details';
import { ClubNearMePage } from '../pages/club-near-me/club-near-me';
import { ClubDetailsPage } from '../pages/club-details/club-details';
import { MyAveragePage } from '../pages/my-average/my-average';
import { ClassifyMePage } from '../pages/classify-me/classify-me';
import { ClassifyMeDetailsPage } from '../pages/classify-me-details/classify-me-details';
import { MyNotesPage } from '../pages/my-notes/my-notes';
import { MyFavPage } from '../pages/my-fav/my-fav';
import { SettingsPage } from '../pages/settings/settings';
import { Push } from '@ionic-native/push';
import { SettingsSubPage } from '../pages/settings-sub/settings-sub';
import{ AddShootScorePage } from '../pages/add-shoot-score/add-shoot-score';
import{ AddNewShootPage } from '../pages/add-new-shoot/add-new-shoot';
import{ AddNewEventPage } from '../pages/add-new-event/add-new-event';
import{ AddEventOnShootPage } from '../pages/add-event-on-shoot/add-event-on-shoot';
import{ MyShootSummeryPage } from '../pages/my-shoot-summery/my-shoot-summery';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { NewLoginPage } from '../pages/new-login/new-login';
import { ModalPage } from '../pages/modal/modal';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { EventEditPage } from '../pages/event-edit/event-edit';
import{ ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { Search } from '../pipes/search';
import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';
import { MainService } from '../providers/main-service';
import { AppSettings } from '../providers/app-settings';
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Deeplinks } from '@ionic-native/deeplinks';
// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': '02fb8346',
//   },
//   'push': {
//     'sender_id': '553532311039',
//     'pluginConfig': {
//       'ios': {
//        'badge':true,
//         'sound': true,
//         'alert':true,
//         "categories": {
//           "invite": {
//             "yes": {
//               "callback": "app.accept", "title": "Accept", "foreground": true, "destructive": false
//             },
//             "no": {
//               "callback": "app.reject", "title": "Reject", "foreground": true, "destructive": false
//             },
//             "maybe": {
//               "callback": "app.maybe", "title": "Maybe", "foreground": true, "destructive": false
//             }
//           },
//           "delete": {
//             "yes": {
//               "callback": "app.doDelete", "title": "Delete", "foreground": true, "destructive": true
//             },
//             "no": {
//               "callback": "app.cancel", "title": "Cancel", "foreground": true, "destructive": false
//             }
//           }
//         }
        
//       },
//       'android': {
//         'sound': true,
//         'iconColor': '#343434',
        
//       }
//     }
//   }
// };

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegistrationPagePage,
    DashboardPage,
    AddShootsPage,
    AddAtaPitaShootPage,
    ShootLeaguePage,
    AtaDetailsPage,
    LeagueDetailsPage,
    NoteDetailsPage,
    NotesEditPage,
    MyshootsScoresPage,
    FindShootsPage,
    ShootDetailsPage,
    ClubNearMePage,
    ClubDetailsPage,
    MyAveragePage,
    ClassifyMePage,
    ClassifyMeDetailsPage,
    MyNotesPage,
    MyFavPage,
    SettingsPage,
    SettingsSubPage,
    AddShootScorePage,
    AddNewShootPage,
    AddNewEventPage,
    AddEventOnShootPage,
    Search,
    MyShootSummeryPage,
    IntroSliderPage,
    NewLoginPage,
    ModalPage,
    EventDetailsPage,
    EventEditPage,
    ForgetPasswordPage,
    

  ],
  imports: [
    
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Back',
      backButtonIcon: 'arrow-back',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'ios'
    }, {}
    ),
   // CloudModule.forRoot(cloudSettings)
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegistrationPagePage,
    DashboardPage,
    AddShootsPage,
    AddAtaPitaShootPage,
    ShootLeaguePage,
    AtaDetailsPage,
    LeagueDetailsPage,
    NoteDetailsPage,
    NotesEditPage,
    MyshootsScoresPage,
    FindShootsPage,
    ShootDetailsPage,
    ClubNearMePage,
    ClubDetailsPage,
    MyAveragePage,
    ClassifyMePage,
    ClassifyMeDetailsPage,
    MyNotesPage,
    MyFavPage,
    SettingsPage,
    SettingsSubPage,
    AddShootScorePage,
    AddNewShootPage,
    AddNewEventPage,
    AddEventOnShootPage,
    MyShootSummeryPage,
    IntroSliderPage,
    NewLoginPage,
    ModalPage,
    EventDetailsPage,
    EventEditPage,
    ForgetPasswordPage,
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Push,AuthService,UserService,MainService, AppSettings, ScreenOrientation , NativeStorage, Deeplinks,Facebook]
})
export class AppModule {}
