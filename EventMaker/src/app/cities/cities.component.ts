import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
  cityCode: string = 'NY';
  allCities!: Array<City>;
  events!: Array<EventGroup>;
  errorMessage!: string;
  currentCity!: City;

  items: MenuItem[] = [
    { label: 'Home', url: '/home' },
    { label: this.cityCode, url: '/cities' },
  ];

  constructor(
    private router: Router,
    private title: Title,
    private cityService: CityService,
    private eventService: EventService
  ) {
    this.title.setTitle('Events in City');
  }

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe({
      next: (res: any) => {
        this.allCities = res;
        console.log('All the cicies: ', this.allCities);
      },
      error: () => {
        this.errorMessage = `Error fetching all the cities`;
        console.error(this.errorMessage);
      },
      complete: () => {
        console.log(`Complete fetching all the cities.`);
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
    this.router.navigate(['cities']);
  }

  getCityByCityCode(): City | undefined {
    return this.allCities.find((cities: City) => {
      return cities.CityCode == this.cityCode;
    });
  }

  createNewEvent() {
    this.router.navigate(['createNewEvent']);
    console.log(this.getCityByCityCode())
  }
}
