import { Attendee } from "./attendee";

export interface EventGroup {
  EventId: number;
  EventName: string;
  EventPic: string;
  CityName: string;
  EventOrganizer: string;
  EventDescription: string;
  EventOverView: string;
  CurrentAttendeeSize: number;
  MaxAttendeeSize: number;
  Location: string;
  StartTime: Date;
  EndTime: Date;
  Attendee: Array<Attendee>;
}
