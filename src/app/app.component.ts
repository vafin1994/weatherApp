import {Component} from '@angular/core';
import {FavoriteCitiesService} from "./services/favorite-cities.service";
import {FetchWeatherService} from "./services/fetch-weather.service";
import {ErrorResponse} from "./ErrorResponse";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private FavoriteCitiesService: FavoriteCitiesService, private FetchWeatherService: FetchWeatherService) {
  }

  title = 'weatherApp';

  EmitClickOnCity(name: string) {
    this.FavoriteCitiesService.FavoriteCitySelected(name);
  }

  get ListOfFavoriteCities(): string[] {
    return this.FavoriteCitiesService.listOfFavoriteCities;
  }

  get error(): ErrorResponse | null {
    return this.FetchWeatherService.error;
  }
}
