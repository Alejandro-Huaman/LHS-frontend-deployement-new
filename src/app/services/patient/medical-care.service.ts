import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreateMedicalCareResource } from 'src/app/models/medical-care/CreateMedicalCareResource';
import { MedicalCareResource } from 'src/app/models/medical-care/MedicalCareResource';
import { UpdateMedicalCareResource } from 'src/app/models/medical-care/UpdateMedicalCareResource';
import { CreatePatientMedicineResource } from 'src/app/models/patient-medicine/CreatePatientMedicineResource';
import { PatientMedicineResource} from 'src/app/models/patient-medicine/PatientMedicineResource';
import { UpdatePatientMedicineResource } from 'src/app/models/patient-medicine/UpdatePatientMedicineResource';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { UpdatePatientResource } from 'src/app/models/patient/UpdatePatientResource';

@Injectable({
  providedIn: 'root'
})
export class MedicalCareService {

  basePath =   "http://flash-rope-364617.rj.r.appspot.com/api/v1/medical-care";
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

  getAllMedicalCares() : Observable<MedicalCareResource>{
    return this.http.get<MedicalCareResource>(this.basePath,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getMedicalCareById(id:any) : Observable<MedicalCareResource>{
    return this.http.get<MedicalCareResource>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  UpdateMedicalCareById(id:any,item:any) : Observable<UpdateMedicalCareResource>{
    return this.http.put<UpdateMedicalCareResource>(`${this.basePath}/${id}`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  DeleteMedicalCareById(id:any){
    return this.http.delete(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getMedicalCareByPatient(patient:any) : Observable<MedicalCareResource>{
    return this.http.get<MedicalCareResource>(`${this.basePath2}/${patient}/medical-care`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  CreateMedicalCare(patient:any,item:any) : Observable<CreateMedicalCareResource>{
    return this.http.post<CreateMedicalCareResource>(`${this.basePath2}/${patient}/medical-care`,JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


}
