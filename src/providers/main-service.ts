import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from './app-settings';

@Injectable()
export class MainService {
	appSettings: AppSettings;

	constructor(public http: Http) {
		console.log('Hello MainService Provider');
	}
	public getNearestClub(user_id, lat, lng, distance, search_string,offset) {

		if (search_string == '') {
			search_string = ' ';
		}
		if (lat == '' || lat == undefined || lat == null) {
			lat = '';
			lng = '';
		}
		if (distance == 300) {
			distance = 0;
			// lat='';
			// lng='';	
			search_string = ' ';
		}

		// console.log(lat, lng, distance	, search_string);
		var json = JSON.stringify({ user_id:user_id,lat: lat, lng: lng, distance:distance,search_string:search_string,offset:offset});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/find_club_near_me", json, options)
			.map(data => data.json());

	}

	public getNearestShoots(lat, lng, distance, search_string, user_id,offset) {
		if (lat == undefined) {
			lat = "";
			lng = "";
		}
		if (distance == 300) {
			// lat='';
			// lng=''
			distance = '';
		}
		if (search_string == '') {
			search_string = '';
		}
		//var json = JSON.stringify({ lat : lat, lng : lng , distance : distance , search_string : search_string , user_id : user_id});
		var json = JSON.stringify({ lat: lat, lng: lng, distance: distance, search_string: search_string, user_id: user_id,offset:offset});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_all_shoots", json, options)
			.map(data => data.json());

	}

