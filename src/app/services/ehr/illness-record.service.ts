import { CreateIllnessRecordResource } from './../../models/illness-record/CreateIllnessRecordResource';
import { IllnessRecordResource } from './../../models/illness-record/IllnessRecordResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class IllnessRecordService {

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


getAll(): Observable<IllnessRecordResource>{
  return this.http.get<IllnessRecordResource>(`${this.basePath}/illnessRecords`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getIllnessRecordById(illnessRecordId:number): Observable<IllnessRecordResource>{

  return this.http.get<IllnessRecordResource>(`${this.basePath}/illnessRecords/${illnessRecordId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getIllnessRecordsByPatientId(patientId:number): Observable<IllnessRecordResource>{


  return this.http.get<IllnessRecordResource>(`${this.basePath}/patients/${patientId}/illnessRecords`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}


getIllnessRecordsByPatientIdAndIllnessName(patientId:number,illness:string): Observable<IllnessRecordResource>{

  return this.http.get<IllnessRecordResource>(`${this.basePath}/patients/${patientId}/illness/${illness}/illnessRecords`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

createIllnessRecord(item:CreateIllnessRecordResource,patientId:number){

  return this.http.post<IllnessRecordResource>(`${this.basePath}/patients/${patientId}/illnessRecords`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}


updateDiagnosis(illnessRecordId:number,item:any){

  return this.http.put<IllnessRecordResource>(`${this.basePath}/illnessRecords/${illnessRecordId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}


deleteIllnessRecord(illnessRecordId:number){
  return this.http.delete(`${this.basePath}/illnessRecords/${illnessRecordId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}






















}
