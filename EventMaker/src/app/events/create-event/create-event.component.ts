import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  submit!: boolean;
  cityCode!:string;
  cityName!:string;
  errorMessage!: string;
  readonly minDate = new Date();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private cityService: CityService
  ) {
    let routeParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.cityCode = routeParam ?routeParam:'';
  }

  ngOnInit(): void {

    this.regForm = new FormGroup({
      eventName: new FormControl(null, [Validators.required]),
      
      eventOrganizer: new FormControl(null, [Validators.required]),
      eventOrganizerEmail: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      maxAttendeeSize: new FormControl(5, [Validators.required]),
      startTime: new FormControl(this.minDate, [Validators.required]),
      endTime: new FormControl(this.minDate, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });

    this.cityService.getCityByCityCode(this.cityCode).subscribe({
      next: (res: City) => {
        this.cityName = res.CityName;
        this.regForm.addControl('cityName', new FormControl(this.cityName));
      },
      error: () => {
        this.errorMessage = `Error fetching all the cities`;
        console.error(this.errorMessage);
      },
      complete: () => {
        // console.log(`Complete fetching all the cities.`);
      },
    })
  }

  //TODO: after create jump back to the create page and expand that new event
  onSubmit(formValues: any): void {
    this.submit = true;
    console.log(formValues);
    console.log(this.regForm.valid);
    formValues.startTime = formatDate(formValues.startTime, 'M/d/yy, h:mm a', 'en-US');
    formValues.endTime = formatDate(formValues.endTime, 'M/d/yy, h:mm a', 'en-US');
    this.eventService.addEvent(formValues).subscribe({
      next: (res: any) => {},
      error: () => {
        console.error('Error creating a new event');
      },
      complete: () => {
        
        this.router.navigate([`cities/${this.cityCode}`])},
    });
  }
}
