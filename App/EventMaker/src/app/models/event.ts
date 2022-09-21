import { Attendee } from "./attendee";

export interface Event {
  EventId: number;
  EventName: string;
  EventPic: string;
  CityName: string;
  EventOrganizer: string;
  EventDetail: string;
  EventOverView: string;
  MaxAttendeeSize: number;
  Location: string;
  StartTime: Date;
  EndTime: Date;
  Attendee: Array<Attendee>;
}
