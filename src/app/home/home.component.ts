import { AuthorizationService } from 'src/app/http-services/authorization/authorization.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Calendar';
  name: String = 'Jafet Mora Ugalde';

  options: any[] = [
    { icon: 'calendar_today', description: 'Calendar' },
    { icon: 'pending_actions', description: 'Appointments' },
    { icon: 'event', description: 'Events' },
    { icon: 'local_airport', description: 'Vacations' }
  ];

  constructor(
    private router: Router,
    private authService: AuthorizationService
    ) { }

  // ngOnInit() {
  //   this.router.navigate(['/home/calendar']);
  // }

  logout() {
    this.authService.logout();
  }

}
