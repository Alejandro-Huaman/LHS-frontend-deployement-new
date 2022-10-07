import { TokenService } from './../../../services/token/token.service';
import { DoctorResource } from './../../../models/doctor/DoctorResource';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { PatientService } from './../../../services/patient/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogReportsComponent } from '../../dialogs/dialog-reports/dialog-reports.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog:MatDialog,private Router:Router,private DoctorService:DoctorService,private ActivatedRoute:ActivatedRoute,private TokenService:TokenService) { 
    this.DoctorResource={}as DoctorResource
  }
  DoctorResource!:DoctorResource
  ngOnInit() {
    let doctorid=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)
    this.findDoctor(doctorid)
  }

  OpenReports(){
    const dialogRef = this.dialog.open(DialogReportsComponent,{
      data: {id:this.DoctorResource.id,name:"doctor"},
      
      
    })
  }
  gotoClinicalHistories(){
    this.Router.navigate(['/doctor',this.DoctorResource.id,'clinical-histories'])
  }
  gotoVigilant(){
    this.Router.navigate(['/doctor',this.DoctorResource.id,'vigilant'])
  }
  findDoctor(id:number){
    this.DoctorService.getDoctorById(id).subscribe((response:any)=>{
               this.DoctorResource=response           
    })
}
  GoToAppointmentDoctor(){
    this.Router.navigate(['doctor',this.DoctorResource.id,'appointment-doctor']);
  }
  GoOut(){
    this.TokenService.logOut();
    this.Router.navigate(['login']);
  }

  GoToAttention(){
    this.Router.navigate(['doctor',this.DoctorResource.id,'attention']);
  }

}
