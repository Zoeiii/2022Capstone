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
  clonedAttendee: { [s: string]: Attendee } = {};

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

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
          summary: 'Succeed',
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

  newRow(): any {
    return { MemberName: '', MemberEmail: '', MemberPhone: '123-456-7890' };
  }

  addAttendee(attendee: Attendee) {
    this.attendeeService.addAttendee(this.eventId, attendee).subscribe({
      next: (res: Attendee) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `New attendee ${res.MemberName} is added`,
        });
      },
      error: (err) => {
        this.attendees.shift();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Unable to add new attendee, please try again later`,
        });
      },
      complete: () => {
        this.getEvent();
      },
    });
  }

  onRowEditInit(attendee: Attendee) {
    this.clonedAttendee[attendee.MemberId] = { ...attendee };
  }

  onRowEditSave(attendee: Attendee) {
    if (attendee.MemberId) {
      this.attendeeService
        .updateAttendeeInfo(this.eventId, attendee)
        .subscribe({
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
    } else {
      this.addAttendee(attendee);
    }
  }

  onRowEditCancel(attendee: Attendee, index: number) {
    if (attendee.MemberId) {
      this.attendees[index] = this.clonedAttendee[attendee.MemberId];
      delete this.clonedAttendee[attendee.MemberId];
    } else {
      this.attendees.shift();
    }
  }
}
