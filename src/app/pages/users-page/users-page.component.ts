import { PatientResource } from 'src/app/models/patient/PatientResource';
import { StaffResource } from 'src/app/models/staff/StaffResource';
import { DoctorResource } from './../../models/doctor/DoctorResource';
import { StaffService } from './../../services/staff/staff.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from './../../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDoctorComponent } from './update-dialogs/update-doctor/update-doctor.component';
import { UpdatePatientComponent } from './update-dialogs/update-patient/update-patient.component';
import { UpdateStaffComponent } from './update-dialogs/update-staff/update-staff.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  selecteddate!:Date;
  medical!: string;
  medicals:string[] = ["Dr. Concepción Zavaleta, Marcio Jose","Dr. Punis Reyes, Nevia Neda", "Dr. Uribe Tejada, Nancy Patricia"]
   doctors!:DoctorResource[]
   staffs!:StaffResource[]
   patients!:PatientResource[]
  constructor(public dialog:MatDialog,private PatientService:PatientService,private DoctorService:DoctorService,private StaffService:StaffService) { 
   
  }

  ngOnInit() {
    this.GetDoctors()
    this.GetPatiens()
    this.GetStaff()
  }
  


  GetDoctors(){
       this.DoctorService.getAllDoctors().subscribe((response:any)=>{
        this.doctors=response
       
       })
  }
  GetPatiens(){
    this.PatientService.getAllPatients().subscribe((response:any)=>{
          this.patients=response
        
    })

  }
  GetStaff(){
    this.StaffService.getAllStaffs().subscribe((response:any)=>{
       this.staffs=response
        
    })

  }




  DeleteDoctor(select:DoctorResource){
    var index = this.doctors.indexOf(select)
    console.log(index)
    this.staffs.splice(index,1)
    console.log(index+1)
     this.DoctorService.deleteDoctor(index+1).subscribe((response:any)=>{

     })
  }
  DeleteStaff(select:StaffResource){

    var index = this.staffs.indexOf(select)
    console.log(index)
    this.staffs.splice(index,1)
    console.log(index+1)
    this.StaffService.deleteStaff(index+1).subscribe((response:any)=>{
     
    })
 }
 DeletePatient(select:PatientResource){
  var index = this.patients.indexOf(select)
   console.log(index)
  this.staffs.splice(index,1)
  console.log(index+1)
  this.PatientService.deletePatient(index+1).subscribe((response:any)=>{
   
  })
}
  UpdateStaff(staff:StaffResource){
   const dialogRef=  this.dialog.open(UpdateStaffComponent,{
      data:staff 
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      let itemIndex = this.staffs.findIndex(item => item.id == result.id-1);
      this.staffs[itemIndex] = result
      console.log(this.staffs)
    });
    
  }

  UpdateDoctor(doctor:DoctorResource){
    const dialogRef= this.dialog.open(UpdateDoctorComponent,{
      data:doctor
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      let itemIndex = this.staffs.findIndex(item => item.id == result.id-1);
      this.staffs[itemIndex] = result
      console.log(this.staffs)
    });
  }

  UpdatePatient(patient:PatientResource){
    const dialogRef= this.dialog.open(UpdatePatientComponent,{
      data:patient
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      let itemIndex = this.staffs.findIndex(item => item.id == result.id-1);
      this.staffs[itemIndex] = result
      console.log(this.staffs)
    });
  }

}
