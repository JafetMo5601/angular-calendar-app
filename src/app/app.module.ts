import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialsModule } from './shared/materials/materials.module';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { IgxCalendarModule, IgxCardModule } from "igniteui-angular";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { CreateAppointmentsComponent } from './calendar/create-appointments/create-appointments.component';
import { ListAppointmentsComponent } from './calendar/list-appointments/list-appointments.component';
import { EditAppointmentComponent } from './calendar/edit-appointment/edit-appointment.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ComingSoonComponent } from './shared/coming-soon/coming-soon.component';
import { LoginComponent } from './authentication/login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsComponent } from './events/events.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { SuccessfullyComponent } from './shared/successfully/successfully.component';


@NgModule({

  declarations: [
    CreateAppointmentsComponent,
    AuthenticationComponent,
    RegisterComponent,
    CalendarComponent,
    EventsComponent,
    LoginComponent,
    HomeComponent,
    AppComponent,
    ComingSoonComponent,
    ListAppointmentsComponent,
    EditAppointmentComponent,
    SuccessfullyComponent
  ],
  imports: [
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IgxCalendarModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialsModule,
    NgbModalModule,
    BrowserModule,
    IgxCardModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    authInterceptorProviders
  ]
})
export class AppModule {
}