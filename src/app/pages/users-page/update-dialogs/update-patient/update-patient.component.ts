import { PatientResource } from 'src/app/models/patient/PatientResource';
import { CreatePatientResource } from './../../../../models/patient/CreatePatientResource';
import { PatientService } from './../../../../services/patient/patient.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { updateAccept } from './../../confirm-dialogs/updateAccept';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  userupdateform!:FormGroup;
  CreatePatientResource!:CreatePatientResource
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editpatientdata:any,private PatientService:PatientService,public dialog:MatDialog) {


    this.CreatePatientResource={} as CreatePatientResource
   }
  type!:string;
  types:string[] = ["DNI","PASSPORT","NIE"]
  ngOnInit() {
    this.userupdateform=this.formBuilder.group({
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

    if(this.editpatientdata){
      this.userupdateform.controls['name'].setValue(this.editpatientdata.name);
      this.userupdateform.controls['lastname'].setValue(this.editpatientdata.lastname);
      this.userupdateform.controls['document'].setValue(this.editpatientdata.documentType);
      console.log(this.editpatientdata.documentType)
      this.userupdateform.controls['numberdocument'].setValue(this.editpatientdata.documentNumber);
      this.userupdateform.controls['birthday'].setValue(this.editpatientdata.birthday);
      this.userupdateform.controls['gender'].setValue(this.editpatientdata.gender);
      this.userupdateform.controls['email'].setValue(this.editpatientdata.email);
      this.userupdateform.controls['phone'].setValue(this.editpatientdata.phone);
      this.userupdateform.controls['username'].setValue(this.editpatientdata.username);
      this.userupdateform.controls['password'].setValue(this.editpatientdata.password);
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

  this.CreatePatientResource.name = this.userupdateform.controls['name'].value;
  this.CreatePatientResource.lastname = this.userupdateform.controls['lastname'].value;
  this.CreatePatientResource.documentType = this.userupdateform.controls['document'].value;
  this.CreatePatientResource.documentNumber  =  this.userupdateform.controls['numberdocument'].value;
  this.CreatePatientResource.birthday  =  this.userupdateform.controls['birthday'].value;
  this.CreatePatientResource.gender   = this.userupdateform.controls['gender'].value;
  this.CreatePatientResource.email   = this.userupdateform.controls['email'].value;
  this.CreatePatientResource.phone  = this.userupdateform.controls['phone'].value;
  this.CreatePatientResource.username  = this.userupdateform.controls['username'].value;
  this.CreatePatientResource.password   = this.userupdateform.controls['password'].value;


  this.editpatientdata.name= this.CreatePatientResource.name;
  this.editpatientdata.lastname= this.CreatePatientResource.lastname;
  this.editpatientdata.documentType=this.CreatePatientResource.documentType
this.editpatientdata.documentNumber=this.CreatePatientResource.documentNumber
  this.editpatientdata.birthday=this.CreatePatientResource.birthday
  this.editpatientdata.gender= this.CreatePatientResource.gender;
  this.editpatientdata.email= this.CreatePatientResource.email;
  this.editpatientdata.phone= this.CreatePatientResource.phone;
 this.editpatientdata.username= this.CreatePatientResource.username;
  this.editpatientdata.password= this.CreatePatientResource.password;

  this.PatientService.updatePatient(this.editpatientdata.id,this.CreatePatientResource).subscribe((response:any)=>{
          this.openDialog()
  })



  }


}
