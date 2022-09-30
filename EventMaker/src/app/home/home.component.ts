import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { ImageNav } from '../models/image-nav';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images!: any[];

  constructor(private cityService: CityService, private router: Router, private title:Title) {
    this.title.setTitle('Event Maker');
  }

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  ngOnInit(): void {
    this.generateImageNav();
  }

  generateImageNav(): void {
    this.cityService.getAllCities().subscribe({
      next: (res) => {
        this.images = res.map((city: City) => {
          let image: ImageNav = {
            title: city.CityName,
            code: city.CityCode,
            thumbnailImageSrc: city.CityImageSrc,
            previewImageSrc: city.CityImageSrc,
            alt: city.Description,
          };
          return image;
        });
      },
    });
  }

  navigateToCity(event:any){
    let cityCode = event.target.name;
    this.router.navigate([`cities/${cityCode}`]);
  }
}
