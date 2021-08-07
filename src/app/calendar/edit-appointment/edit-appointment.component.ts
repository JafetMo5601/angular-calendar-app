import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from 'src/app/http-services/appointments/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  @Input() public appointment: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.appointment);
    this.activeModal.close(this.appointment);
  }
}
