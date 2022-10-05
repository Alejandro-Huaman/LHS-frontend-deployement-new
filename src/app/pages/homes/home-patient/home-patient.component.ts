import { TokenService } from './../../../services/token/token.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientResource } from 'src/app/models/patient/PatientResource';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit {
  idpatient!:number
  PatientResource!:PatientResource

  constructor(private route:Router,private activeroute:ActivatedRoute,private patientservice:PatientService,private TokenService:TokenService) { }

  ngOnInit() {

    let id = parseInt(this.activeroute.snapshot.paramMap.get('id')!)
    this.idpatient = id
    this.getPatientById(this.idpatient)
  }

  getPatientById(id:number){
      this.patientservice.getPatientById(id).subscribe((response:any)=>{
        this.PatientResource=response           
      })
  }

  GoToAppointmentPatient(){
    this.route.navigate(['patient',this.PatientResource.id,'appointment-patient']);
  }
  GoOut(){
    this.TokenService.logOut();
    this.route.navigate(['login']);
  }
}
