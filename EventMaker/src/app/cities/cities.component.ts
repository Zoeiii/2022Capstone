import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { City } from '../models/city';
import { EventGroup } from '../models/eventGroup';
import { CityService } from '../services/city.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  //TODO: make it dynamic later on
  cityCode: string = '';
  events!: Array<EventGroup>;
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
      sortableColumnName: 'City Name',
    },
    {
      name: 'Max Attendee',
      sortableColumnName: 'MaxAttendeeSize',
    },
  ];

  _selectedColumns!: any[];

  clonedEvent: { [s: string]: EventGroup } = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private cityService: CityService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.title.setTitle('List of Events');
    //detects route param change
    router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          let routeParam = this.activatedRoute.snapshot.paramMap.get('id');
          this.cityCode = routeParam ? routeParam : 'NY';
          this.getEventsByCityCode();
          this.getCurrentCity();
        }
      },
    });
  }

  ngOnInit(): void {
    this._selectedColumns = this.tableHeader;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.tableHeader.filter((col) => val.includes(col));
    console.log('selected: ', val, this._selectedColumns)
  }

  getCurrentCity() {
    this.cityService.getCityByCityCode(this.cityCode).subscribe({
      next: (res: any) => {
        this.currentCity = res;
      },
      error: () => {
        this.errorMessage = `Error fetching the city ${this.cityCode}`;
        console.error(this.errorMessage);
      },
      complete: () => {
        console.log(`Complete fetching all the ${this.cityCode}.`);
      },
    });
    this.getEventsByCityCode();
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

  //TODO: refresh the search result
  refresh() {
    this.getEventsByCityCode();
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
        this.getEventsByCityCode();
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

  onRowEditInit(event: EventGroup) {
    this.clonedEvent[event.EventId] = { ...event };
  }

  onRowEditSave(event: EventGroup) {
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
          detail: err.message,
        });
      },
      complete: () => {},
    });
  }

  onRowEditCancel(event: EventGroup, index: number) {
    this.events[index] = this.clonedEvent[event.EventId];
    delete this.clonedEvent[event.EventId];
  }
}
