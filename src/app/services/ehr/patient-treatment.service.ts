import { PatientTreatmentResource } from './../../models/patient-treatment/PatientTreatmentResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { CreatePatientTreatmentResource } from 'src/app/models/patient-treatment/CreatePatientTreatmentResource';
@Injectable({
  providedIn: 'root'
})
export class PatientTreatmentService {

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

getAllPatientTreatments(): Observable<PatientTreatmentResource>{
  return this.http.get<PatientTreatmentResource>(`${this.basePath}/patient-treatments`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getPatientTreatmentById(patientTreatmentId:number): Observable<PatientTreatmentResource>{
  return this.http.get<PatientTreatmentResource>(`${this.basePath}/patient-treatments/${patientTreatmentId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
getPatientTreatmentByPatientId(patientId:number){

  return this.http.get<PatientTreatmentResource>(`${this.basePath}/patient-treatments/patient/${patientId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));



}
getPatientTreatmentByTreatmentId(treatmentId:number){

  return this.http.get<PatientTreatmentResource>(`${this.basePath}/patient-treatments/treatment/${treatmentId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));



}
createPatientTreatment(patientId:number,treatmentId:number,medicineId:number,item:CreatePatientTreatmentResource){

  return this.http.post<PatientTreatmentResource>(`${this.basePath}/patients/${patientId}/treatments/${treatmentId}/medicine/${medicineId}/patient-treatments`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));




}

updatePatientTreatment(patientTreatmentId:number,item:any){

  return this.http.put<PatientTreatmentResource>(`${this.basePath}/patient-treatments/${patientTreatmentId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

deletePatientTreatment(patientTreatmentId:number){
  return this.http.delete(`${this.basePath}/patient-diagnosis/${patientTreatmentId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

}
