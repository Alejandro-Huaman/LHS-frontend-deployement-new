import { Status } from './../enum/Status.enum';
import { DoctorResource } from './../doctor/DoctorResource';
import { PatientResource } from './../patient/PatientResource';
export interface AppointmentResource {

      id:number;
      notes:string;
      scheduledAt:Date;
      status:Status;
      patient:PatientResource;
      doctor:DoctorResource;
}
