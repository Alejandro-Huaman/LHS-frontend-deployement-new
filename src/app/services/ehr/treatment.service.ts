import { CreateTreatmentResource } from './../../models/treatment/CreateTreatmentResource';
import { TreatmentResource } from './../../models/treatment/TreatmentResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  basePath ="http://flash-rope-364617.rj.r.appspot.com/api/v1/treatments"
  //basePath ="http://localhost:8080/api/v1/treatments"
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

getAllTreatments(): Observable<TreatmentResource>{
  return this.http.get<TreatmentResource>(`${this.basePath}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}


getTreatmentById(treatmentId:number): Observable<TreatmentResource>{


  return this.http.get<TreatmentResource>(`${this.basePath}/${treatmentId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

getTreatmentByName(name:string): Observable<TreatmentResource>{
  return this.http.get<TreatmentResource>(`${this.basePath}/name/${name}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}



createTreatment(item:CreateTreatmentResource){

  return this.http.post<TreatmentResource>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}

updateTreatment(treatmentId:number,item:any){

  return this.http.put<TreatmentResource>(`${this.basePath}/${treatmentId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

deleteTreatment(treatmentId:number){
  return this.http.delete(`${this.basePath}/${treatmentId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}






























}