	public getUpcomingShoots(user_id) {

		var json = JSON.stringify({ user_id: user_id });

		var headers = new Headers();
		headers.append("Accept", 'application/json; charset=utf-8');
		headers.append('Content-Type', 'application/json; charset=utf-8');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_upcoming_shoots", json, options)
			.map(data => data.json());

	}
	public getMyPowerScores(user_id) {

		var json = JSON.stringify({ user_id: user_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_score/my_power_score", json, options)
			.map(data => data.json());

	}

	public category_ranking(user_id) {

		var json = JSON.stringify({ user_id: user_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_score/category_ranking", json, options)
			.map(data => data.json());

	}
	public overall_ranking(user_id) {

		var json = JSON.stringify({ user_id: user_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_score/overall_ranking", json, options)
			.map(data => data.json());

	}

	public overall_ranking_days_wise(user_id) {

		var json = JSON.stringify({ user_id: user_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_score/overall_ranking_days_wise", json, options)
			.map(data => data.json());

	}

	public getMyAVg(user_id, target_year) {
		if (target_year == 'all') {
			target_year = '0';
		}

		var json = JSON.stringify({ user_id: user_id, target_year: target_year });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_score/get_my_averages", json, options)
			.map(data => data.json());

	}


	public getBanner(banner_location, timeZone) {
		debugger;
		var json = JSON.stringify({ banner_location: banner_location ,timeZone:timeZone});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_banners", json, options)
			.map(data => data.json());
	}

	public getNotes(user_id, level, favorite, target_year, type) {
		console.log(user_id, level, favorite, target_year, type);
		if (level == 'all') {
			level = '0';
		}
		if (favorite == 'all') {
			favorite = '0';
		} else {
			favorite = '1';
		}
		if (target_year == 'all') {
			target_year = '0';
		}
		if (type == 'all') {
			type = '0';
		}
		console.log(user_id, level, favorite, target_year, type);
		var json = JSON.stringify({
			user_id: user_id, level_id: level,
			favorite: favorite, target_year: target_year, type_id: type
		});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_notes", json, options)
			.map(data => data.json());
	}
	// 	  public getSearchNotes(user_id){

	// 	  var json = JSON.stringify({ user_id : user_id}); 
	// 		var headers = new Headers();
	// 		headers.append("Accept", 'application/json');
	// 		headers.append('Content-Type', 'application/json' );
	// 		let options = new RequestOptions({ headers: headers });

	// 		return this.http.post(AppSettings.API_ENDPOINT+"api_shoot/get_notes", json, options)
	// 		.map(data => data.json());
	//   }

	public getAddScores(id) {

		var json = JSON.stringify({ user_id: id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_my_shoots_and_score", json, options)
			.map(data => data.json());

	}

	public getLevels(timeZone) {
		debugger;
		var json = JSON.stringify({TimeZone:timeZone});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_level", json, options)
			.map(data => data.json());

	}

	public getTypes() {

		var json = JSON.stringify({});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_event_type", json, options)
			.map(data => data.json());

	}

	public getClass() {

		var json = JSON.stringify({});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_class", json, options)
			.map(data => data.json());

	}

	public getCategory() {

		var json = JSON.stringify({});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_categories", json, options)
			.map(data => data.json());

	}

	public getPlace() {

		var json = JSON.stringify({});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_place", json, options)
			.map(data => data.json());

	}

	public getEarnedYardage() {
		var json = JSON.stringify({});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_yardage", json, options)
			.map(data => data.json());
	}
	public EarnedYardage() {
		var json = JSON.stringify({});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_earned_yardage", json, options)
			.map(data => data.json());
	}
	public addShoot(user, addShootDetails, eventdetails, timeZone) {
		debugger;
		console.log('addShootDetails',addShootDetails);
		if (!addShootDetails.shoot_event_id) {
			addShootDetails.shoot_event_id = '';
		}
		var json = JSON.stringify({
			user_id: user.user_id, shoot_id: addShootDetails.shoot_id,TimeZone:timeZone,
			shoot_name: addShootDetails.shoot_name, club_id: addShootDetails.club_id,
			event_name: addShootDetails.event_name, yardage_id: addShootDetails.yardage_id, earned_yardage_id: addShootDetails.earned_yardage_id,
			category_id: addShootDetails.category_id, level_id: addShootDetails.level_id,
			event_start_date: addShootDetails.event_start_date, event_end_date: addShootDetails.event_end_date,
			place_id: addShootDetails.place_id, class_id: addShootDetails.class_id, traps: addShootDetails.traps,
			note: addShootDetails.note, shoot_event_id: addShootDetails.shoot_event_id, type_id: addShootDetails.type_id, event_no: addShootDetails.event_id
		});
		console.log(json);
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/add_shoot", json, options)
			.map(data => data.json());
	}

	public updateShoot(user, addShootDetails, eventdetails, timeZone) {
	debugger;
		// if(addShootDetails.class_id){
		// 	addShootDetails.category_id = ''
		// }
		//   if(addShootDetails.category_id){
		// 	addShootDetails.class_id = ''
		// }

		// if(eventdetails.show){
		// addShootDetails.category_id = ''
		// }else{
		// addShootDetails.class_id = ''
		// }
		//console.log(addShootDetails);
		var json = JSON.stringify({
			user_id: user.user_id, shoot_id: addShootDetails.shoot_id,TimeZone:timeZone,
			shoot_name: addShootDetails.shoot_name, club_id: addShootDetails.club_id,
			event_name: addShootDetails.event_name, yardage_id: addShootDetails.yardage_id,
			category_id: addShootDetails.category_id, earned_yardage_id: addShootDetails.earned_yardage_id,
			level_id: addShootDetails.level_id, event_start_date: addShootDetails.start_date,
			event_end_date: addShootDetails.end_date, place_id: addShootDetails.place_id,
			class_id: addShootDetails.class_id, traps: addShootDetails.traps,
			note: addShootDetails.note, shoot_event_id: addShootDetails.shoot_event_id, type_id: addShootDetails.type_id,
			event_no: addShootDetails.event_no, score_id: addShootDetails.score_id, note_id: addShootDetails.note_id
		});
		console.log(json);
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/update_shoot", json, options)
			.map(data => data.json());

	}

	public addShootToMyShoots(user_id, shoot_id, club_id) {
		var json = JSON.stringify({ user_id: user_id, shoot_id: shoot_id, club_id: club_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/add_shoot_to_my_shoot", json, options)
			.map(data => data.json());
	}
	public addClubTomyShoots(user_id, club_id, timeZone) {
		debugger;
		var json = JSON.stringify({ user_id: user_id, club_id: club_id, shoot_id: '',  TimeZone: timeZone });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/add_shoot_to_my_shoot", json, options)
			.map(data => data.json());
	}

	public classify_me(target_year, user_id, level_id) {
		if (target_year == 'all') {
			target_year = '0';
		}
		var json = JSON.stringify({ user_id: user_id, target_year: target_year, level_id: level_id });
		var headers = new Headers();
		console.log(json);
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_score/classify_me", json, options)
			.map(data => data.json());

	}

	public getFav(user_id, timeZone) {
		debugger;
		var json = JSON.stringify({ user_id: user_id , TimeZone:timeZone});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_favorites", json, options)
			.map(data => data.json());

	}

	public makeFav(user_id, favorite, flag) {

		var json = JSON.stringify({ user_id: user_id, favorite: favorite, flag: flag });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/make_favorite", json, options)
			.map(data => data.json());

	}

	public deleteFav(user_id, favorite_id) {

		var json = JSON.stringify({ user_id: user_id, favorite_id: favorite_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/delete_favorite", json, options)
			.map(data => data.json());

	}
	public get_target_year(timeZone) {
		debugger;
		var json = JSON.stringify({ TimeZone: timeZone });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_target_year", options)
			.map(data => data.json());
	}
	public get_my_shoots_score(user_id) {
		var json = JSON.stringify({ user_id: user_id, });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_my_shoots_score", json, options)
			.map(data => data.json());
	}
	public get_my_shoots_by_level(user_id, level, year) {
		if (level == 'all') {
			level = '';
		}
		if (level == 'ATA') {
			level = '1';
		}
		if (level == 'PITA') {
			level = '2';
		}
		if (level == 'LEAGUE') {
			level = '3';
		}
		if (level == 'PRACTICE') {
			level = '4';
		}
		if (year == 'all') {
			year = '';
		}
		var json = JSON.stringify({ user_id: user_id, level_id: level, target_year: year });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_my_shoots_score", json, options)
			.map(data => data.json());
	}
	public get_my_shoots(user_id, year, level) {
		if (level == 'all') {
			level = '';
		}
		if (level == 'ATA') {
			level = '1';
		}
		if (level == 'PITA') {
			level = '2';
		}
		if (level == 'LEAGUE') {
			level = '3';
		}
		if (level == 'PRACTICE') {
			level = '4';
		}
		if (year == 'all') {
			year = '';
		}
		var json = JSON.stringify({ user_id: user_id, target_year: year, level_id: level });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_my_shoots_score", json, options)
			.map(data => data.json());
	}

	public get_shot_summary(user_id, shoot_id, timeZone) {
		var json = JSON.stringify({ user_id: user_id, shoot_id: shoot_id ,timeZone:timeZone});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/get_shot_summary", json, options)
			.map(data => data.json());
	}

	public save_user_settings(user_id, userPreference) {
		var json = JSON.stringify({ user_id: user_id, ata_single: userPreference.ata_single, ata_double: userPreference.ata_double, ata_handicap: userPreference.ata_handicap, ata_category: userPreference.ata_category, pita_single: userPreference.pita_single, pita_double: userPreference.pita_double, pita_handicap: userPreference.pita_handicap, pita_category: userPreference.pita_category });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "save_user_settings", json, options)
			.map(data => data.json());
	}

	public get_user_settings(user_id, timeZone) {
		debugger;
		var json = JSON.stringify({ user_id: user_id , TimeZone: timeZone});
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "get_user_settings", json, options)
			.map(data => data.json());
	}
	public get_email_settings(user_id) {
		var json = JSON.stringify({ user_id: user_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "get_email_notification_settings", json, options)
			.map(data => data.json());
	}
	public get_lat_long(zip_code) {
		return this.http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + zip_code)
			.map(data => data.json());
	}
	public my_progress(user_id, level_id) {
		var json = JSON.stringify({ user_id: user_id, level_id: level_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_score/my_progress", json, options)
			.map(data => data.json());
	}

	public delete_Event(user_id, event_id) {
		var json = JSON.stringify({ user_id: user_id, shoot_event_id: event_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/delete_event", json, options)
			.map(data => data.json());
	}
	public delete_shoot(user_id, shoot, created) {

		if (!shoot.club_id) {
			shoot.club_id = 0;
		}

		var json = JSON.stringify({ user_id: user_id, shoot_id: shoot.shoot_id, club_id: shoot.club_id, admin_shoot: created });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_shoot/delete_shoot", json, options)
			.map(data => data.json());
	}

	public daily_sessions_login(user_id, lat, lng) {
		var json = JSON.stringify({ user_id: user_id, lat: lat, lng: lng });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_users/daily_sessions_login", json, options)
			.map(data => data.json());
	}

	public daily_sessions_logout(user_id) {
		var json = JSON.stringify({ user_id: user_id });
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_users/daily_sessions_logout", json, options)
			.map(data => data.json());
	}
	public change_yardage(user, userdata) {
		var json = JSON.stringify({
			user_id: user.user_id, earned_yardage_id: userdata.earned_yardage_id,
			earned_yardage_value: userdata.earned_yardage_value, level_id: userdata.level_id
		});
		console.log(json);
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.API_ENDPOINT + "api_users/change_yardage", json, options)
			.map(data => data.json());
	}
	public getLogo() {
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(AppSettings.API_ENDPOINT + "api_basic/get_trapapp_details", options)
			.map(data => data.json());
	}

	//   public getdistance(zip_code1,zip_code2){
	// 	return this.http.get("https://www.zipcodeapi.com/rest/Qyd6MG8tNDlF8qtAkQwHlhWnjOwPGR7wplCc1LGPo2vxsY7NOEvaWrxfg34XUctk/distance.json/"+zip_code1+"/"+zip_code2+"/miles")
	// 	.map(data => data.json());

	//   }

	//   public getdistance(zip_code1,zip_code2){
	// 	return this.http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+zip_code1+"& destinations="+zip_code2+"&key=AIzaSyCFEDoaWvGrKOQk96_DAUCb4qEoLqHsq0U")
	// 	.map(data => data.json());

	//   }





}
