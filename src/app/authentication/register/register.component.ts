import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthorizationService } from 'src/app/http-services/authorization/authorization.service';
import { showMessage } from 'igniteui-angular/lib/core/deprecateDecorators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { SuccessfullyComponent } from 'src/app/shared/successfully/successfully.component';


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
    private modal: NgbModal,
    private authService: AuthorizationService,
    public modalService: NgbModal,
  ) { }

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
        this.showMessage();
        console.log(data);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  showMessage() {
    this.modalService.open(SuccessfullyComponent, {centered: true});
  }

}
