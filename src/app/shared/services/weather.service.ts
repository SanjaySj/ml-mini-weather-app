import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { WeatherAdapterService } from './weather-adapter.service';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private httpClient: HttpClient, private adapter: WeatherAdapterService) { }

  searchWeatherInfoBasedOnCity(city: string): Observable<any> {
    const APPID = ''; // 080fac476eef2dc83a134cf4f93692f1
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APPID + '&units=metric';
    return this.httpClient.get(url).pipe(map(response => this.adapter.adapt(response)), catchError(this.errorHandler));
  }

  searchWeatherInfoForMultipleCities(ids: string): Observable<any> {
    const APPID = ''; // 080fac476eef2dc83a134cf4f93692f1
    const url = 'https://api.openweathermap.org/data/2.5/group?id=' + ids + '&APPID=' + APPID + '&units=metric';
    return this.httpClient.get(url).pipe(map(response => this.adapter.adaptList(response)), catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(error.error.message);
    } else {
      return throwError(error.error.message);
    }
  }
}
