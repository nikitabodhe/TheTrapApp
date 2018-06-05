import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from './app-settings';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  appSettings : AppSettings;
  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  public changePassword(credentials, user_id) { 

        var json = JSON.stringify({ user_id : user_id, oldpassword: credentials.currentPass , password :credentials.newPassword ,  confirmpassword: credentials.confirmPassword });
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_ENDPOINT+"changepassword", json, options)
        .map(data => data.json());
  }

  public updateProfile(credentials, user_id , settings,lat,lng){
          var json = JSON.stringify({ user_id : user_id, name: credentials.name ,emailid:credentials.email, 
            zipcode:credentials.zipcode,lat:lat,lng:lng,
            ata_single : settings.ata_single , ata_double : settings.ata_double , ata_handicap : settings.ata_handicap ,
             ata_category : settings.ata_category , pita_single : settings.pita_single , pita_double : settings.pita_double , 
             pita_handicap : settings.pita_handicap , pita_category : settings.pita_category });
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_ENDPOINT+"updateuserprofile", json, options)
        .map(data => data.json());
  }

  public updateProfilePic(user_id, profile_picture){

      var json = JSON.stringify({ user_id : user_id, profile_picture : profile_picture });
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });

        return this.http.post(AppSettings.API_ENDPOINT+"change_profile_picture", json, options)
        .map(data => data.json());

  }

  public updateEmailhNotification(is_my_shoot_score,is_my_favourite,club_located_near_me,
      frequency,user_id,frequency_four,frequency_ten,frequency_seventeen,frequency_twentyfour){
            

        var json = JSON.stringify({ email_is_my_shoot_score : is_my_shoot_score, 
            email_is_my_favourite : is_my_favourite,
             email_is_club_located_near_me : club_located_near_me , 
            frequency : frequency,  user_id : user_id,
            email_frequency_four:frequency_four,
            email_frequency_ten:frequency_ten,
            email_frequency_seventeen:frequency_seventeen,
            email_frequency_twentyfour:frequency_twentyfour});
            console.log(json);
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });

        return this.http.post(AppSettings.API_ENDPOINT+"save_email_notification_settings", json, options)
        .map(data => data.json());
  }
  public updatePushNotification(is_my_shoot_score,is_my_favourite,is_club_located_near_me,
      frequency,user_id,frequency_four,frequency_ten,frequency_seventeen,frequency_twentyfour){
        var json = JSON.stringify({ is_my_shoot_score : is_my_shoot_score, 
            is_my_favourite : is_my_favourite,
             is_club_located_near_me : is_club_located_near_me , 
            frequency : frequency,  user_id : user_id,
                  frequency_four:frequency_four,
            frequency_ten:frequency_ten,
            frequency_seventeen:frequency_seventeen,
            frequency_twentyfour:frequency_twentyfour});
            console.log(json);
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });

        return this.http.post(AppSettings.API_ENDPOINT+"save_notification_settings", json, options)
        .map(data => data.json());
  }
  public get_user_settings(user_id){
        var json = JSON.stringify({ user_id : user_id});
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });

        return this.http.post(AppSettings.API_ENDPOINT+"get_user_settings", json, options)
        .map(data => data.json());

  }

  public forgetPassword(user){

        console.log(user); 

        var json = JSON.stringify({ emailid : user.email });
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });

        return this.http.post(AppSettings.API_ENDPOINT+"api_login/forgotpassword", json, options)
        .map(data => data.json());

  }

}
