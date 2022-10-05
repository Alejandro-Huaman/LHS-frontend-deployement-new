import { Role } from './../../../models/staff/Role.enum';
import { CreateStaffResource } from './../../../models/staff/CreateStaffResource';
import { StaffService } from './../../../services/staff/staff.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from '../../dialogs/result-dialog/result-dialog.component';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { StaffResource } from 'src/app/models/staff/StaffResource';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.css']
})
export class RegisterStaffComponent implements OnInit {
  
  staffregisterform!:FormGroup;
  role!:string;
  rolany!:any
  rolelist:string[] = ["ADMIN","NURSE"]
  CreateStaffResource!:CreateStaffResource
  staffobject!:StaffResource
  urlid!:number
  constructor(public dialog:MatDialog, private formBuilder:FormBuilder,private StaffService:StaffService, private ActivatedRoute:ActivatedRoute) { 
    this.CreateStaffResource={}as CreateStaffResource
  }

  ngOnInit() {
    this.staffregisterform=this.formBuilder.group({
      name:['',Validators.required],
      lastname:['',Validators.required],
      dni:['',Validators.required],
      gender:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      role:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
     })
     console.log(this.GetRole("ADMIN"))

     let urlvariable = parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!);
     this.urlid = urlvariable
     console.log(this.urlid)
     this.getStaffById(this.urlid) 
  }

  getStaffById(id:number){
    this.StaffService.getStaffById(id).subscribe((response:any)=>{
      this.staffobject = response           
    })
  }

  RegisterMethod(){

   console.log(this.rolany)
   this.CreateStaffResource.role=this.rolany
    console.log(this.CreateStaffResource)
    this.StaffService.createStaff(this.CreateStaffResource).subscribe((response:any)=>{
      const dialogRef = this.dialog.open(ResultDialogComponent,{
        data: this.staffobject
      })
    })
    
  }
  GetRole(role:any){
      return Object.keys(Role).indexOf(role)
  }

}
