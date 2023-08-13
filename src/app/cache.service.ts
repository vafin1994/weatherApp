import {Injectable} from '@angular/core';
import {ForecastResponse} from "./ForecastResponse";
import {WeatherResponse} from "./WeatherResponse";

export interface CacheData {
  weatherResponse: WeatherResponse,
  forecastResponse: ForecastResponse,
  dateOfRecord: Date,
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
  }

  SaveDataToLS(cityName: string, cacheData: CacheData) {
    localStorage.setItem(cityName, JSON.stringify(cacheData));
  }

  GetCityDataFromLS(cityName: string): CacheData | null {
    if (localStorage.getItem(cityName)) {
      const cacheData: CacheData = JSON.parse(localStorage.getItem(cityName)!);
      const cacheDate: Date = new Date(cacheData.dateOfRecord);
      if (this.IsDataOlderThenHour(cacheDate)) {
        return null;
      }
      return cacheData;
    } else {
      return null;
    }
  }

  IsDataOlderThenHour(cacheDate: Date): boolean {
    const currentDate = new Date();
    const timeDiff: number = currentDate.getTime() - cacheDate.getTime();
    const timeDiffInMinutes: number = Math.floor((timeDiff / 1000) / 60);
    return timeDiffInMinutes > 60
  }
}
