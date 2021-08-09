import { AuthorizationService } from 'src/app/http-services/authorization/authorization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

import { CustomPopUpComponent } from './../../shared/custom-pop-up/custom-pop-up.component';
import { CustomPopUpService } from 'src/app/shared/custom-pop-up/custom-pop-up.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  signUpForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required
    }),
    last: new FormControl('', {
      validators: Validators.required
    }),
    username: new FormControl('', {
      validators: Validators.required
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('', {
      validators: Validators.required
    })
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private customPopUpService: CustomPopUpService,
    private authService: AuthorizationService
  ) { }

  public openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'New user', 
      message
      );
  }

  onSubmit() {
    this.authService.register(
      this.signUpForm.controls['name'].value,
      this.signUpForm.controls['last'].value,
      this.signUpForm.controls['email'].value,
      this.signUpForm.controls['username'].value,
      this.signUpForm.controls['password'].value,
      [1]
    ).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.openCustomPopUp(data.message);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
