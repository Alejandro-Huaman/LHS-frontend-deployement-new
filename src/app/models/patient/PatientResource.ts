import { RenalDiseaseResource } from './../renal-disease/RenalDiseaseResource';
import { DocumentType } from "./DocumentType.enum";
import { Dialysis } from './DIalysis.enum'; 
export interface PatientResource {
    id:number;
    name:string;

    lastname:string;

 
    documentType:DocumentType;

  
   documentNumber:string;

 
    birthday:Date;

  
  gender:string;

  
  email:string;

  
   phone:string;

   dialysisMaterial:Dialysis
  username:string;

  
  password:string;

  height:string;
  renalDisease:RenalDiseaseResource
}
