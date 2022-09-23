import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { City } from '../models/city';
import { CityService } from '../services/city.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchInput!: string;
  allCities!: any;
  items!: MenuItem[];

  constructor(private router: Router, private cityService: CityService, private searchService:SearchService) {
  }

  ngOnInit(): void {
    this.initHeader();
  }

  initHeader(): void {
    this.cityService.getAllCities().subscribe({
      next: (res: any) => {
        this.items = [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            //command is the onClick
            command: () => {
              this.router.navigate(['']);
            },
          },
        ];
        this.allCities = res;
        this.allCities.forEach((city: City) => {
          this.items.push({
            label: city.CityName,
            icon: 'pi pi-fw pi-cloud',
            command: () => {
              console.log(`click and route to ${city.CityName}`);
              this.router.navigate(['cities']);
            },
          });
        });
      },
    });
  }

  submitByEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.router.navigate(['search']);
      console.log(this.searchInput);
      this.searchService.searchInput$.next(this.searchInput);
    }
  }
}
