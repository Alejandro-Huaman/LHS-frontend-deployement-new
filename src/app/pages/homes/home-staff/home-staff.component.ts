import { TokenService } from './../../../services/token/token.service';
import { StaffResource } from './../../../models/staff/StaffResource';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from './../../../services/staff/staff.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogReportsComponent } from '../../dialogs/dialog-reports/dialog-reports.component';

@Component({
  selector: 'app-home-staff',
  templateUrl: './home-staff.component.html',
  styleUrls: ['./home-staff.component.css']
})
export class HomeStaffComponent implements OnInit {
  StaffResource!:StaffResource
  constructor(public dialog:MatDialog,private StaffService:StaffService,private ActivatedRoute:ActivatedRoute,private Router:Router,private TokenService:TokenService) {
    this.StaffResource={}as StaffResource
   
   }

  ngOnInit() {
    let staffid=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)
    this.findstaff(staffid)
  }
  findstaff(id:number){
    this.StaffService.getStaffById(id).subscribe((response:any)=>{
               this.StaffResource=response           
    })
}
  OpenReports(){
    const dialogRef = this.dialog.open(DialogReportsComponent,{
      data: {id:this.StaffResource.id,name:"staff"},
      
      
    })
  }
  gotoclincalhistories(){
    this.Router.navigate(['/staff',this.StaffResource.id,'clinical-histories'])
  }
  gotovigilant(){
    this.Router.navigate(['/staff',this.StaffResource.id,'vigilant'])
  }
  gotostaffusers(){
    this.Router.navigate(['/staff',this.StaffResource.id,'staff-users'])
  }

  GotoStaffAppointmentView(){
    this.Router.navigate(['/staff',this.StaffResource.id,'appointment-staff'])
  }
  
  GotoStaffAppointmentRegister(){
    this.Router.navigate(['/staff',this.StaffResource.id,'appointment-staff-register'])
  }
  GoOut(){
    this.TokenService.logOut();
    this.Router.navigate(['login']);
  }

  gotoAttention(){
    this.Router.navigate(['/staff',this.StaffResource.id,'attention'])
  }

}
