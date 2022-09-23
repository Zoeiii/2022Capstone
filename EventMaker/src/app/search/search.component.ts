import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  events!: Array<EventGroup>;
  errorMessage!: string;

  constructor(
    private title: Title,
    
    private router: Router,
    private eventService: EventService,
    private searchService: SearchService
  ) {
    this.title.setTitle('Search for Events');
    this.searchService.searchInput$.subscribe({
      next: (res:string) => {this.searchInput = res;
      console.log("search component:", this.searchInput)}
    });
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
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
}
