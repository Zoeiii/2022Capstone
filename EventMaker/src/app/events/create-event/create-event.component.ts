import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/models/attendee';
import { City } from 'src/app/models/city';
import { EventGroup } from 'src/app/models/eventGroup';
import { CityService } from 'src/app/services/city.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  regForm!: FormGroup;
  submit!: boolean;
  cities!: Array<City>;
  selectedCity!: City;
  errorMessage!: string;
  readonly minDate = new Date();

  constructor(
    private router: Router,
    private eventService: EventService,
    private cityService: CityService
  ) {
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
    this.regForm = new FormGroup({
      eventName: new FormControl(null, [Validators.required]),
      cityName: new FormControl(null, [Validators.required]),
      eventOrganizer: new FormControl(null, [Validators.required]),
      eventOrganizerEmail: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      maxAttendeeSize: new FormControl(5, [Validators.required]),
      startTime: new FormControl(this.minDate, [Validators.required]),
      endTime: new FormControl(this.minDate, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(formValues: any): void {
    this.submit = true;
    console.log(formValues);
    console.log(this.regForm.valid);
    this.eventService.addEvent(formValues).subscribe({
      next: (res: any) => {
        console.log('heyyyyy', res);
        this.router.navigate(['cities']);
      },
    });
  }
}
