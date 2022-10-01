
import { StaffResource } from 'src/app/models/staff/StaffResource';
import { CreateStaffResource } from './../../../../models/staff/CreateStaffResource';
import { StaffService } from './../../../../services/staff/staff.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { updateAccept } from './../../confirm-dialogs/updateAccept';
@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {
  
  staffeditform!:FormGroup;
  role!:string;
  rolelist:string[] = ["ADMIN","NURSE"]
  CreateStaffResource!:CreateStaffResource
  constructor(private formBuilder:FormBuilder, @Inject(MAT_DIALOG_DATA) public editstaffdata:any,private StaffService:StaffService,public dialog:MatDialog) {
      this.CreateStaffResource={}as CreateStaffResource
   }

  ngOnInit() {
    this.staffeditform=this.formBuilder.group({
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
     
     if(this.editstaffdata){
        this.staffeditform.controls['name'].setValue(this.editstaffdata.name);
        this.staffeditform.controls['lastname'].setValue(this.editstaffdata.lastname);
        this.staffeditform.controls['dni'].setValue(this.editstaffdata.dni);
        this.staffeditform.controls['gender'].setValue(this.editstaffdata.gender);
        this.staffeditform.controls['email'].setValue(this.editstaffdata.email);
        this.staffeditform.controls['phone'].setValue(this.editstaffdata.phone);
        
        this.staffeditform.controls['role'].setValue(this.editstaffdata.role);
        console.log(this.staffeditform.controls['role'].value)
        this.staffeditform.controls['username'].setValue(this.editstaffdata.username);
        this.staffeditform.controls['password'].setValue(this.editstaffdata.password);
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
        this.CreateStaffResource.name= this.staffeditform.controls['name'].value
        this.CreateStaffResource.lastname= this.staffeditform.controls['lastname'].value
        this.CreateStaffResource.dni= this.staffeditform.controls['dni'].value
        this.CreateStaffResource.gender= this.staffeditform.controls['gender'].value
        this.CreateStaffResource.email= this.staffeditform.controls['email'].value
        this.CreateStaffResource.phone= this.staffeditform.controls['phone'].value
        this.CreateStaffResource.role=this.staffeditform.controls['role'].value;
        this.CreateStaffResource.username= this.staffeditform.controls['username'].value
        this.CreateStaffResource.password= this.staffeditform.controls['password'].value 

    
        this.editstaffdata.name= this.CreateStaffResource.name;
        this.editstaffdata.lastname= this.CreateStaffResource.lastname;
        this.editstaffdata.dni= this.CreateStaffResource.dni;
        this.editstaffdata.gender= this.CreateStaffResource.gender;
        this.editstaffdata.email= this.CreateStaffResource.email;
        this.editstaffdata.phone= this.CreateStaffResource.phone;
       this.editstaffdata.role= this.CreateStaffResource.role
       this.editstaffdata.username= this.CreateStaffResource.username;
        this.editstaffdata.password= this.CreateStaffResource.password;


        console.log(this.CreateStaffResource)
        this.StaffService.updateStaff(this.editstaffdata.id,this.CreateStaffResource).subscribe((response:any)=>{
                      this.openDialog()
        })

  }

}
