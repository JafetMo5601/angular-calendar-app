import { LoggedInGuard } from './http-services/authorization/logged-in.guard';
import { AuthGuard } from './http-services/authorization/auth.guard';
import { ListAppointmentsComponent } from './calendar/list-appointments/list-appointments.component';
import { ComingSoonComponent } from './shared/coming-soon/coming-soon.component';
import { EventsComponent } from './events/events.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Calendar } from 'igniteui-angular';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'calendar', component: CalendarComponent },
      { path: 'events', component: EventsComponent },
      { path: 'coming-soon', component: ComingSoonComponent },
      { path: 'appointments', component: ListAppointmentsComponent },
    ],
    canActivate: [AuthGuard]
  },
  { 
    path: 'auth', 
    component: AuthenticationComponent,
    canActivate: [LoggedInGuard]
   },
  { path: '', redirectTo: '/home/calendar', pathMatch: 'full' },
  { path: '**', redirectTo: '/home/calendar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
