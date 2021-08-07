import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AppointmentService } from 'src/app/http-services/appointments/appointment.service';
import { TokenStorageService } from 'src/app/http-services/authorization/token-storage.service';

@Component({
  selector: 'app-create-appointments',
  templateUrl: './create-appointments.component.html',
  styleUrls: ['./create-appointments.component.css']
})
export class CreateAppointmentsComponent {

  refresh: Subject<any> = new Subject();

  newAppoitmentForm = new FormGroup({
    start: new FormControl(
      '', {
      validators: Validators.required
    }),
    ends: new FormControl(
      '', {
      validators: Validators.required
    }),
    title: new FormControl('', {
      validators: Validators.required
    }),
    type: new FormControl('1'),
    allDay: new FormControl(false, {
      validators: Validators.required
    }),
    draggable: new FormControl(true),
    notes: new FormControl(''),
    location: new FormControl('')
  });

  constructor(
    public activeModal: NgbActiveModal,
    private appointmentService: AppointmentService,
    private tokenStorage: TokenStorageService
  ) {
    this.newAppoitmentForm.get('allDay')?.valueChanges.subscribe(
      a => {
        if (a) {
          this.newAppoitmentForm.get('start')?.disable();
          this.newAppoitmentForm.get('end')?.disable();
        } else {
          this.newAppoitmentForm.get('start')?.enable();
          this.newAppoitmentForm.get('end')?.enable();
        }
      });
  }

  parseDate(date: string) {
    let formatedDate = new Date(date);
    return formatedDate;
  }

  onSubmit() {
    this.appointmentService.createAppointment(
      this.newAppoitmentForm.get('title')?.value,
      this.newAppoitmentForm.get('location')?.value,
      this.newAppoitmentForm.get('notes')?.value,
      this.newAppoitmentForm.get('start')?.value,
      this.newAppoitmentForm.get('type')?.value,
      this.newAppoitmentForm.get('ends')?.value,
      this.tokenStorage.getUser().username
    ).subscribe(
      data => {
        console.log(data);
        this.closeModal();
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  closeModal(): any {
    this.activeModal.close();
  }

}

