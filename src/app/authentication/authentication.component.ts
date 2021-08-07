import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  tryingLoggin: boolean = true;
  signUpButton: any;
  signInButton: any;
  container: any;

  constructor() { }

  ngOnInit(): void {
    this.signUpButton = document.getElementById("signUp");
    this.signInButton = document.getElementById("signIn");
    this.container = document.getElementById("container");

    this.signUpButton.addEventListener("click", () => {
      this.container.classList.add("right-panel-active");
    });

    this.signInButton.addEventListener("click", () => {
      this.container.classList.remove("right-panel-active");
    });
  }

}
