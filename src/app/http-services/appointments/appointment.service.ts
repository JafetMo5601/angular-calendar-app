import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'appointments/all', httpOptions);
  }

  retrieveAppointment(id: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `appointments/${id}`, httpOptions);
  }

  createAppointment(
    title: string,
    location: string,
    notes: string,
    start: any,
    type: string,
    ends: string,
    user: string
  ): Observable<any> {
    console.log(start);
    return this.http.post<any>(environment.apiUrl + 'appointments/create', {
      title, location, notes, start, type, ends, user
    }, httpOptions);
  }

  updateAppointment(
    id: string,
    title: string,
    location: string,
    notes: string,
    start: any,
    type: string,
    ends: string,
    user: string
  ): Observable<any> {
    return this.http.put<any>(environment.apiUrl + `appointments/update/${id}`, {
      title, location, notes, start, type, ends, user
    }, httpOptions);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `api/appointments/delete/${id}`, httpOptions);
  }
}
