import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherResponse} from "./WeatherResponse";
import {catchError, combineLatest, Subject} from "rxjs";
import {ForecastResponse} from "./ForecastResponse";
import {ErrorResponse} from "./ErrorResponse";
import {CacheData, CacheService} from "./cache.service";

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
  isCachedDataUsed: boolean = false;

  currentWeatherSubject$: Subject<WeatherResponse> = new Subject<WeatherResponse>();
  currentWeatherErrorSubject$: Subject<ErrorResponse> = new Subject<ErrorResponse>();

  forecastWeatherSubject$: Subject<ForecastResponse> = new Subject<ForecastResponse>();
  forecastWeatherErrorSubject$: Subject<ErrorResponse> = new Subject<ErrorResponse>();

  constructor(private http: HttpClient, private CacheService: CacheService) {
    this.SaveDataToLS()
  }

  FetchWeatherData(cityName: string, noCashData: boolean = false) {
    this.isCachedDataUsed = false;
    if (noCashData) {
      this.MakeAnAPICall(cityName);
      return;
    }
    const cachedData: CacheData | null = this.CacheService.GetCityDataFromLS(cityName);
    if (cachedData) {
      this.isCachedDataUsed = true;
      this.currentWeatherSubject$.next(cachedData.weatherResponse);
      this.forecastWeatherSubject$.next(cachedData.forecastResponse);
    } else {
      this.MakeAnAPICall(cityName);
    }
  }

  MakeAnAPICall(cityName: string) {
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
        this.currentWeatherErrorSubject$.next(error)
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

  SaveDataToLS() {
    combineLatest(
      [
        this.currentWeatherSubject$,
        this.forecastWeatherSubject$
      ]).subscribe(
      (response: [WeatherResponse, ForecastResponse]) => {
        this.CacheService.SaveDataToLS(
          response[0].name,
          {weatherResponse: response[0], forecastResponse: response[1], dateOfRecord: new Date})
      }
    )
  }

}
