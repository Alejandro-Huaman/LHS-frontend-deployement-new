import { Dialysis } from "./DIalysis.enum";
import { DocumentType } from "./DocumentType.enum";
export interface UpdatePatientResource{

    name:string

    lastname:string

    documentType:DocumentType

    dialysisMaterial:Dialysis

    documentNumber:string

    birthday:Date

    gender:string

    email:string

    phone:string 

    username:string

    password:string

    height:string
}