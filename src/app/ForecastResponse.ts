import {ForecastListItem} from "./ForecastListItem";

export interface ForecastResponse{
  "cod": string,
  "message": number,
  "cnt": number,
  "list": ForecastListItem[];
}

