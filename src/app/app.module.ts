import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { AppRoutingModule } from './app-routing.module';

const dbConfig: DBConfig = {
  name: 'weatherDB',
  version: 1,
  objectStoresMeta: [{
    store: 'cardList',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'location', keypath: 'location', options: { unique: false } },
      { name: 'cityId', keypath: 'cityId', options: { unique: false } },
      { name: 'isDay', keypath: 'isDay', options: { unique: false } },
      { name: 'title', keypath: 'title', options: { unique: false } },
      { name: 'country', keypath: 'country', options: { unique: false } },
      { name: 'humidity', keypath: 'humidity', options: { unique: false } },
      { name: 'tempFeelsLike', keypath: 'tempFeelsLike', options: { unique: false } },
      { name: 'showWeather', keypath: 'showWeather', options: { unique: false } },
      { name: 'icon', keypath: 'icon', options: { unique: false } },
      { name: 'tempValue', keypath: 'tempValue', options: { unique: false } },
      { name: 'minTemp', keypath: 'minTemp', options: { unique: false } },
      { name: 'maxTemp', keypath: 'maxTemp', options: { unique: false } },
      { name: 'errorMsg', keypath: 'errorMsg', options: { unique: false } },
      { name: 'sunriseTime', keypath: 'sunriseTime', options: { unique: false } },
      { name: 'sunsetTime', keypath: 'sunsetTime', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
