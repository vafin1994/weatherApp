import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FetchWeatherService} from "../fetch-weather.service";
import {NgForm} from "@angular/forms";
import {FavoriteCitiesService} from "../favorite-cities.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-city-input-component',
  templateUrl: './city-input-component.component.html',
  styleUrls: ['./city-input-component.component.scss']
})
export class CityInputComponentComponent implements OnInit, OnDestroy {
  citySelectedSubscription: Subscription = new Subscription();
  @ViewChild('form') form: NgForm | null = null;

  constructor(private FetchWeatherService: FetchWeatherService,
              private FavoriteCitiesService: FavoriteCitiesService) {
  }

  ngOnInit(): void {
    this.SubscribeToCitySelected();
  }

  ngOnDestroy() {
    this.citySelectedSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const cityName = form.value.cityName
    this.FetchWeatherService.FetchWeatherData(cityName);
  }

  SubscribeToCitySelected() {
    this.citySelectedSubscription = this.FavoriteCitiesService.citySelectedSubject$.subscribe(
      (response: string) => {
        this.form?.setValue({cityName: response})
        this.onSubmit(this.form!);
      }
    )
  }

}
