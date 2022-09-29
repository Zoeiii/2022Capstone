import { Component, OnInit } from '@angular/core';
import { EventManager, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { EventGroup } from 'src/app/models/eventGroup';
import { EventService } from 'src/app/services/event.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Home', url: '/home' },
    { label: 'Search', url: '/search' },
  ];
  searchInput!: string;
  allEvents!: Array<EventGroup>;
  events!: Array<EventGroup>;
  errorMessage!: string;

  constructor(
    private title: Title,
    private router: Router,
    private eventService: EventService,
    private searchService: SearchService
  ) {
    this.title.setTitle('Search for Events');
    this.getAllEvents();
    this.searchService.searchInput$.subscribe({
      next: (res: string) => {
        this.searchInput = res;
        console.log('search component:', this.searchInput);
        this.searchEventByName(res);
        console.log(this.events);
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(this.errorMessage);
      },
      complete: () => {
        console.log(`complete the search input subscription`);
      },
    });
  }

  ngOnInit(): void {}

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res: Array<EventGroup>) => {
        this.allEvents = res;
        if (!this.events) {
          this.events = this.allEvents;
          this.formatEvent();
        }
        console.log('this is all the events: ', this.allEvents);
      },
      error: (err) => {
        this.errorMessage = err;
      },
      complete: () => {
        console.log(`showAllEvents() call completed`);
      },
    });
  }

  searchEventByName(eventName: string): Array<EventGroup> {
    if (eventName) {
      this.events = this.allEvents.filter((event) => {
        return event.EventName.toLocaleLowerCase().includes(
          eventName.toLocaleLowerCase()
        );
      });
      this.formatEvent();
    } else {
      this.events = this.allEvents;
    }
    return this.events;
  }

  formatEvent() {
    this.events.map((event: EventGroup) => {
      event.StartTime = new Date(event.StartTime);
      event.EndTime = new Date(event.EndTime);
    });
  }
}
