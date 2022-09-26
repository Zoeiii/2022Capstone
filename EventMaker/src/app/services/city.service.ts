import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { City } from '../models/city';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private citiesUrl = `${baseUrl}organizations`;
  currentCity$!:Subject<City>;

  constructor(private http: HttpClient) {}

  getAllCities():Observable<Array<City>>{
    const results: Observable<Array<City>> = this.http.get<Array<City>>(this.citiesUrl);
    console.log(`getAllCities() returned ${results} `);
    return results;
  };
  
}
