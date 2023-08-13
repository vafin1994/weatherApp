import {Component, OnInit} from '@angular/core';
import {FetchWeatherService} from "../fetch-weather.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-city-input-component',
  templateUrl: './city-input-component.component.html',
  styleUrls: ['./city-input-component.component.scss']
})
export class CityInputComponentComponent implements OnInit {

  constructor(private FetchWeatherService: FetchWeatherService) {
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const cityName = form.value.cityName
    this.FetchWeatherService.FetchWeatherData(cityName);
  }

}
