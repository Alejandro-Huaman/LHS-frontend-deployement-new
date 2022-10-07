import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreateRenalDiseaseResource } from 'src/app/models/renal-disease/CreateRenalDiseaseResource';
import { RenalDiseaseResource } from 'src/app/models/renal-disease/RenalDiseaseResource';
import { UpdateRenalDiseaseResource } from 'src/app/models/renal-disease/UpdateRenalDiseaseResource';

@Injectable({
  providedIn: 'root'
})
export class RenalDiseaseService {

  basePath = "http://flash-rope-364617.rj.r.appspot.com/api/v1/renal-diseases";
  //basePath = "http://localhost:8080/api/v1/renal-diseases";

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

  getAllRenalDisease() : Observable<RenalDiseaseResource>{
    return this.http.get<RenalDiseaseResource>(this.basePath,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getRenalDiseaseById(id:any) : Observable<RenalDiseaseResource>{
    return this.http.get<RenalDiseaseResource>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getRenalDiseaseByName(name:string) : Observable<RenalDiseaseResource>{
    return this.http.get<RenalDiseaseResource>(`${this.basePath}/${name}/`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  createRenalDisease(item:any) : Observable<CreateRenalDiseaseResource>{
    return this.http.post<CreateRenalDiseaseResource>(this.basePath,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateRenalDisease(id:any,item:any) : Observable<UpdateRenalDiseaseResource>{
    return this.http.put<UpdateRenalDiseaseResource>(`${this.basePath}/${id}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteRenalDisease(id:any){
    return this.http.delete(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


}
