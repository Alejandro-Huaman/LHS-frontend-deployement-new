import { CreatePatientResource } from './../../../models/patient/CreatePatientResource';
import { PatientService } from './../../../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from '../../dialogs/result-dialog/result-dialog.component';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/services/staff/staff.service';
import { StaffResource } from 'src/app/models/staff/StaffResource';
import { ResultDialogLoginComponent } from '../../dialogs/result-dialog-login/result-dialog-login.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  
  userregisterform!:FormGroup;
  CreatePatientResource!:CreatePatientResource
  doctype!:any
  urlid!:number
  staffobject!:StaffResource
  constructor(public dialog:MatDialog, private formBuilder: FormBuilder,private PatientService:PatientService, private ActivatedRoute:ActivatedRoute,private staffservice:StaffService) {

    this.CreatePatientResource={}as CreatePatientResource
   }

  ngOnInit() {
    this.userregisterform=this.formBuilder.group({
      name:['',Validators.required],
      lastname:['',Validators.required],
      document:['',Validators.required],
      numberdocument:['',Validators.required],
      birthday:['',Validators.required],
      gender:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
     })

    let urlvariable = parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!);
    this.urlid = urlvariable
    console.log(this.urlid)
    if(Object.is(NaN, this.urlid)){
      
    }else{
      console.log("dentro de if")
      this.getStaffById(this.urlid)
    }
  }

  getStaffById(id:number){
    this.staffservice.getStaffById(id).subscribe((response:any)=>{
      this.staffobject = response           
    })
  }

  RegisterMethod(){
    if(Object.is(NaN, this.urlid)){
      this.PatientService.createPatient(1,this.CreatePatientResource).subscribe((response:any)=>{
        const dialogRef = this.dialog.open(ResultDialogLoginComponent)
      })
    }else{
      this.PatientService.createPatient(1,this.CreatePatientResource).subscribe((response:any)=>{
        this.dialog.open(ResultDialogComponent,{
          data: this.staffobject
        })
      })
    }
  }
  
}
