import { Attendee } from "./attendee";

export interface EventGroup {
  eventId: number;
  eventName: string;
  eventPic: string;
  cityName: string;
  eventOrganizer: string;
  eventDetail: string;
  eventOverView: string;
  currentAttendeeSize: number;
  maxAttendeeSize: number;
  location: string;
  startTime: Date;
  endTime: Date;
  attendee: Array<Attendee>;
}
