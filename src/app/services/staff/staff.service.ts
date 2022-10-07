import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreateStaffResource } from 'src/app/models/staff/CreateStaffResource';
import { StaffResource } from 'src/app/models/staff/StaffResource';
import { UpdateStaffResource } from 'src/app/models/staff/UpdateStaffResource';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  basePath = "http://flash-rope-364617.rj.r.appspot.com/api/v1/admins";
  //basePath = "http://localhost:8080/api/v1/admins";

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

  getAllStaffs() : Observable<StaffResource>{
    return this.http.get<StaffResource>(this.basePath,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getStaffById(id:any) : Observable<StaffResource>{
    return this.http.get<StaffResource>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createStaff(item:any) : Observable<CreateStaffResource>{
    return this.http.post<CreateStaffResource>(this.basePath,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateStaff(id:any,item:any) : Observable<UpdateStaffResource>{
    return this.http.put<UpdateStaffResource>(`${this.basePath}/${id}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteStaff(id:any){
    return this.http.delete(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getStaffByUsername(username:any) : Observable<StaffResource>{
    return this.http.get<StaffResource>(`${this.basePath}/username/${username}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


}
