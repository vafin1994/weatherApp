import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherResponse} from "./WeatherResponse";
import {catchError} from "rxjs";

class WeatherParams {
  urlBase: string = 'https://api.openweathermap.org/data/2.5/';
  cityName: string;
  mode: 'weather' | 'forecast';
  apiKey: string;

  constructor(cityName: string, mode: 'weather' | 'forecast', apiKey: string) {
    this.cityName = cityName;
    this.mode = mode;
    this.apiKey = apiKey;
  }

  get URL(): string{
    return this.urlBase + '/' + this.mode;
  }

}

@Injectable({
  providedIn: 'root'
})
export class FetchWeatherService {

  constructor(private http: HttpClient) {
  }

  FetchCurrentWeather(cityName: string) {
    const weatherParams: WeatherParams = new WeatherParams(cityName, 'weather', this.GetApiKey());
    this.http.get<WeatherResponse>(weatherParams.URL, {
      params: {q: weatherParams.cityName, appid: weatherParams.apiKey}
    }).pipe(
      catchError((error: any) => {
        console.log('Error$$$:', error);
        throw error;
      })
    ).subscribe((response: WeatherResponse) => {
      console.log(response);
    })
  }

  FetchForecast(cityName: string){
    const weatherParams: WeatherParams = new WeatherParams(cityName, 'forecast', this.GetApiKey());
    this.http.get(weatherParams.URL, {
      params: {q: weatherParams.cityName, appid: weatherParams.apiKey}
    }).pipe(
      catchError((error: any) => {
        console.log('Error$$$:', error);
        throw error;
      })
    ).subscribe((response: any) => {
      console.log(response)
    })
  }

  GetApiKey(): string {
    return '810bdf7b4af51ef14bde52c10f7c1a39';
  }

}
