import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreatePatientMedicineResource } from 'src/app/models/patient-medicine/CreatePatientMedicineResource';
import { PatientMedicineResource} from 'src/app/models/patient-medicine/PatientMedicineResource';
import { UpdatePatientMedicineResource } from 'src/app/models/patient-medicine/UpdatePatientMedicineResource';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { UpdatePatientResource } from 'src/app/models/patient/UpdatePatientResource';

@Injectable({
  providedIn: 'root'
})
export class PatientMedicineService {

  basePath =   "http://flash-rope-364617.rj.r.appspot.com/api/v1/patient-medicine";
  basePath2 = "http://flash-rope-364617.rj.r.appspot.com/api/v1/patients";
  //basePath =   "http://localhost:8080/api/v1/patient-medicine";
  //basePath2 = "http://localhost:8080/api/v1/patients";

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

  getAllPatientMedicines() : Observable<PatientMedicineResource>{
    return this.http.get<PatientMedicineResource>(this.basePath,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPatientMedicineById(id:any) : Observable<PatientMedicineResource>{
    return this.http.get<PatientMedicineResource>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  UpdatePatientMedicineById(id:any,item:any) : Observable<UpdatePatientMedicineResource>{
    return this.http.put<UpdatePatientMedicineResource>(`${this.basePath}/${id}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  DeletePatientMedicineById(id:any){
    return this.http.delete(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getPatientMedicineByMedicine(medicine:any) : Observable<PatientMedicineResource>{
    return this.http.get<PatientMedicineResource>(`${this.basePath}/medicine/${medicine}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  getPatientMedicineByPatient(patient:any) : Observable<PatientMedicineResource>{
    return this.http.get<PatientMedicineResource>(`${this.basePath}/patient/${patient}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  CreatePatientMedicine(patient:any,medicine:any,item:any) : Observable<CreatePatientMedicineResource>{
    return this.http.post<CreatePatientMedicineResource>(`${this.basePath2}/${patient}/medicine/${medicine}/patient-medicine`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
