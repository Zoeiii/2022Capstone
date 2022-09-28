import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendee } from '../models/attendee';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class AttendeeService {
  attendeeUrl = `${baseUrl}groups`;
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) {}

  getAttendeeFromEvent(eventId: number, attendeeId: number): Observable<Attendee> {
    const results: Observable<Attendee> = this.http.get<Attendee>(
      `${baseUrl}/${eventId}/members/${attendeeId}`
    );

    return results;
  }

  addAttendee(eventId: number, attendee: Attendee): Observable<Attendee> {
    const results = this.http.post<Attendee>(
      `${this.attendeeUrl}/${eventId}/members`,
      attendee,
      this.jsonContentTypeHeaders
    );

    return results;
  }

  updateAttendeeInfo(eventId: number, attendee: Attendee): Observable<Attendee> {
    const results = this.http.put<Attendee>(
      `${this.attendeeUrl}/${eventId}/members`,
      attendee,
      this.jsonContentTypeHeaders
    );

    return results;
  }

  deleteAttendee(eventId: number, attendeeId: number): Observable<Attendee> {
    const results = this.http.delete<Attendee>(
      `${this.attendeeUrl}/${eventId}/members/${attendeeId}`,
      this.jsonContentTypeHeaders
    );

    return results;
  }
}
