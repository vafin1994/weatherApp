import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesService {
  citySelectedSubject$: Subject<string> = new Subject();
  key: string = 'LIST_OF_CITIES';
  listOfFavoriteCities: string[] = [];

  constructor() {
    this.GetDataFromLS()
  }

  GetDataFromLS(): void {
    const lsData: string | null = localStorage.getItem(this.key);
    this.listOfFavoriteCities = lsData ? lsData.split(',') : [];
  }

  AddCityToList(cityName: string){
    this.listOfFavoriteCities.push(cityName);
    this.SetDataToLS();
  }

  FavoriteCitySelected(name: string){
    this.citySelectedSubject$.next(name);
  }

  private SetDataToLS() {
    localStorage.setItem(this.key, this.listOfFavoriteCities.toString())
  }

}
