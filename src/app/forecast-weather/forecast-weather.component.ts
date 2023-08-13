import {Component, OnDestroy, OnInit} from '@angular/core';
import {FetchWeatherService} from "../fetch-weather.service";
import {ForecastResponse} from "../ForecastResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss']
})
export class ForecastWeatherComponent implements OnInit, OnDestroy {
  weatherForecastSubscription: Subscription = new Subscription();
  weatherForecast: ForecastResponse | null = null;

  constructor(private FetchWeatherService: FetchWeatherService) {
  }

  ngOnInit(): void {
    this.SubscribeToWeatherForecast();
  }

  ngOnDestroy(): void {
    this.weatherForecastSubscription.unsubscribe();
  }

  SubscribeToWeatherForecast(): void {
    this.weatherForecastSubscription = this.FetchWeatherService.forecastWeatherSubject$.subscribe(
      (response: ForecastResponse) => {
        this.weatherForecast = response;
      }
    );
  }
}
