import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherResponse} from "./WeatherResponse";
import {catchError, Subject} from "rxjs";
import {ForecastResponse} from "./ForecastResponse";
import {ErrorResponse} from "./ErrorResponse";

class WeatherParams {
  urlBase: string = 'https://api.openweathermap.org/data/2.5/';
  cityName: string;
  mode: 'weather' | 'forecast';
  units: 'standard' | 'metric' | 'imperial' = "metric";
  apiKey: string;

  constructor(cityName: string, mode: 'weather' | 'forecast', apiKey: string) {
    this.cityName = cityName;
    this.mode = mode;
    this.apiKey = apiKey;
  }

  get URL(): string {
    return this.urlBase + '/' + this.mode;
  }

}

@Injectable({
  providedIn: 'root'
})
export class FetchWeatherService {

  currentWeatherSubject$: Subject<WeatherResponse> = new Subject<WeatherResponse>();
  currentWeatherErrorSubject$: Subject<ErrorResponse> = new Subject<ErrorResponse>();

  forecastWeatherSubject$: Subject<ForecastResponse> = new Subject<ForecastResponse>();
  forecastWeatherErrorSubject$: Subject<ErrorResponse> = new Subject<ErrorResponse>();

  constructor(private http: HttpClient) {
  }

  FetchWeatherData(cityName: string) {
    this.FetchCurrentWeather(cityName);
    this.FetchForecast(cityName);
  }

  private FetchCurrentWeather(cityName: string) {
    const weatherParams: WeatherParams = new WeatherParams(cityName, 'weather', this.GetApiKey());
    this.http.get<WeatherResponse>(weatherParams.URL, {
      params: {
        q: weatherParams.cityName,
        appid: weatherParams.apiKey,
        units: weatherParams.units
      }
    }).pipe(
      catchError((error: ErrorResponse) => {
        this.currentWeatherSubject$.error(error)
        throw error;
      })
    ).subscribe((response: WeatherResponse) => {
      this.currentWeatherSubject$.next(response);
    })
  }

  private FetchForecast(cityName: string) {
    const weatherParams: WeatherParams = new WeatherParams(cityName, 'forecast', this.GetApiKey());
    this.http.get<ForecastResponse>(weatherParams.URL, {
      params: {
        q: weatherParams.cityName,
        appid: weatherParams.apiKey,
        units: weatherParams.units
      }
    }).pipe(
      catchError((error: ErrorResponse) => {
        this.forecastWeatherErrorSubject$.next(error);
        throw error;
      })
    ).subscribe((response: ForecastResponse) => {
      this.forecastWeatherSubject$.next(response);
    })
  }

  GetApiKey(): string {
    return '810bdf7b4af51ef14bde52c10f7c1a39';
  }

}
