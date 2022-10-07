import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreatePatientResource } from 'src/app/models/patient/CreatePatientResource';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { UpdatePatientResource } from 'src/app/models/patient/UpdatePatientResource';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  basePath =   "http://flash-rope-364617.rj.r.appspot.com/api/v1/patients";
  basePath2 = "http://flash-rope-364617.rj.r.appspot.com/api/v1/renal-diseases";
  //basePath =   "http://localhost:8080/api/v1/patients";
  //basePath2 = "http://localhost:8080/api/v1/renal-diseases";

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

  getAllPatients() : Observable<PatientResource>{
    return this.http.get<PatientResource>(this.basePath,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPatientById(id:any) : Observable<PatientResource>{
    return this.http.get<PatientResource>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createPatient(renal:any,item:any) : Observable<CreatePatientResource>{
    return this.http.post<CreatePatientResource>(`${this.basePath2}/${renal}/patients`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updatePatient(id:number,item:UpdatePatientResource) : Observable<UpdatePatientResource>{
    return this.http.put<UpdatePatientResource>(`${this.basePath}/${id}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updatePatientbyRenalDisease(id:number,renal:number,item:PatientResource) : Observable<UpdatePatientResource>{
    return this.http.put<PatientResource>(`${this.basePath}/${id}/renal-diseases/${renal}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deletePatient(id:any){
    return this.http.delete(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPatientByDocumentNumber(number:any){
    return this.http.get<any>(`${this.basePath}/document-number/${number}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPatientByEmail(email:any){
    return this.http.get<PatientResource>(`${this.basePath}/email/${email}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPatientByCompleteName(name:any,lastname:any){
    return this.http.get<PatientResource>(`${this.basePath}/name/${name}/lastName/${lastname}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPatientByRenalDisease(renal:any){
    return this.http.get<PatientResource>(`${this.basePath}/renal-disease/${renal}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPatientByUsername(username:any){
    return this.http.get<PatientResource>(`${this.basePath}/username/${username}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}