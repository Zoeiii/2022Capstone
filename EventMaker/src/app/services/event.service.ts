import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventGroup } from '../models/eventGroup';
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

  getAllEvents(): Observable<Array<EventGroup>> {
    const results: Observable<Array<EventGroup>> = this.http.get<Array<EventGroup>>(this.eventsUrl);
    console.log(`getAllCities() returned ${results} `);
    return results;
  }

  getEventById(eventId: number): Observable<EventGroup> {
    const results: Observable<EventGroup> = this.http.get<EventGroup>(`${this.eventsUrl}/${eventId}`);
    console.log(`getEventById(${eventId})returned ${results} `);
    return results;
  }

  getEventsByCityCode(cityCode: string): Observable<Array<EventGroup>> {
    const results: Observable<Array<EventGroup>> = this.http.get<Array<EventGroup>>(
      `${this.eventsUrl}/byorganization/${cityCode}`
    );
    console.log(`getEventsByCityId(${cityCode})returned ${results} `);
    return results;
  }

  addEvent(event: EventGroup): Observable<EventGroup> {
    const results: Observable<EventGroup> = this.http.post<EventGroup>(
      this.eventsUrl,
      event,
      this.jsonContentTypeHeaders
    );
    console.log(`addEvent(${event}) returned ${results}`);
    return results;
  }

  updateEvent(event: EventGroup): Observable<EventGroup> {
    const results: Observable<EventGroup> = this.http.put<EventGroup>(
      this.eventsUrl,
      event,
      this.jsonContentTypeHeaders
    );
    console.log(`updateEvent(${event}) returned ${results}`);
    return results;
  }

  deleteEventById(eventId: number): Observable<EventGroup> {
    const results: Observable<EventGroup> = this.http.delete<EventGroup>(
      `${this.eventsUrl}/${eventId}`,
      this.jsonContentTypeHeaders
    );
    console.log(`deleteEventById(${eventId}) returned ${results}`);
    return results;
  }
}
