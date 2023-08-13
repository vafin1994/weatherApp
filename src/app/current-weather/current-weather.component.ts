import {Component, OnDestroy, OnInit} from '@angular/core';
import {FetchWeatherService} from "../services/fetch-weather.service";
import {Subscription} from "rxjs";
import {WeatherResponse} from "../WeatherResponse";
import {FavoriteCitiesService} from "../services/favorite-cities.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  weatherSubscription: Subscription = new Subscription();
  weather: WeatherResponse | null = null;

  constructor(private FetchWeatherService: FetchWeatherService,
              private FavoriteCitiesService: FavoriteCitiesService) {
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
    })
  }

  AddCityToCityList(cityName: string) {
    this.FavoriteCitiesService.AddCityToList(cityName)
  }

  CheckIsCityAlreadyInFavoriteList(cityName: string): boolean {
    return this.FavoriteCitiesService.listOfFavoriteCities.includes(cityName);
  }

  MakeAnAPICall(cityName: string) {
    this.FetchWeatherService.FetchWeatherData(cityName, true)
  }

  IsCashedDateUsed(): boolean{
    return this.FetchWeatherService.isCachedDataUsed;
  }
}
