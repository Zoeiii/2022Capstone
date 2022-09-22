import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { EventService } from 'src/app/services/event.service';

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
  searchResults!: Array<Event>;
  errorMessage!: string;

  constructor(private titleService: Title, private eventService: EventService) {
    this.titleService.setTitle('Search for Events');
  }

  ngOnInit(): void {
    console.log(this.searchInput);
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res: Array<Event>) => {
        this.searchResults = res;
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
