import { Login } from './../../models/loginmodel/login';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { JwtDTO } from 'src/app/models/loginmodel/JwtDTO';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http:HttpClient) { }
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
  LogUser(item: Login): Observable<JwtDTO>{

    return this.http.post<any>(`https://learninghealthsystem.azurewebsites.net/api/login/`, item, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  
  }
}
