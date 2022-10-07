import { CreateShiftResource } from './../../models/shift/CreateShiftResource';
import { ShiftResource } from './../../models/shift/ShiftResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  basePath ="http://flash-rope-364617.rj.r.appspot.com/api/v1/shifts"
  //basePath ="http://localhost:8080/api/v1/shifts"
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


getAllShifts(): Observable<ShiftResource>{
  return this.http.get<ShiftResource>(`${this.basePath}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getShiftById(shiftId:number): Observable<ShiftResource>{
  return this.http.get<ShiftResource>(`${this.basePath}/${shiftId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
getShiftByName(name:string){

  return this.http.get<ShiftResource>(`${this.basePath}/name/${name}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
createShift(item:CreateShiftResource){

  return this.http.post<ShiftResource>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}
updateShift(shiftId:number,item:any){

  return this.http.put<ShiftResource>(`${this.basePath}/${shiftId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
deleteShift(shiftId:number){
  return this.http.delete(`${this.basePath}/${shiftId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}









}
