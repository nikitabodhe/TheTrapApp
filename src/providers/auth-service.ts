import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { NativeStorage } from 'ionic-native';
import 'rxjs/add/operator/map';
import { AppSettings } from './app-settings';

export class User {
  name: string;
  email: string;
  appSettings: AppSettings;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()

export class AuthService {
  currentUser: User;
  data: any;
  constructor(public http: Http) {
  }
  public login(credentials) {
    //debugger;
    //console.log(AppSettings.API_ENDPOINT);
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
 var json = JSON.stringify({ login_type : '0',  username: credentials.email, password: credentials.password, device_token: window.localStorage.getItem('token') });
    //console.log(json);  
    // var json = JSON.stringify({
    //     login_type: '0', username: credentials.email, password: credentials.password,
    //     device_token: '$2a$10$kyz2fsEp/psy6PItGnfxgO/LKRjv2RWujvwoZhhOZenu7lGUM2Pt2', device_type: 'Android'
    //   });
      
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(AppSettings.API_ENDPOINT + "api_login", json, options)
        .map(data => data.json());
    }
  }
  
  public register(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      var json = JSON.stringify({ login_type: '0', name: credentials.name, username: credentials.username, password: credentials.password,device_token: window.localStorage.getItem('token')});//
     // console.log(json);
     
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(AppSettings.API_ENDPOINT + "user_register", json, options)
        .map(data => data.json());
    }
  }
  public fbLogin(user) {
    var json = JSON.stringify({ login_type: '1', user_fb_id: user.id, name: user.name, username: user.email, profile_picture: user.picture, device_token: window.localStorage.getItem('token') });
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.API_ENDPOINT + "api_login", json, options)
      .map(data => data.json());
  }
  public getUserInfo(): User {
    return this.currentUser;
  }
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      localStorage.clear();
      observer.next(true);
      observer.complete();
      // NativeStorage.remove('Currentuser');
    });
  }
}
