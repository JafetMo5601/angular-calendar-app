import { ConfirmationPopUpService } from './../../shared/confirmation-pop-up/confirmation-pop-up.service';
import { subDays, startOfDay } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/http-services/appointments/appointment.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {

  list_appointments: any[] | undefined;

  constructor(
    private confirmationPopUpService: ConfirmationPopUpService,
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

  public openConfirmationPopUp(id: string) {
    this.confirmationPopUpService.confirm(
      'Remove appointment',
      'Do you really want to remove this appointment?'
    )
      .then(
        (confirmed) => {
          if (confirmed) {
            this.deleteAppointment(id);
          }
        }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteAppointment(id: string) {
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
