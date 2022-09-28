import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Attendee } from '../models/attendee';
import { EventGroup } from '../models/eventGroup';
import { AttendeeService } from '../services/attendee.service';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.css'],
})
export class AttendeeComponent implements OnInit {
  @Input() attendees!: Array<Attendee>;
  @Input() description!: string;
  @Input() eventId!: number;
  displayAddAttendee:boolean = false;
  clonedAttendee: { [s: string]: EventGroup } = {};

  constructor(
    private attendeeService: AttendeeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  registerAttendee() {
    this.displayAddAttendee = true;
  }

  removeAttendee(attendeeId: number) {
    this.attendeeService.deleteAttendee(this.eventId, attendeeId).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Event deleted.',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
      complete: () => {},
    });
  }

  confirmRemove(attendeeId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this attendee?',
      accept: () => {
        this.removeAttendee(attendeeId)
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'You have cancelled remove.',
        });
      },
    });
  }

  onRowEditInit(event: EventGroup) {
    this.clonedAttendee[event.EventId] = { ...event };
  }

  onRowEditSave(attendee: Attendee) {
    this.attendeeService.updateAttendeeInfo(this.eventId, attendee).subscribe({
      next: () => {
        delete this.clonedAttendee[attendee.MemberId];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
      complete: () => {},
    });
  }

  onRowEditCancel(event: EventGroup, index: number) {
    console.log('cancel edit row');
  }
}
