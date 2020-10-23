import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { WeatherList } from '../model/weather-api.model';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})

export class WeatherAdapterService {

  info: Weather;
  groupList: WeatherList;
  constructor() { }

  adaptList(response: any): WeatherList {
    this.groupList = new WeatherList();
    const arr = [];
    if (Array.isArray(response.list)) {
      response.list.forEach(obj => arr.push(this.adapt(obj)));
    }
    this.groupList.count = response.cnt;
    this.groupList.list = arr;
    return this.groupList;
  }

  adapt(response: any): Weather {
    this.info = new Weather();
    this.info.location = response.name ?? '';
    this.info.cityId = response.id ?? '';
    this.info.showWeather = true;
    this.info.country = response.sys.country ?? '';
    this.info.time = new Date(response.dt * 1000) ?? '';
    this.info.coords = response.coord ?? {};
    this.info.title = response.weather[0].main ?? '';
    this.info.description = response.weather[0].description ?? '';
    this.info.icon = this.attachIcon(response.weather[0].icon);
    this.info.tempValue = Math.round(response.main.temp) ?? 0;
    this.info.tempFeelsLike = Math.round(response.main.feels_like) ?? 0;
    this.info.humidity = Math.round(response.main.humidity) ?? 0;
    this.info.maxTemp = Math.round(response.main.temp_max) ?? 0;
    this.info.minTemp = Math.round(response.main.temp_min) ?? 0;
    this.info.sunsetTime = this.convertTime(response.sys.sunset);
    this.info.sunriseTime = this.convertTime(response.sys.sunrise);
    this.info.errorMsg = '';
    this.info.isDay = this.getDay(response.sys.sunrise, response.sys.sunset);
    return this.info;
  }

  attachIcon(icon) {
    return 'http://openweathermap.org/img/w/' + icon + '.png';
  }

  getDay(sunrise, sunset) {
    const sunsetTime = new Date(sunset * 1000);
    const sunriseTime = new Date(sunrise * 1000);
    const currentDate = new Date();
    if (currentDate.getTime() >= sunriseTime.getTime() && currentDate.getTime() < sunsetTime.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  convertTime(time) {
    const givenTime = new Date(time * 1000);
    return moment(givenTime).format('hh:mm A');
  }
}
