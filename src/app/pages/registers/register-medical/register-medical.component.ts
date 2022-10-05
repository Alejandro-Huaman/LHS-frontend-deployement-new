import { SpecialtyResource } from './../../../models/specialty/SpecialtyResource';
import { ShiftResource } from './../../../models/shift/ShiftResource';
import { SpecialityService } from './../../../services/doctor/speciality.service';
import { ShiftService } from './../../../services/doctor/shift.service';
import { CreateDoctorResource } from './../../../models/doctor/CreateDoctorResource';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from '../../dialogs/result-dialog/result-dialog.component';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { StaffService } from 'src/app/services/staff/staff.service';
import { ActivatedRoute } from '@angular/router';
import { StaffResource } from 'src/app/models/staff/StaffResource';
@Component({
  selector: 'app-register-medical',
  templateUrl: './register-medical.component.html',
  styleUrls: ['./register-medical.component.css']
})
export class RegisterMedicalComponent implements OnInit {
  
  medicalregisterform!:FormGroup;
  specialvariable!:string;
  CreateDoctorResource!:CreateDoctorResource;
  ShiftResource!:ShiftResource
  SpecialtyResource!:SpecialtyResource
  specialistlist: string[] = ["nefrología","urólogo"]
  shift!:string;
  shiftlist:string[] = ["Turno Mañana","Turno Tarde","Turno Noche"]
  genderm="M"
  genderF="F"
  shiftselected!:number;
  specailityselected!:number
  shifts:ShiftResource[]=[]
  specialities:SpecialtyResource[]=[]
  urlid!:number
  staffobject!:StaffResource
  constructor(public dialog:MatDialog, private formBuilder: FormBuilder,private DoctorService:DoctorService,private ShiftService:ShiftService,private SpecialityService:SpecialityService, private StaffService:StaffService, private ActivatedRoute:ActivatedRoute) {
    this.CreateDoctorResource={}as CreateDoctorResource;
    this.SpecialtyResource={}as SpecialtyResource;
    this.ShiftResource={}as ShiftResource;
   }

  ngOnInit() {
    this.medicalregisterform=this.formBuilder.group({
      name:['',Validators.required],
      lastname:['',Validators.required],
      gender:['',Validators.required],
      dni:['',Validators.required],
      address:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      speciality:['',Validators.required],
      shift:['',Validators.required],
     })
     this.GetShift()
     this.GetSpeciality()
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
 
   this.DoctorService.createDoctor(this.CreateDoctorResource,this.specailityselected,this.shiftselected).subscribe((response:any)=>{
        const dialogRef = this.dialog.open(ResultDialogComponent,{
          data: this.staffobject
        })
   })

    
  }
  SetSpeciality(name:string){

    this.SpecialityService.getSpecialtyByName(name).subscribe((response:any)=>{
          this.SpecialtyResource=response
          return this.SpecialtyResource.id;
    })
    
  }

  GetShift(){
    this.ShiftService.getAllShifts().subscribe((response:any)=>{
       this.shifts=response;
       
    })
    
  }
  GetSpeciality(){
    this.SpecialityService.getAllSpecialties().subscribe((response:any)=>{
      this.specialities=response
      
      })
  }


}
