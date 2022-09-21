import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { City } from '../models/city';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  allCities!: any;

  constructor(private router: Router, private cityService: CityService) {}

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
              this.router.navigate(['home']);
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
}
