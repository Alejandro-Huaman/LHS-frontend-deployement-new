
import { Status } from './../enum/Status.enum';
export interface CreateAppointmentResource {

      notes:string;

    
      scheduledAt:Date;

    
      status:Status;
}
