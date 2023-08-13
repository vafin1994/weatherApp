import {Component, OnDestroy, OnInit} from '@angular/core';
import {FetchWeatherService} from "../fetch-weather.service";
import {Subscription} from "rxjs";
import {WeatherResponse} from "../WeatherResponse";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  weatherSubscription: Subscription = new Subscription();
  weather: WeatherResponse | null = null;

  constructor(private FetchWeatherService: FetchWeatherService) {
  }

  ngOnInit(): void {
    this.SubscribeToCurrentWeather();
  }

  ngOnDestroy(): void {
    this.weatherSubscription.unsubscribe()
  }

  SubscribeToCurrentWeather(): void {
    this.FetchWeatherService.currentWeatherSubject$.subscribe((response: WeatherResponse) => {
      this.weather = response;
      console.log(this.weather);
    })
  }
}
