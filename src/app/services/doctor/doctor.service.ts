import { DoctorResource } from './../../models/doctor/DoctorResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
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

getAllDoctors(): Observable<DoctorResource>{
  return this.http.get<DoctorResource>(`${this.basePath}/doctors`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getDoctorById(doctorId:number): Observable<DoctorResource>{

  return this.http.get<DoctorResource>(`${this.basePath}/doctors/${doctorId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getDoctorByUserName(username:string): Observable<DoctorResource>{

  return this.http.get<DoctorResource>(`${this.basePath}/doctors/username/${username}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getDoctorByEmail(email:string): Observable<DoctorResource>{

  return this.http.get<DoctorResource>(`${this.basePath}/doctors/email/${email}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getDoctorByFirstNameAndLastName(name:string,lastName:string): Observable<DoctorResource>{


  return this.http.get<DoctorResource>(`${this.basePath}/doctors/name/${name}/lastName/${lastName}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));




}

createDoctor(item:any,specialtyId:number,shiftId:number){

  return this.http.post<DoctorResource>(`${this.basePath}/specialties/${specialtyId}/shifts/${shiftId}/doctors`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
updateDoctor(doctorId:number,item:any){

  return this.http.put<DoctorResource>(`${this.basePath}/doctors/${doctorId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

deleteDoctor(doctorId:number){
  return this.http.delete(`${this.basePath}/doctors/${doctorId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}





























}
