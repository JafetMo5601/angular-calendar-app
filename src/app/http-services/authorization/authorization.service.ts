import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/http-services/authorization/token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {

    constructor(
        private tokenStrg: TokenStorageService,
        private http: HttpClient,
        private router: Router
        ) { }

    register(
        name: string,
        last: string,
        email: string,
        username: string,
        password: string,
        role: number[]
    ): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'auth/register', {
            name, last, email, username, password, role
        }, httpOptions);
    }

    authenticate(username: string, password: string): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'auth/authenticate', { username, password }, httpOptions);
    }

    // isAuthenticated(): boolean {
    //     const token = this.token.getToken();
    //     return !this.jwtHelper.isTokenExpired(token);
    // }

    logout(): void {
        this.tokenStrg.removeToken();
        this.tokenStrg.removeUser();
        this.router.navigateByUrl("/auth");
    }
}
