import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, parseISO } from 'date-fns';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { CreateAppointmentsComponent } from './create-appointments/create-appointments.component';

import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AppointmentService } from '../http-services/appointments/appointment.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  years = [2018, 2019, 2020, 2021, 2022, 2023]
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  slideIndex = 1;

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  refresh: Subject<any> = new Subject();

  list_appointments: any[] = [];

  ngOnInit() {
    this.retrieveAppointments();
  }

  activeDayIsOpen: boolean = false;

  constructor(
    private modal: NgbModal,
    public modalService: NgbModal,
    private appointmentService: AppointmentService
  ) {
    document.getElementById('calendar')?.focus();
  }

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.list_appointments = this.list_appointments.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  eventClicked(appointment: any) {
    const modalRef = this.modalService.open(EditAppointmentComponent, { centered: true });
    modalRef.componentInstance.appointment = appointment.event;
    modalRef.result.then((result) => {
      if (result) {
        this.appointmentService.updateAppointment(
          appointment.event.id,
          appointment.event.title,
          appointment.event.location,
          appointment.event.notes,
          appointment.event.start,
          appointment.event.type[0].id,
          appointment.event.ends,
          appointment.event.userName[0].username,
        ).subscribe(
          data => {
            console.log(data);
            this.retrieveAppointments();
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.list_appointments = this.list_appointments.filter((event) => event !== eventToDelete);
  }

  create_appointment() {
    this.modalService.open(CreateAppointmentsComponent, { centered: true });
  }

  retrieveAppointments() {
    this.appointmentService.getAll().subscribe(
      data => {
        for (let event of data) {
          event.start = new Date(event.start);

        }
        this.list_appointments = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    console.log('here');
    let i;
    let slides = Array.from(document.getElementsByClassName("year") as HTMLCollectionOf<HTMLElement>);
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[this.slideIndex - 1].style.display = "block";
  }
}