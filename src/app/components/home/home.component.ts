import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, timeInterval } from 'rxjs/operators';
import { Weather } from 'src/app/shared/model/weather.model';
import { IndexedDbService } from 'src/app/shared/services/indexed-db.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  cardList = [
    {
      id: 1, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 2, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 3, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 4, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 5, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 6, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 7, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 8, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
    {
      id: 9, cityId: '', location: '', title: '', country: '', humidity: 0, tempFeelsLike: 0,
      showWeather: false, icon: '', tempValue: 0, time: '', isDay: '',
      minTemp: 0, maxTemp: 0, errorMsg: '', sunriseTime: '', sunsetTime: ''
    },
  ];

  inputValueChanged = new Subject<string>();
  searchResult$: Observable<Weather>;

  /** CHECK INTERNET CONNECTION */

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;
  timeInterval: any;

  constructor(private weatherService: WeatherService, private indexedDB: IndexedDbService) {
    this.indexedDB.getAll().subscribe(res => {
      if (Array.isArray(res)) {
        const combined = this.cardList.map(t1 => ({ ...t1, ...res.find(t2 => t2.id === t1.id) }));
        this.cardList = combined;
      }
    });
    this.timeInterval = setInterval(() => {
      this.refreshWeather();
    }, 30000);
  }

  refreshWeather() {
    if (this.connectionStatus !== 'offline') {
      const result = this.cardList.map(a => a.cityId).filter(Boolean);
      if (result.length > 0) {
        const getIds = result.toString();
        this.weatherService.searchWeatherInfoForMultipleCities(getIds)
          .subscribe(res => {
            const arr = res.list;
            const combined = this.cardList.map(t1 => ({ ...t1, ...arr.find(t2 => t2.cityId === t1.cityId) }));
            this.cardList = combined;
            this.updateIndexDB(this.cardList);
          }, (error => { console.log(error); }));
      }
    }
  }

  updateIndexDB(arr) {
    arr.forEach((el, index) => {
      this.indexedDB.update(el);
    });
  }

  checkInternetStatus() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      console.log('Online...');
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      this.connectionStatus = 'offline';
      console.log('Offline...');
    }));
  }

  ngOnInit(): void {
    this.checkInternetStatus();
    this.inputValueChanged
      .pipe(debounceTime(1000))
      .subscribe((index) => {
        this.getResults(this.cardList[index].location, index);
      });
  }

  editCity(index: number) {
    this.cardList[index].showWeather = false;
  }

  onMouseEnter(index) {
    // console.log(this.cardList[index]);
  }

  onMouseLeave(index) {
    if (!this.cardList[index].tempValue) {
      this.cardList[index].showWeather = false;
      this.cardList[index].location = '';
      this.cardList[index].errorMsg = '';
    } else {
      this.cardList[index].showWeather = true;
      this.cardList[index].errorMsg = '';
    }
  }

  getResults(location: string, index) {
    console.log('GIVEN LOCATION => ', location);
    this.weatherService.searchWeatherInfoBasedOnCity(location)
      .subscribe((res) => {
        this.searchResult$ = res;
        this.cardList[index] = res;
        this.cardList[index].id = Number(index) + 1;
        // this.indexedDB.add(this.cardList);
        this.checkIndexDB(this.cardList, index);
      }, (error) => { console.log(error); this.cardList[index].errorMsg = error; });
  }

  checkIndexDB(card, index) {
    this.indexedDB.getOneData(index)
      .subscribe(res => {
        if (typeof res === 'object') {
          this.indexedDB.update(card[index]);
        } else {
          this.indexedDB.add(card[index]);
        }
      });
  }

  textChange(event, index) {
    this.inputValueChanged.next(index);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    clearInterval(this.timeInterval);
  }

}


