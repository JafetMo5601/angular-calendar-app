import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  getToken() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}
