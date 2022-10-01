import { AppointmentService } from './../../../../../services/appoinment/Appointment.service';
import { ShiftService } from './../../../../../services/doctor/shift.service';
import { UpdateAppointmentResource } from './../../../../../models/appointment/UpdateAppointmentResource';
import { Component,Inject ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-appointedate-update',
  templateUrl: './appointedate-update.component.html',
  styleUrls: ['./appointedate-update.component.css']
})
export class AppointedateUpdateComponent implements OnInit {
  UpdateAppointmentResource!:UpdateAppointmentResource
  userupdateform!:FormGroup;
  minDate = new Date();
  topdate!:Date;
  hour1:string
  start1!:number
  end!:number
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public editpatientdata:any,private ShiftService:ShiftService,private AppointmentService:AppointmentService) { 
    this.UpdateAppointmentResource={}as UpdateAppointmentResource
  }

  ngOnInit() {
    this.userupdateform=this.formBuilder.group({
      date:['',Validators.required],
      hour:['',Validators.required],
    })
    console.log(this.editpatientdata)
    this.hour1=formatDate(this.editpatientdata.scheduledAt,'YYYY-MM-dd HH:mm:ss','en_US')
    console.log(this.hour1.slice(11,13))
    this.startAndEnd(this.editpatientdata.doctor.shift.id)
  }
  startAndEnd(id:number){
    this.ShiftService.getShiftById(id).subscribe((response:any)=>{
            let setstart=response.startShift.slice(0,2)
            let finish=response.endShift.slice(0,2)
            console.log(setstart)
           this.start1=parseInt(setstart)
           this.end=parseInt(finish)
           console.log(this.start1)
    })
  }


  Update(){
    console.log("fecha seleccionada")
    console.log(this.topdate)
    this.topdate.setHours(this.userupdateform.controls["hour"].value)


    this.UpdateAppointmentResource.status=this.editpatientdata.status
    this.UpdateAppointmentResource.notes=this.editpatientdata.notes
    //this.topdate=this.editpatientdata.scheduledAt
    
    this.UpdateAppointmentResource.scheduledAt=this.topdate
    console.log(formatDate(this.UpdateAppointmentResource.scheduledAt,'YYYY-MM-dd HH:mm:ss','en_US'))
    this.AppointmentService.updateAppointment(this.editpatientdata.id,this.UpdateAppointmentResource).subscribe((response: any)=>{

    })
    
  }

}
