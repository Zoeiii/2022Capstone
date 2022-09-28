import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
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
  clonedEvent: { [s: string]: EventGroup } = {};

  items: MenuItem[] = [
    { label: 'Home', url: '/home' },
    { label: this.cityCode, url: '/cities' },
  ];

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
      next: () => {
        let routeParam = this.activatedRoute.snapshot.paramMap.get('id');
        this.cityCode = routeParam ? routeParam : 'NY';
        this.getEvents();
        this.getCurrentCity();
        //console.log("get id or city code", this.activatedRoute.snapshot.paramMap.get('id'));
      },
    });
  }

  ngOnInit(): void {}

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
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEventsByCityCode(this.cityCode).subscribe({
      next: (res: Array<EventGroup>) => {
        this.events = res;
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

  route(): void {
    this.router.navigate(['group']);
  }

  //TODO: refresh the search result
  refresh() {
    this.getEvents();
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
        this.getEvents();
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
          summary: 'Confirmed',
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
    console.log(event)
    this.eventService.updateEvent(event).subscribe({
      next: () => {
        delete this.clonedEvent[event.EventId];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated',
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
    console.log('cancel edit row');
  }
}
