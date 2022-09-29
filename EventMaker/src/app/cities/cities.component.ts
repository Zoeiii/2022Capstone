import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

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
  cityCode: string = '';
  events!: Array<EventGroup>;
  errorMessage!: string;
  currentCity!: City;
  caption!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private cityService: CityService,
    private eventService: EventService
  ) {
    this.title.setTitle('List of Events');
    //detects route param change
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          let routeParam = this.activatedRoute.snapshot.paramMap.get('id');
          this.cityCode = routeParam ? routeParam : 'NY';
          this.caption = `List of events in ${this.cityCode}`;
          this.getEventsByCityCode();
          this.getCurrentCity();
        }
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
}
