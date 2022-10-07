import { Dialysis } from "../patient/DIalysis.enum";
import { PatientResource } from "../patient/PatientResource";

export interface MedicalCareResource {
    id: number;
    patient:PatientResource;
    ureaPre: number;
    ureaPost: number;
    dryWeight: number;
    initialWeight: number;
    finalWeight: number;
    hdTime: number;
    uf: number;
    ktv: number;
    hb: number;
    hto: number;
    dialysisMaterial:Dialysis;
}