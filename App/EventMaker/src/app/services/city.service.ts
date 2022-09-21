import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  citiesUrl = `${baseUrl}organizations`;

  constructor(private http: HttpClient) {}

  getAllCities():Observable<City>{
    const results: Observable<City> = this.http.get<City>(this.citiesUrl);
    console.log(`getAllCities() returned ${results} `);
    return results;
  };
  
}
