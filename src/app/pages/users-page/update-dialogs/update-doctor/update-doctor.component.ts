import { CreateDoctorResource } from './../../../../models/doctor/CreateDoctorResource';
import { DoctorResource } from './../../../../models/doctor/DoctorResource';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { updateAccept } from './../../confirm-dialogs/updateAccept';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  medicalupdateform!:FormGroup;
  specialvariable!:string;
  specialistlist: string[] = ["nefrología","urólogo"]
  shift!:string;
  shiftlist:string[] = ["Turno Mañana","Turno Tarde","Turno Noche"]
  CreateDoctorResource!:CreateDoctorResource;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editdoctordata:any,private DoctorService:DoctorService,public dialog:MatDialog) {
    this.CreateDoctorResource={}as CreateDoctorResource
   }

  ngOnInit() {
    this.medicalupdateform=this.formBuilder.group({
      name:['',Validators.required],
      lastname:['',Validators.required],
      gender:['',Validators.required],
      dni:['',Validators.required],
      address:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      
     })

    if(this.editdoctordata){
      this.medicalupdateform.controls['name'].setValue(this.editdoctordata.name);
      this.medicalupdateform.controls['lastname'].setValue(this.editdoctordata.lastname);
      this.medicalupdateform.controls['gender'].setValue(this.editdoctordata.gender);
      this.medicalupdateform.controls['dni'].setValue(this.editdoctordata.dni);
      this.medicalupdateform.controls['address'].setValue(this.editdoctordata.address);
      this.medicalupdateform.controls['email'].setValue(this.editdoctordata.email);
      this.medicalupdateform.controls['phone'].setValue(this.editdoctordata.phone);
      this.medicalupdateform.controls['username'].setValue(this.editdoctordata.phone);
      this.medicalupdateform.controls['password'].setValue(this.editdoctordata.phone);
      
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(updateAccept, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      

    });
  }
  Update(){
  this.CreateDoctorResource.name=  this.medicalupdateform.controls['name'].value;
  this.CreateDoctorResource.lastname =this.medicalupdateform.controls['lastname'].value;
  this.CreateDoctorResource.gender = this.medicalupdateform.controls['gender'].value;
  this.CreateDoctorResource.dni= this.medicalupdateform.controls['dni'].value;
  this.CreateDoctorResource.address = this.medicalupdateform.controls['address'].value;
  this.CreateDoctorResource.email=  this.medicalupdateform.controls['email'].value;
  this.CreateDoctorResource.phone= this.medicalupdateform.controls['phone'].value;
  this.CreateDoctorResource.username= this.medicalupdateform.controls['username'].value;
  this.CreateDoctorResource.password= this.medicalupdateform.controls['password'].value;


this.editdoctordata.name  =  this.CreateDoctorResource.name
this.editdoctordata.lastName   =  this.CreateDoctorResource.lastname
this.editdoctordata.gender   =  this.CreateDoctorResource.gender 
this.editdoctordata.dni =  this.CreateDoctorResource.dni
this.editdoctordata.address  = this.CreateDoctorResource.address 
this.editdoctordata.email  = this.CreateDoctorResource.email
this.editdoctordata.phone   = this.CreateDoctorResource.phone
this.editdoctordata.username = this.CreateDoctorResource.username
this.editdoctordata.password  = this.CreateDoctorResource.password
 

this.DoctorService.updateDoctor(this.editdoctordata.id,this.CreateDoctorResource).subscribe((response:any)=>{
  this.openDialog()
})


  }
}
