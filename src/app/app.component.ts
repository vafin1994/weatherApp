import { Component } from '@angular/core';
import {FavoriteCitiesService} from "./favorite-cities.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private FavoriteCitiesService: FavoriteCitiesService) {
  }
  title = 'weatherApp';

  EmitClickOnCity(name: string){
    this.FavoriteCitiesService.FavoriteCitySelected(name);
  }

  get ListOfFavoriteCities(): string[]{
    return this.FavoriteCitiesService.listOfFavoriteCities;
  }
}
