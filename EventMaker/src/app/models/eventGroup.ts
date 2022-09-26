import { Attendee } from './attendee';

export interface EventGroup {
  EventId: number;
  EventName: string;
  // EventPic: string;
  CityName: string;
  EventOrganizer: string;
  EventOrganizerEmail: string;
  EventDescription: string;
  CurrentAttendeeSize: number;
  MaxAttendeeSize: number;
  Location: string;
  StartTime: Date;
  EndTime: Date;
  Members: Array<Attendee>;
}