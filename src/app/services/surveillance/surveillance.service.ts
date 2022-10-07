import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreateSurveillanceResource } from 'src/app/models/surveillance/CreateSurveillanceResource';
import { SurveillanceResource } from 'src/app/models/surveillance/SurveillanceResource';
import { updateSurveillanceResource } from 'src/app/models/surveillance/UpdateSurveillanceResource';

@Injectable({
  providedIn: 'root'
})
export class SurveillanceService {

  basePath = "http://flash-rope-364617.rj.r.appspot.com/api/v1/surveillances";
  basePath2 = "http://flash-rope-364617.rj.r.appspot.com/api/v1/patients";
  basePath3 = "http://flash-rope-364617.rj.r.appspot.com/api/v1/doctors";
  //basePath = "http://localhost:8080/api/v1/surveillances";
  //basePath2 = "http://localhost:8080/api/v1/patients";
  //basePath3 = "http://localhost:8080/api/v1/doctors";

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

  getAllSurveillances() : Observable<SurveillanceResource>{
    return this.http.get<SurveillanceResource>(this.basePath,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getSurveillanceById(id:any) : Observable<SurveillanceResource>{
    return this.http.get<SurveillanceResource>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createSurveillance(patientid:any,item:any) : Observable<CreateSurveillanceResource>{
    return this.http.post<CreateSurveillanceResource>(`${this.basePath2}/${patientid}/surveillances`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateSurveillance(id:any,item:any) : Observable<updateSurveillanceResource>{
    return this.http.put<updateSurveillanceResource>(`${this.basePath}/${id}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteSurveillance(id:any){
    return this.http.delete(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getSurveillanceByPatientandDoctorId(patientid:any,doctorid:any) : Observable<SurveillanceResource>{
    return this.http.get<SurveillanceResource>(`${this.basePath2}/${patientid}/doctors/${doctorid}/surveillances`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getSurveillanceByPatientId(patientid:any) : Observable<SurveillanceResource>{
    return this.http.get<SurveillanceResource>(`${this.basePath2}/${patientid}/surveillances`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getSurveillanceByDoctorId(doctorid:any) : Observable<SurveillanceResource>{
    return this.http.get<SurveillanceResource>(`${this.basePath3}/${doctorid}/surveillances`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
