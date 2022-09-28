import { UpdateAppointmentResource } from './../../../../../models/appointment/UpdateAppointmentResource';
import { Component,Inject ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-appointedate-update',
  templateUrl: './appointedate-update.component.html',
  styleUrls: ['./appointedate-update.component.css']
})
export class AppointedateUpdateComponent implements OnInit {
  UpdateAppointmentResource!:UpdateAppointmentResource
  userupdateform!:FormGroup;
  minDate = new Date();
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public editpatientdata:any) { 
    this.UpdateAppointmentResource={}as UpdateAppointmentResource
  }

  ngOnInit() {
    this.userupdateform=this.formBuilder.group({
      date:['',Validators.required],
    })
  }
  Update(){

  }

}
