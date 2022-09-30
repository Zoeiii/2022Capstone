import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { City } from '../models/city';
import { EventGroup } from '../models/eventGroup';
import { CityService } from '../services/city.service';
import { EventService } from '../services/event.service';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  //TODO: make it dynamic later on
  @Input() cityCode: string = '';
  @Input() events!: Array<EventGroup>;
  @Input() caption:string='';
  @Output() refreshEvent = new EventEmitter<boolean>();
  @ViewChild('eventTable') eventTable!: Table;
  errorMessage!: string;
  currentCity!: City;
  readonly minDate = new Date();
  tableHeader = [
    {
      name: 'Event Name',
      sortableColumnName: 'EventName',
    },
    {
      name: 'Event Organizer',
      sortableColumnName: 'EventOrganizer',
    },
    {
      name: 'Event StartTime',
      sortableColumnName: 'StartTime',
    },
    {
      name: 'Event EndTime',
      sortableColumnName: 'EndTime',
    },
    {
      name: 'Event Location',
      sortableColumnName: 'Location',
    },
    {
      name: 'City',
      sortableColumnName: 'CityName',
    },
    {
      name: 'Max Attendee',
      sortableColumnName: 'MaxAttendeeSize',
    },
  ];

  clonedEvent: { [s: string]: EventGroup } = {};

  constructor(
    private router: Router,
    private title: Title,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private searchService:SearchService
  ) {
    this.title.setTitle('List of Events');
  }

  ngOnInit(): void {
  }

  //TODO: refresh the search result
  refresh() {
    if(this.cityCode==''){
      this.getAllEvents();
    }
    else{
      this.getEventsByCityCode();
    }
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res: Array<EventGroup>) => {
        this.events = res;
      },
      error: (err) => {
        this.errorMessage = err;
      },
      complete: () => {
        console.log(`showAllEvents() call completed`);
      },
    });
  }

  getEventsByCityCode(): void {
    this.eventService.getEventsByCityCode(this.cityCode).subscribe({
      next: (res: Array<EventGroup>) => {
        this.events = res;
        this.events.map((event: EventGroup) => {
          event.StartTime = new Date(event.StartTime);
          event.EndTime = new Date(event.EndTime);
        });
        console.log('this is all the events: ', this.events);
      },
      error: (err) => {
        this.errorMessage = err;
      },
      complete: () => {
        console.log(`showAllEvents() call completed`);
      },
    });
  }

  createNewEvent() {
    this.router.navigate([`createNewEvent/${this.cityCode}`]);
  }

  deleteEventById(eventId: number) {
    this.eventService.deleteEventById(eventId).subscribe({
      next: (res: any) => {},
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
      complete: () => {
        this.refresh();
      },
    });
  }

  confirmDelete(eventId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this event?',
      accept: () => {
        this.deleteEventById(eventId);
        this.messageService.add({
          severity: 'info',
          summary: 'Succeed',
          detail: 'Event deleted.',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'You have cancelled delete.',
        });
      },
    });
  }

  onRowEditInit(event: EventGroup, index: number):void {
    this.clonedEvent[event.EventId] = { ...event };
    console.log(this.eventTable)
    this.eventTable.expandedRowKeys = {};
  }

  onRowEditSave(event: EventGroup, index: number) {
    console.log(event);
    this.eventService.updateEvent(event).subscribe({
      next: () => {
        delete this.clonedEvent[event.EventId];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event detail is updated',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
        this.onRowEditCancel(event, index);
      },
      complete: () => {},
    });
  }

  onRowEditCancel(event: EventGroup, index: number) {
    this.events[index] = this.clonedEvent[event.EventId];
    delete this.clonedEvent[event.EventId];
  }
}
