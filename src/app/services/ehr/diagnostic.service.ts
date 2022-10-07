import { CreateDiagnosisResource } from './../../models/diagnostic/CreateDiagnosisResource';
import { DiagnosisResource } from './../../models/diagnostic/DiagnosisResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  basePath ="http://flash-rope-364617.rj.r.appspot.com/api/v1/diagnosis"
  //basePath ="http://localhost:8080/api/v1/diagnosis"
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

getAllDiagnosis(): Observable<DiagnosisResource>{
  return this.http.get<DiagnosisResource>(`${this.basePath}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getDiagnosisById(diagnosisId:number): Observable<DiagnosisResource>{

  return this.http.get<DiagnosisResource>(`${this.basePath}/${diagnosisId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getDiagnosisByName(name:string): Observable<DiagnosisResource>{

  return this.http.get<DiagnosisResource>(`${this.basePath}/name/${name}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

createDiagnosis(item:CreateDiagnosisResource){

  return this.http.post<DiagnosisResource>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
updateDiagnosis(diagnosisId:number,item:any){

  return this.http.put<DiagnosisResource>(`${this.basePath}/${diagnosisId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

deleteDiagnosis(diagnosisId:number){
  return this.http.delete(`${this.basePath}/${diagnosisId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}


























}
