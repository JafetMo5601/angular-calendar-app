import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>('api/appointments/all', httpOptions);
  }

  retrieveAppointment(id: string): Observable<any> {
    return this.http.get<any>(`api/appointments/${id}`, httpOptions);
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
    return this.http.post<any>('api/appointments/create', {
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
    return this.http.put<any>(`api/appointments/update/${id}`, {
      title, location, notes, start, type, ends, user
    }, httpOptions);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`api/appointments/delete/${id}`, httpOptions);
  }
}
