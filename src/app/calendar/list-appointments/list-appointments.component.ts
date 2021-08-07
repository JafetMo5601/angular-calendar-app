import { subDays, startOfDay } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/http-services/appointments/appointment.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {

  list_appointments: any[] | undefined;

  constructor(
    private appointmentService: AppointmentService
  ) { }


  ngOnInit() {
    this.retrieveAppointments();
  }

  // TODO: This shoul be a retrieve by days.
  retrieveAppointments() {
    this.appointmentService.getAll().subscribe(
      data => {
        console.log(data);
        this.list_appointments = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteAppointment(id: string){
    this.appointmentService.deleteAppointment(id).subscribe(
      data => {
        this.retrieveAppointments();
      },
      err => {
        console.log(err);
      }
    );
  }
}
