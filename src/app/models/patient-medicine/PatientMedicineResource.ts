import { MedicineResource } from "../medicine/MedicineResource";
import { PatientResource } from "../patient/PatientResource";

export interface PatientMedicineResource {
    id:number;
    quantity:number;
    frequency:string;
    patient:PatientResource;
    medicine:MedicineResource;
}