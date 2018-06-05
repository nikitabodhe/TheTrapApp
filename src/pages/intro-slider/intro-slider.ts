import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,Slides } from 'ionic-angular';
import { NewLoginPage } from '../new-login/new-login';
//import { DashboardPage } from '../dashboard/dashboard';
/*
  Generated class for the IntroSlider page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html'
})
export class IntroSliderPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroSliderPage');
    window.localStorage.setItem("IntroScreen", 'loaded');
  }

  ionSlideNextEnd(){
  	alert('hi');
  }

  slideChanged() { alert('hello');
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }

  gotoNewLogin(){
  	this.navCtrl.setRoot(NewLoginPage);
  }

}
