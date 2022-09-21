import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventsUrl = `${baseUrl}groups`;

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event> {
    const results: Observable<Event> = this.http.get<Event>(this.eventsUrl);
    console.log(`getAllCities() returned ${results} `);
    return results;
  }

  getEventsByCityId(cityId: number): Observable<Event> {
    const results: Observable<Event> = this.http.get<Event>(
      `/byorganization/${cityId}`
    );
    console.log(`getEventsByCityId(${cityId})returned ${results} `);
    return results;
  }
}
