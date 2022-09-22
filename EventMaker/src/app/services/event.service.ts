import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventsUrl = `${baseUrl}groups`;
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Array<Event>> {
    const results: Observable<Array<Event>> = this.http.get<Array<Event>>(this.eventsUrl);
    console.log(`getAllCities() returned ${results} `);
    return results;
  }

  getEventById(eventId: number): Observable<Event> {
    const results: Observable<Event> = this.http.get<Event>(`/${eventId}`);
    console.log(`getEventById(${eventId})returned ${results} `);
    return results;
  }

  getEventsByCityCode(cityCode: string): Observable<Event> {
    const results: Observable<Event> = this.http.get<Event>(
      `/byorganization/${cityCode}`
    );
    console.log(`getEventsByCityId(${cityCode})returned ${results} `);
    return results;
  }

  addEvent(event: Event): Observable<Event> {
    const results: Observable<Event> = this.http.post<Event>(
      this.eventsUrl,
      event,
      this.jsonContentTypeHeaders
    );
    console.log(`addEvent(${event}) returned ${results}`);
    return results;
  }

  updateEvent(event: Event): Observable<Event> {
    const results: Observable<Event> = this.http.put<Event>(
      this.eventsUrl,
      event,
      this.jsonContentTypeHeaders
    );
    console.log(`updateEvent(${event}) returned ${results}`);
    return results;
  }

  deleteEventById(eventId: number): Observable<Event> {
    const results: Observable<Event> = this.http.delete<Event>(
      `/${eventId}`,
      this.jsonContentTypeHeaders
    );
    console.log(`deleteEventById(${eventId}) returned ${results}`);
    return results;
  }
}
