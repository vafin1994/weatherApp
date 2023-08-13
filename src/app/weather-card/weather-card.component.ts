import {Component, Input, OnInit} from '@angular/core';
import {WeatherResponse} from "../WeatherResponse";
import {ForecastListItem} from "../ForecastListItem";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() weather: WeatherResponse | ForecastListItem | null = null;
  @Input() mode: 'current'|'forecast' = 'current';

  constructor() {
  }

  ngOnInit(): void {
  }

}
