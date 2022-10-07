import { CreatePatientResource } from './../../models/patient/CreatePatientResource';
import { PatientDiagnosisResource } from './../../models/patient-diagnostic/PatientDiagnosisResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { CreatePatientDiagnosisResource } from 'src/app/models/patient-diagnostic/CreatePatientDiagnosisResource';
@Injectable({
  providedIn: 'root'
})
export class PatientDiagnosticService {

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


getAllPatientDiagnosis(): Observable<PatientDiagnosisResource>{
  return this.http.get<PatientDiagnosisResource>(`${this.basePath}/patientDiagnosis`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getPatientDiagnosisById(patientDiagnosisId:number): Observable<PatientDiagnosisResource>{

  return this.http.get<PatientDiagnosisResource>(`${this.basePath}/patient-diagnosis/${patientDiagnosisId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getPatientDiagnosisByPatientId(patientId:number): Observable<PatientDiagnosisResource>{

  return this.http.get<PatientDiagnosisResource>(`${this.basePath}/patient-diagnosis/patient/${patientId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getPatientDiagnosisByDiagnosisId(diagnosisId:number): Observable<PatientDiagnosisResource>{

  return this.http.get<PatientDiagnosisResource>(`${this.basePath}/patient-diagnosis/diagnosis/${diagnosisId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

createPatientDiagnosis(item:CreatePatientDiagnosisResource,patientId:number,diagnosisId:number){

  return this.http.post<CreatePatientDiagnosisResource>(`${this.basePath}/patients/${patientId}/diagnosis/${diagnosisId}/patient-diagnosis`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}


updatePatientDiagnosis(patientDiagnosisId:number,item:any){

  return this.http.put<PatientDiagnosisResource>(`${this.basePath}/patient-diagnosis/${patientDiagnosisId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

deletePatientDiagnosis(patientDiagnosisId:number){
  return this.http.delete(`${this.basePath}/patient-diagnosis/${patientDiagnosisId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}






}
