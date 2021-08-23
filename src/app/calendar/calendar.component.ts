import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';

import { CreateAppointmentsComponent } from './create-appointments/create-appointments.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AppointmentService } from '../http-services/appointments/appointment.service';


import {
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ElementRef,
  Injectable,
  ViewChildren,
  QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { noop } from 'rxjs';

@Injectable()
export class CalendarHammerConfig extends HammerGestureConfig {
  public overrides = {
    pan: { direction: Hammer.DIRECTION_VERTICAL, threshold: 1 }
  };
}


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;
  today: Date = new Date();
  viewDate = this.today;

  years: number[] = this.getYears();
  // months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  slideIndex = this.years.indexOf(this.today.getFullYear() + 1);

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
    private appointmentService: AppointmentService,
    public el: ElementRef
  ) {
    this.initYearFormatter();
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
          () => {
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
    let slides = Array.from(document.getElementsByClassName("year") as HTMLCollectionOf<HTMLElement>), i;

    if (n > slides.length) {
      this.slideIndex = 1
    }

    if (n < 1) {
      this.slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[this.slideIndex - 1].style.display = "block";
    this.changeYear(slides[this.slideIndex - 1].firstChild?.textContent);
  }

  getYears(): number[] {
    let maxYear = this.today.getFullYear() + 20, years = [], startYear = 2000;

    while (startYear <= maxYear) {
      years.push(startYear++);
    }

    return years;
  }

  changeMonth(month: any) {
    this.viewDate = new Date(this.today.setMonth(month));
  }

  changeYear(year: any) {
    this.viewDate = new Date(this.today.setFullYear(year));
  }



  @Input()
  public formatView: boolean | undefined;

  @Output()
  public selected = new EventEmitter<Date>();

  private _formatterYear: any;
  private _locale = 'en';
  private _yearFormat = 'numeric';
  private _date = new Date();
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: Date) => void = noop;

  range = (start = 0, stop: any, step = 1) => {
    const res = [];
    const cur = (stop === undefined) ? 0 : start;
    const max = (stop === undefined) ? start : stop;
    for (let i = cur; step < 0 ? i > max : i < max; i += step) {
      res.push(i);
    }
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  };

  @Input()
  public get date() {
    return this._date;
  }

  public set date(value: Date) {
    if (!(value instanceof Date)) {
      return;
    }
    this._date = value;
  }

  @Input()
  public get yearFormat(): any {
    return this._yearFormat;
  }

  public set yearFormat(value: any) {
    this._yearFormat = value;
    this.initYearFormatter();
  }

  // public get decade() {
  //   const result: Date[] = [];
  //   const start = this.date.getFullYear() - 3;
  //   const end = this.date.getFullYear() + 4;

  //   for (const year of this.range(start, end)) {
  //     result.push(new Date(year, this.date.getMonth(), this.date.getDate()));
  //   }

  //   return result;
  // }

  public formattedYear(value: Date): string {
    if (this.formatView) {
      return this._formatterYear.format(value);
    }
    return `${value.getFullYear()}`;
  }

  public selectYear(event: any) {
    this.date = event;

    this.selected.emit(this.date);
    this._onChangeCallback(this.date);
  }

  public scroll(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const delta = event.deltaY < 0 ? -1 : 1;
    // this.generateMonthRange(delta);
  }

  public pan(event: any) {
    const delta = event.deltaY < 0 ? 1 : -1;
    // this.generateMonthRange(delta);
  }

  public registerOnChange(fn: (v: Date) => void) {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => void) {
    this._onTouchedCallback = fn;
  }

  public yearTracker(index: any, item: any): string {
    return `${item.getMonth()}}`;
  }

  public writeValue(value: Date) {
    if (value) {
      this.date = value;
    }
  }

  private initYearFormatter() {
    this._formatterYear = new Intl.DateTimeFormat(this._locale, { year: this.yearFormat });
  }

  public get months() {
    const currentMonth = new Date().getMonth();
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // if ((delta > 0 && this.date.getFullYear() - currentYear >= 95) ||
    //   (delta < 0 && currentYear - this.date.getFullYear() >= 95)) {
    //   return;
    // }
    // this.date = this._calendarModel.timedelta(this.date, 'year', delta);
  }
}