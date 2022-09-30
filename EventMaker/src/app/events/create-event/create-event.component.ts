import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  regForm!: FormGroup;
  submitted: boolean = false;
  cityCode!: string;
  selectedCity!: City;
  cities!: Array<City>;
  previousUrl!: string;
  errorMessage!: string;
  readonly minDate = new Date();

  constructor(
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private eventService: EventService,
    private cityService: CityService,
    private messageService: MessageService
  ) {
    title.setTitle('Create New Event');
    this.cityService.getAllCities().subscribe({
      next: (res: any) => {
        this.cities = res;
        console.log('All the cicies: ', this.cities);
      },
      error: () => {
        this.errorMessage = `Error fetching all the cities`;
        console.error(this.errorMessage);
      },
      complete: () => {
        console.log(`Complete fetching all the cities.`);
      },
    });
  }

  ngOnInit(): void {
    let routeParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.cityCode = routeParam ? routeParam : '';
    if (this.cityCode) {
      this.setDefaultCity(this.cityCode);
    }

    this.regForm = this.fb.group({
      eventName: ['', Validators.required],
      eventOrganizer: ['', Validators.required],
      eventOrganizerEmail: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      location: ['', Validators.required],
      maxAttendeeSize: [5, Validators.required],
      startTime: [this.minDate, Validators.required],
      endTime: [this.minDate, Validators.required],
      description: ['', Validators.required],
    });
  }

  setDefaultCity(code: string) {
    this.cityService.getCityByCityCode(code).subscribe({
      next: (res: City) => {
        this.selectedCity = res;
        let city = this.regForm.get('city');
        if (city) {
          city.setValue(res.CityName);
          //TODO: default city not working
        }
      },
      error: () => {
        this.errorMessage = `Error fetching all the cities`;
        console.error(this.errorMessage);
      },
      complete: () => {
        // console.log(`Complete fetching all the cities.`);
      },
    });
  }

  onCancel(): void {
    console.log(this.cityCode);
    if (this.cityCode) {
      this.router.navigate([`org/${this.cityCode}`]);
    } else {
      this.router.navigate(['']);
    }
  }

  onSubmit(formValues: any): void {
    this.submitted = true;
    if (this.regForm.valid) {
      formValues.startTime = formatDate(
        formValues.startTime,
        'M/d/yy, h:mm a',
        'en-US'
      );
      formValues.endTime = formatDate(
        formValues.endTime,
        'M/d/yy, h:mm a',
        'en-US'
      );
      this.eventService.addEvent(formValues).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Succeed',
            detail: `${formValues.eventName} created in ${formValues.city}`,
          });
        },
        error: () => {
          console.error('Error creating a new event');
        },
        complete: () => {
          this.router.navigate([`org/${this.cityCode}`]);
        },
      });
    } else {
      console.log('Error submiting create new event');
      this.messageService.add({
        severity: 'error',
        summary: 'Error submiting create new event',
        detail: 'Please check your input',
      });
    }
  }
}
