import { MedicineResource } from './../../models/medicine/MedicineResource';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { CreateMedicineResource } from 'src/app/models/medicine/CreateMedicineResource';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  basePath ="http://flash-rope-364617.rj.r.appspot.com/api/v1/medicines"
  //basePath ="http://localhost:8080/api/v1/medicines"
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



getAllMedicines(): Observable<MedicineResource>{
  return this.http.get<MedicineResource>(`${this.basePath}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

getMedicineById(medicineId:number): Observable<MedicineResource>{


  return this.http.get<MedicineResource>(`${this.basePath}/${medicineId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

getMedicineByName(name:string): Observable<MedicineResource>{
  return this.http.get<MedicineResource>(`${this.basePath}/name/${name}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

createMedicine(item:CreateMedicineResource){

  return this.http.post<MedicineResource>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}

updateDiagnosis(medicineId:number,item:any){

  return this.http.put<MedicineResource>(`${this.basePath}/${medicineId}`, JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}

deleteMedicine(medicineId:number){
  return this.http.delete(`${this.basePath}/${medicineId}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}


















}
