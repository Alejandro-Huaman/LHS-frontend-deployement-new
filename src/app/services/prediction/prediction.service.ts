import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreatePatientResource } from 'src/app/models/patient/CreatePatientResource';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { UpdatePatientResource } from 'src/app/models/patient/UpdatePatientResource';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  basePath =   "https://predict-lhs.azurewebsites.net/api/predict/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error ocurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    return throwError('Something happened with request, please try again later');

  }

  createPrediction(item:any) : Observable<any>{
    return this.http.post<any>(`${this.basePath}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
