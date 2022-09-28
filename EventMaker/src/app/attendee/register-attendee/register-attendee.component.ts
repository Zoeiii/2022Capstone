import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AttendeeService } from 'src/app/services/attendee.service';

@Component({
  selector: 'app-register-attendee',
  templateUrl: './register-attendee.component.html',
  styleUrls: ['./register-attendee.component.css']
})
export class RegisterAttendeeComponent implements OnInit {

  @Input() displayAdd!: boolean;
  @Input() eventId!: number;
  regForm!: FormGroup;
  submit!: boolean;
  cityCode!:string;
  cityName!:string;
  errorMessage!: string;

  constructor(private attendeeService :AttendeeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      MemberName: new FormControl(null, [Validators.required]),
      MemberEmail: new FormControl(null, [Validators.required]),
      MemberPhone: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(formValues: any): void {
    this.submit = true;
    console.log(formValues);
    console.log(this.regForm.valid);
    //eventId: number, attendee: Attendee
    this.attendeeService.addAttendee(this.eventId, formValues).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Attendee added',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
      complete: () => {}
    });
  }

}
