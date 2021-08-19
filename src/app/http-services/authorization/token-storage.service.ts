import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const FULL_NAME = 'fullname';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    this.removeToken();
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let token = localStorage.getItem(TOKEN_KEY);
    return (token !== 'undefined' && token !== null) ? token : "" as string;
  }

  public removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    this.removeUser();
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.saveUserName();
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public removeUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  private saveUserName(): void {
    this.removeUserName();
    localStorage.setItem(FULL_NAME, JSON.parse(String(localStorage.getItem('auth-user')))['name'] + ' ' + JSON.parse(String(localStorage.getItem('auth-user')))['last']);
  }

  public getUserName(): string {
    let name = localStorage.getItem(FULL_NAME);
    return (name !== 'undefined' && name !== null) ? name : "" as string;
  }

  private removeUserName(): void {
    localStorage.removeItem(FULL_NAME);
  }
}
