import { PatientResource } from './../patient/PatientResource';
import { DoctorResource } from './../doctor/DoctorResource';
export interface ASurveillanceResource {
      id:number;
      patient:PatientResource
      doctor:DoctorResource
      weight:number;
      hemoglobin:number;
      lymphocytes:number;
      segmented:number;
      monocytes:number;
      mvc:number;
      mch:number;
      leukocytes:number;
      erythrocytes:number;
      glucose:number;
      cholesterol:number;
      triglycerides:number;
      urea:number;
      creatinine:number;
      density:number;
      ph:number;
      protein:number;
     ketone:number;
     urobilinogen:number;
     bilirubin:number;
     nitrite:number;
     crystals:number;
     sugar:number;
     urineAppearance:string;
      urineColor:string;
      planCalories:number;
      consumedCalories:number;
     appetite:string;
     pain:string;
     otherSymptoms:string;
      imc:number;
}