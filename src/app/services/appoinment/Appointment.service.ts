import { AppointmentResource } from './../../models/appointment/AppointmentResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  basePath ="http://flash-rope-364617.rj.r.appspot.com/api/v1"
  //basePath ="http://localhost:8080/api/v1"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
constructor(private http: HttpClient) { }
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.log(`An error occurred: ${error.error.message} `);
  }
  else {
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`
    );
  }

  return throwError('Something happened with request, please try again later');
}

getAll(): Observable<AppointmentResource>{
  return this.http.get<AppointmentResource>(`${this.basePath}/appointments`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getAppointmentById(appointmentId:number) : Observable<AppointmentResource>{

  return this.http.get<AppointmentResource>(`${this.basePath}/appointments/${appointmentId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getAppointmentsByPatientId(patientId:number): Observable<AppointmentResource>{

  return this.http.get<AppointmentResource>(`${this.basePath}/patients/${patientId}/appointments`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}
getAppointmentsByDoctorId(doctorId:number): Observable<AppointmentResource>{

  return this.http.get<AppointmentResource>(`${this.basePath}/doctors/${doctorId}/appointments`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));



}

getAppointmentsByDateAndDoctorId(scheduledAt:Date,doctorId:number): Observable<AppointmentResource>{


  return this.http.get<AppointmentResource>(`${this.basePath}/date/${scheduledAt}/doctors/${doctorId}/appointments`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}
getAppointmentsByPatientIdAndDoctorId(patientId:number,doctorId:number): Observable<AppointmentResource>{


  return this.http.get<AppointmentResource>(`${this.basePath}/patients/${patientId}/doctors/${doctorId}/appointments`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));




}
createAppointment(model:any,patientId:number,doctorId:number){
  return this.http.post<AppointmentResource>(`${this.basePath}/patients/${patientId}/doctors/${doctorId}/appointments`, JSON.stringify(model), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}
updateAppointment(appointmentId:number,item:any){

  return this.http.put<AppointmentResource>(`${this.basePath}/appointments/${appointmentId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
deleteAppointment(appointmentId:number){
  return this.http.delete(`${this.basePath}/appointments/${appointmentId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}




}
