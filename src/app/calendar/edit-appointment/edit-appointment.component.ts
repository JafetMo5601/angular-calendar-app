import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from 'src/app/http-services/appointments/appointment.service';
import { ConfirmationPopUpService } from 'src/app/shared/confirmation-pop-up/confirmation-pop-up.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent {

  @Input() public appointment: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private confirmationPopUpService: ConfirmationPopUpService
  ) { }

  passBack() {
    this.passEntry.emit(this.appointment);
    this.activeModal.close(this.appointment);
  }

  public openConfirmationPopUp() {
    this.confirmationPopUpService.confirm(
      'Edit appointment', 
      'Do you really want to edit this appointment?'
      )
    .then(
      (confirmed) => this.passBack()
    )
    .catch(() => alert('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.openConfirmationPopUp();
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
