import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Attendee } from '../models/attendee';
import { EventGroup } from '../models/eventGroup';
import { AttendeeService } from '../services/attendee.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.css'],
})
export class AttendeeComponent implements OnInit {
  @Input() attendees!: Array<Attendee>;
  @Input() description!: string;
  @Input() eventId!: number;
  displayAddAttendee: boolean = false;
  clonedAttendee: { [s: string]: Attendee } = {};

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  registerAttendee() {
    this.displayAddAttendee = true;
  }

  getEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (res: EventGroup) => {
        this.attendees = res.Members;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
      complete: () => {
        console.log(`showAllEvents() call completed`);
      },
    });
  }

  removeAttendee(attendeeId: number) {
    this.attendeeService.deleteAttendee(this.eventId, attendeeId).subscribe({
      next: (res) => {
        this.getEvent();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Attendee removed.',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error removing the attendee',
        });
      },
      complete: () => {},
    });
  }

  confirmRemove(attendeeId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this attendee?',
      accept: () => {
        this.removeAttendee(attendeeId);
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

  onRowEditInit(attendee: Attendee) {
    this.clonedAttendee[attendee.MemberId] = { ...attendee };
  }

  onRowEditSave(attendee: Attendee) {
    this.attendeeService.updateAttendeeInfo(this.eventId, attendee).subscribe({
      next: () => {
        delete this.clonedAttendee[attendee.MemberId];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Attendee information is updated',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating attendee information',
        });
      },
      complete: () => {},
    });
  }

  onRowEditCancel(attendee: Attendee, index: number) {
    this.attendees[index] = this.clonedAttendee[attendee.MemberId];
    delete this.clonedAttendee[attendee.MemberId];
  }
}
