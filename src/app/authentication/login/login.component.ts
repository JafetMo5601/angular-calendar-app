import { AuthorizationService } from 'src/app/http-services/authorization/authorization.service';
import { TokenStorageService } from 'src/app/http-services/authorization/token-storage.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbModalConfig, NgbModal, AuthorizationService]
})
export class LoginComponent {

  constructor(
    private authService: AuthorizationService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    password: new FormControl('', {
      validators: Validators.required
    })
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  onSubmit() {
    this.authService.authenticate(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value).subscribe(
        data => {
          let token: any = this.get_token(data);
          let user_data: any = this.get_user_data(data);
          this.tokenStorage.saveToken(token);
          this.tokenStorage.saveUser(user_data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/calendar']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }

  get_token(data: any) {
    return data.token;
  }

  get_user_data(data: any) {
    delete data.token;
    delete data.type;
    return data;
  }
}
